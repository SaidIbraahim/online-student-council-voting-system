import api from './api';
import axios from 'axios';

export const registerVoter = async (data) => {
  const response = await api.post('/auth/register-voter', data);
  return response.data;
};

export const loginVoter = async (data) => {
  const response = await api.post('/auth/login-voter', data);
  return response.data;
};

export const loginAdmin = async (data) => {
  const response = await api.post('/admin/login-admin', data);
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await api.post('/auth/verify-otp', data);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};