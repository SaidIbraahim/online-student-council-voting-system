import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Empowering Student Voices Through Modern Voting
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to our innovative student voting platform, designed for ease of use
          and real-time engagement. Explore candidate profiles, cast your vote
          securely, and make your voice heard in a modern way.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleLoginClick}
            className="px-6 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
          >
            Login
          </button>
          <button
            onClick={handleRegisterClick}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Register
          </button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="bg-blue-500 rounded-3xl p-8 w-full max-w-md">
          <img
            src="/voting-illustration.svg"
            alt="Voting Illustration"
            className="w-full h-auto"
          />
          <div className="text-center text-white mt-4">
            <h3 className="text-xl font-bold">YOUR VOTE, YOUR POWER</h3>
            <p>VOTE FOR CHANGE!</p>
          </div>
        </div>
      </div>
    </div>
  );
}