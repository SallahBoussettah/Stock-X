import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiGithub, FiTwitter, FiFacebook } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Mock user data
const MOCK_USERS = [
  {
    email: 'user@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe'
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User'
  }
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check against mock users
      const user = MOCK_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        // Mock successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }));
        
        // Redirect to account page
        navigate('/account');
      } else {
        setErrors({
          general: 'Invalid email or password'
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred. Please try again.'
      });
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
          
          <div className="text-center relative">
            <h2 className="text-3xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-white/80 text-sm mb-8">
              Sign in to your account to continue
            </p>
          </div>
          
          {errors.general && (
            <div className="mb-6 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4">
              <p className="text-sm text-white">{errors.general}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1 ml-1">
                  Email
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
                    value={credentials.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 px-4 py-3 bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/20'} focus:border-white/40 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-200`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-300 ml-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-1 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={credentials.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 px-4 py-3 bg-white/10 border ${errors.password ? 'border-red-400' : 'border-white/20'} focus:border-white/40 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-200`}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/70 hover:text-white focus:outline-none transition duration-200"
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-300 ml-1">{errors.password}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative inline-flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={credentials.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 border-2 border-white/30 rounded bg-white/5 checked:bg-indigo-500 focus:ring-2 focus:ring-white/40"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-white/80">
                      Remember me
                    </label>
                  </div>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-white/80 hover:text-white transition duration-200">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
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
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white/70">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-4 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition duration-200"
            >
              <FcGoogle className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition duration-200"
            >
              <FiFacebook className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition duration-200"
            >
              <FiTwitter className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition duration-200"
            >
              <FiGithub className="h-5 w-5" />
            </button>
          </div>
          
          <p className="mt-8 text-center text-sm text-white/70">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-white hover:text-white/90 transition duration-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 