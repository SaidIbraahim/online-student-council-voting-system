import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo'; // Import the Logo component

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo /> {/* Render the Logo component */}
        <nav>
          <Link to="/" className="px-4">Home</Link>
          <Link to="/login" className="px-4">Login</Link>
          <Link to="/register" className="px-4">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;