import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import { sendSMSVerification } from '../../utils/twilioVerify.js';
import StudentRecord from '../../models/studentRecordModel.js';

export function formatSomaliaMobileNumber(mobile) {
  const digitsOnly = mobile.replace(/\D/g, '');
  return digitsOnly.startsWith('252')
    ? (digitsOnly.length === 12 ? `+${digitsOnly}` : null)
    : (digitsOnly.length === 9 ? `+252${digitsOnly}` : null);
}

// Voter Registration
export const registerVoter = async (req, res) => {
  const { studentId, name, gender, department, year, mobile, password } = req.body;

  try {
    const student = await StudentRecord.findOne({ studentId, status: 'active' });
    if (!student) {
      return res.status(400).json({ message: 'Student ID not eligible for registration' });
    }

    const formattedMobile = formatSomaliaMobileNumber(mobile);
    if (!formattedMobile) {
      return res.status(400).json({ message: 'Invalid mobile number format' });
    }

    const existingUser = await User.findOne({ mobile: formattedMobile });
    if (existingUser) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      studentId,
      name,
      gender,
      department,
      year,
      mobile: formattedMobile,
      password: hashedPassword,
      role: 'Voter',
      status: process.env.SKIP_OTP === 'true' ? 'active' : 'pending', // Automatically activate if SKIP_OTP is enabled
    });

    // Skip SMS verification if SKIP_OTP is enabled
    if (process.env.SKIP_OTP !== 'true') {
      await sendSMSVerification(formattedMobile);
    }

    await newUser.save();
    res.status(201).json({ message: 'Voter registered successfully. Verify your mobile number to complete registration.' });
  } catch (error) {
    console.error('Error during voter registration:', error);
    res.status(500).json({ message: 'Failed to register voter', error: error.message });
  }
};

// Voter Login
export const loginVoter = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const formattedMobile = formatSomaliaMobileNumber(mobile);
    if (!formattedMobile) {
      return res.status(400).json({ message: 'Invalid mobile number format' });
    }

    const user = await User.findOne({ mobile: formattedMobile, role: 'Voter' });
    if (!user) {
      return res.status(401).json({ message: 'Invalid mobile number or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid mobile number or password' });
    }

    // Skip SMS verification if SKIP_OTP is enabled
    if (process.env.SKIP_OTP === 'true') {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ message: 'Login successful', token, user });
    }

    await sendSMSVerification(formattedMobile);
    res.status(200).json({ 
      message: 'OTP sent to your registered mobile number. Verify to complete login.',
      mobile: formattedMobile,
    });
  } catch (error) {
    console.error('Error during voter login:', error);
    res.status(500).json({ message: 'Failed to log in', error: error.message });
  }
};