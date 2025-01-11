import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginVoter, loginAdmin } from '../../services/authService';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('voter');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, user } = useAuth();

  const OTP_ENABLED = import.meta.env.VITE_OTP_ENABLED === 'true'; // Check if OTP is enabled

  useEffect(() => {
    if (user && location.pathname !== '/login') {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);  

  // Validate the form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!mobileOrEmail) {
      newErrors.mobileOrEmail =
        role === 'voter' ? 'Mobile number is required' : 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError(''); // Clear general error
      return;
    }

    setErrors({});
    setFormError(''); // Clear general error before making API call

    try {
      let response;

      if (role === 'voter') {
        response = await loginVoter({ mobile: mobileOrEmail, password });
        console.log('Voter login response:', response); // Debugging log

        if (OTP_ENABLED && response.mobile) {
          navigate('/verify-otp', { state: { mobile: response.mobile } }); // Navigate to OTP verification
        } else if (response.token) {
          localStorage.setItem('token', response.token); // Store the token
          setUser(response.user); // Update the user in AuthContext
          navigate('/voter-dashboard'); // Skip OTP and navigate to voter dashboard
        } else {
          throw new Error('Invalid response structure');
        }
      } else {
        response = await loginAdmin({ email: mobileOrEmail, password });
        console.log('Admin login response:', response); // Debugging log

        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          setUser(response.user); // Update the user in AuthContext
          const from = location.state?.from?.pathname || '/admin-dashboard';
          navigate(from, { replace: true });
        } else {
          throw new Error('Invalid response structure');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        setFormError(
          error.response.data.message || 'Login failed. Please check your credentials.'
        );
      } else {
        setFormError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {formError && <div className="text-red-500 text-center">{formError}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {role === 'voter' ? 'Mobile' : 'Email'}
            </label>
            <input
              type="text"
              placeholder={role === 'voter' ? 'Mobile' : 'Email'}
              value={mobileOrEmail}
              onChange={(e) => setMobileOrEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.mobileOrEmail && <div className="text-red-500">{errors.mobileOrEmail}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.password && <div className="text-red-500">{errors.password}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="voter">Voter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
