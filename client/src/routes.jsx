// routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import PasswordResetPage from './pages/PasswordResetPage';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage';
import VoterPage from './pages/VoterPage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/verify-otp" element={<OTPVerificationPage />} />
    <Route path="/reset-password" element={<PasswordResetPage />} />
    <Route
      path="/admin-dashboard"
      element={
        <ProtectedRoute allowedRoles={['Admin', 'Super Admin']}>
          <AdminPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/superadmin-dashboard"
      element={
        <ProtectedRoute allowedRoles={['Super Admin']}>
          <SuperAdminPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/voter-dashboard"
      element={
        <ProtectedRoute allowedRoles={['Voter']}>
          <VoterPage />
        </ProtectedRoute>
      }
    />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;