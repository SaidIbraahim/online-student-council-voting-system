import React, { useState } from 'react';
import { resetPassword } from '../../services/authService';


const PasswordReset = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ mobile, otp, newPassword });
      alert('Password reset successfully.');
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  return (
    <div className="password-reset-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;