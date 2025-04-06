import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 