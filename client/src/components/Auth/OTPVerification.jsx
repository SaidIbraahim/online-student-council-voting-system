import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP } from '../../services/authService';
import useAuth from '../../hooks/useAuth';

const OTPVerification = () => {
  const [otpCode, setOtpCode] = useState('');
  const [formError, setFormError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { mobile } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP feature is enabled
    if (import.meta.env.VITE_OTP_ENABLED === 'false') {
      alert('OTP verification is disabled. Redirecting to dashboard.');
      setUser({ mobile, role: 'Voter' }); // Simulate user context for testing
      navigate('/voter-dashboard');
      return;
    }

    try {
      const response = await verifyOTP({ mobile, otpCode });

      if (response.data && response.data.user) {
        alert('OTP verified successfully. Redirecting to dashboard.');
        setUser(response.data.user); // Update the user in AuthContext
        navigate('/voter-dashboard');
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      if (error.response) {
        setFormError(error.response.data.message || 'OTP verification failed. Please try again.');
      } else {
        setFormError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
        {import.meta.env.VITE_OTP_ENABLED  === 'true' && (
          <p className="text-center text-gray-700">
            An OTP code was sent to {mobile}. Please enter it below.
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && <div className="text-red-500 text-center">{formError}</div>}
          {process.env.REACT_APP_OTP_ENABLED === 'true' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">OTP Code</label>
              <input
                type="text"
                name="otpCode"
                placeholder="Enter OTP Code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              {import.meta.env.VITE_OTP_ENABLED  === 'true' ? 'Verify' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
