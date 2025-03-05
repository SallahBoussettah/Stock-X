import { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-10000 hover:scale-110" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white z-10">
          <div>
            <h2 className="text-4xl font-bold">Password Reset</h2>
            <p className="mt-2 text-gray-300 max-w-md">We'll help you get back into your account with a few simple steps.</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Stock-X. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className={`w-full lg:w-1/2 bg-white p-6 sm:p-10 md:p-16 flex items-center justify-center transition-opacity ease-in-out duration-500 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md">
          <div className="mb-2">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
              <FiArrowLeft className="mr-1 h-4 w-4" />
              Back to login
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Forgot Password?</h1>
            <p className="text-gray-600">Enter your email to receive password reset instructions</p>
          </div>
          
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={`block w-full pl-10 px-4 py-3 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 ease-in-out`}
                    placeholder="name@example.com"
                  />
                </div>
                {error && (
                  <p className="mt-1 text-sm text-red-600 animate-fadeIn">{error}</p>
                )}
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Instructions'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-md animate-fadeIn">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Email sent!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      We've sent password reset instructions to <span className="font-medium">{email}</span>.
                      Please check your inbox and follow the instructions to reset your password.
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                    >
                      Return to login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 