import React from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Sidebar from './Shared/Sidebar';
import AppRoutes from '../routes';

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <p>Loading...</p>
  </div>
);

const Layout = () => {
  const { loading, user } = useAuth();
  const location = useLocation();

  // List of public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/reset-password', '/verify-otp'];

  if (loading) {
    return <Loading />;
  }

  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (!user && !isPublicRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>You need to log in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        {user && !isPublicRoute && <Sidebar />}
        <main className="flex-grow">
          <AppRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;