// controllers/passwordResetController.js
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import { sendSMSVerification } from '../utils/twilioVerify.js';

// Generate a random token
const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Request password reset for admin (via email)
export const requestAdminPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email, role: { $in: ['Admin', 'Super Admin'] } });
    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const resetToken = generateToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'E-voting System - Password Reset Request',
      html: `
        <p>Dear ${user.name},</p>
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Your password reset token is:</p>
        <p><strong>${resetToken}</strong></p>
        <p>Please use this token to reset your password.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <br>
        <p>Best regards,</p>
        <p>E-voting System Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send password reset email', error: error.message });
  }
};

// Request password reset for voter (via mobile)
export const requestVoterPasswordReset = async (req, res) => {
  const { mobile } = req.body;

  try {
    const user = await User.findOne({ mobile, role: 'Voter' });
    if (!user) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    const resetToken = generateToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendSMSVerification(mobile, `Your password reset token is: ${resetToken}`);

    res.status(200).json({ message: 'Password reset SMS sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send password reset SMS', error: error.message });
  }
};

// Reset password for admin
export const resetAdminPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
      role: { $in: ['Admin', 'Super Admin'] },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
};

// Reset password for voter
export const resetVoterPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
      role: 'Voter',
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
};