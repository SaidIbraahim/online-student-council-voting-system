import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import { verifySMSCode } from '../../utils/twilioVerify.js';
import { formatSomaliaMobileNumber } from './voterAuthController.js';

export const verifyLoginOTP = async (req, res) => {
  const { mobile, otpCode } = req.body;

  try {
    const formattedMobile = formatSomaliaMobileNumber(mobile);
    if (!formattedMobile) {
      return res.status(400).json({ message: 'Invalid mobile number format' });
    }

    // Skip OTP verification if SKIP_OTP is enabled
    if (process.env.SKIP_OTP === 'true') {
      const user = await User.findOneAndUpdate(
        { mobile: formattedMobile, role: 'Voter' },
        { status: 'active' },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ message: 'Login successful', token, user });
    }

    // Perform OTP verification
    const verificationCheck = await verifySMSCode(formattedMobile, otpCode);
    if (verificationCheck.status !== 'approved') {
      return res.status(400).json({ message: 'Invalid or expired OTP', details: verificationCheck });
    }

    const user = await User.findOneAndUpdate(
      { mobile: formattedMobile, role: 'Voter' },
      { status: 'active' },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
  }
};
