import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        
        <div className="my-8">
          <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex items-center justify-center gap-2">
            <FiHome className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <Link to="/products" className="btn btn-outline flex items-center justify-center gap-2">
            <FiShoppingBag className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="mt-16">
          <img 
            src="https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Lost in shopping" 
            className="w-full h-56 object-cover rounded-lg shadow-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 