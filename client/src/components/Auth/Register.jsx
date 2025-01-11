import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerVoter } from '../../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    gender: '',
    department: '',
    year: '',
    mobile: '',
    password: '',
    confirmPassword: '', // Add confirmPassword field
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'; // Validate confirmPassword
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError('');
      return;
    }

    setErrors({});
    setFormError('');

    try {
      const response = await registerVoter(formData);

      // Check if OTP feature is enabled
      if (import.meta.env.VITE_OTP_ENABLED === 'true') {
        alert('Registration successful. Verify your mobile number to complete registration.');
        navigate('/verify-otp', { state: { mobile: formData.mobile } });
      } else {
        // Inform user of successful registration without OTP
        alert('Registration successful. You can now log in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        setFormError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setFormError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Student Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && <div className="text-red-500 text-center">{formError}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.studentId && <div className="text-red-500">{errors.studentId}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <div className="text-red-500">{errors.gender}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Business Administration">Business Administration</option>
            </select>
            {errors.department && <div className="text-red-500">{errors.department}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Year</option>
              <option value="Year One">Year One</option>
              <option value="Year Two">Year Two</option>
              <option value="Year Three">Year Three</option>
              <option value="Year Four">Year Four</option>
            </select>
            {errors.year && <div className="text-red-500">{errors.year}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.mobile && <div className="text-red-500">{errors.mobile}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.password && <div className="text-red-500">{errors.password}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;