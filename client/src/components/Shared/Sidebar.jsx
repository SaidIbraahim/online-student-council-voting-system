import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="bg-primary-navy text-white w-64 min-h-screen p-4 shadow-lg flex flex-col justify-between">
      <nav>
        <ul className="space-y-4">
          {/* Admin Navigation */}
          {user && user.role === 'Admin' && (
            <li>
              <Link 
                to="/admin-dashboard" 
                className="block py-2 px-4 rounded hover:bg-primary-blue transition duration-200"
              >
                Admin Dashboard
              </Link>
            </li>
          )}

          {/* Super Admin Navigation */}
          {user && user.role === 'Super Admin' && (
            <li>
              <Link 
                to="/superadmin-dashboard" 
                className="block py-2 px-4 rounded hover:bg-primary-blue transition duration-200"
              >
                Super Admin Dashboard
              </Link>
            </li>
          )}

          {/* Voter Navigation */}
          {user && user.role === 'Voter' && (
            <>
              <li>
                <Link 
                  to="/voter-dashboard" 
                  className="block py-2 px-4 rounded hover:bg-primary-blue transition duration-200"
                >
                  Voter Dashboard
                </Link>
              </li>
              {/* Elections Section for Voters */}
              <li className="pt-4">
                <h2 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Available Elections
                </h2>
                <ul className="space-y-2 pl-2">
                  <li>
                    <Link 
                      to="/voter-dashboard/election/2025"
                      className="block py-2 px-4 rounded hover:bg-primary-blue transition duration-200 text-sm"
                    >
                      2025 Student Council Election
                    </Link>
                  </li>
                  {/* Additional elections can be mapped here */}
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && (
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      )}
    </aside>
  );
};

export default Sidebar;

