import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError(null);
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would call an API endpoint to send a password reset email
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
        
        {/* Main card with glassmorphism effect */}
        <div className="backdrop-blur-xl bg-white bg-opacity-10 rounded-2xl shadow-2xl border border-white border-opacity-20 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 pointer-events-none"></div>
          
          {!isSubmitted ? (
            <>
              <div className="text-center relative">
                <h2 className="text-3xl font-bold text-white mb-1">Reset Password</h2>
                <p className="text-white/80 text-sm mb-8">
                  Enter your email and we'll send you a link to reset your password
                </p>
              </div>
              
              {error && (
                <div className="mb-6 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4">
                  <p className="text-sm text-white">{error}</p>
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1 ml-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-white/60" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 px-4 py-3 bg-white/10 border border-white/20 focus:border-white/40 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-200"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200 transform hover:translate-y-[-2px]"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isLoading ? 'Sending...' : 'Reset Password'}
                  </button>
                </div>
                
                <div className="text-center mt-6">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition duration-200"
                  >
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8 relative">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 backdrop-blur-sm mb-6">
                <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Reset link sent!</h3>
              <p className="text-white/80 mb-1">
                We've sent a password reset link to:
              </p>
              <p className="font-medium text-white mb-6">{email}</p>
              <p className="text-white/70 text-sm mb-8">
                Please check your inbox and follow the instructions to reset your password.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-200"
              >
                Return to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 