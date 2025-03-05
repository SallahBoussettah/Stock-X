import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX, FiLogOut, FiSettings } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{firstName?: string; lastName?: string} | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // Get user data if authenticated
    if (authStatus) {
      const userString = localStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
      }
    }
    
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    // Update state
    setIsAuthenticated(false);
    setUser(null);
    
    // Close menu
    setIsUserMenuOpen(false);
    
    // Redirect to home page
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            StoreX
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="font-medium hover:text-primary transition-colors">
              All Products
            </Link>
            <Link to="/categories" className="font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/deals" className="font-medium hover:text-primary transition-colors">
              Deals
            </Link>
            <Link to="/contact" className="font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/faq" className="font-medium hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <FiSearch size={18} />
              </button>
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-primary">
              <FiHeart size={20} />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary">
              <FiShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={toggleUserMenu} 
                className="p-2 text-gray-700 hover:text-primary flex items-center"
              >
                <FiUser size={20} />
                {isAuthenticated && user && (
                  <span className="ml-2 hidden sm:inline-block">
                    {user.firstName}
                  </span>
                )}
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white border rounded-md shadow-xl z-50">
                  {isAuthenticated ? (
                    <>
                      <Link 
                        to="/account" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiUser className="mr-2" />
                        My Account
                      </Link>
                      <Link 
                        to="/order-tracking" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        Track Orders
                      </Link>
                      <Link 
                        to="/wishlist" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiHeart className="mr-2" />
                        My Wishlist
                      </Link>
                      <Link 
                        to="/account/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiSettings className="mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1" />
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <FiLogOut className="mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-primary md:hidden"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <FiSearch size={18} />
              </button>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/products"
                className="py-2 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/categories"
                className="py-2 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/deals"
                className="py-2 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                to="/contact"
                className="py-2 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="py-2 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              
              {/* Auth Links for Mobile */}
              <div className="pt-2 mt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/account"
                      className="py-2 font-medium hover:text-primary transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUser className="mr-2" />
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="py-2 font-medium text-red-600 hover:text-red-800 transition-colors flex items-center w-full text-left"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="py-2 font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="py-2 font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 