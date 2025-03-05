import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiShare2, FiLogIn } from 'react-icons/fi';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  discount?: number;
}

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    // Only fetch wishlist data if authenticated
    if (authStatus) {
      fetchWishlist();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchWishlist = () => {
    setIsLoading(true);
    // Mock data
    const mockWishlistItems: WishlistItem[] = [
      {
        id: '1',
        name: 'Designer Watch',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
        inStock: true,
        discount: 15
      },
      {
        id: '2',
        name: 'Leather Backpack',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        inStock: true
      },
      {
        id: '3',
        name: 'Wireless Headphones',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        inStock: false
      },
      {
        id: '4',
        name: 'Smart Speaker',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        inStock: true,
        discount: 10
      }
    ];

    setTimeout(() => {
      setWishlistItems(mockWishlistItems);
      setIsLoading(false);
    }, 800);
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const addToCart = (id: string) => {
    // In a real app, this would add the item to the cart
    console.log(`Added item ${id} to cart`);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(id);
  };

  const shareWishlistItem = (item: WishlistItem) => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this ${item.name} I found!`,
        url: window.location.href,
      })
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert(`Share link copied for ${item.name}!`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show a message prompting them to log in
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FiLogIn className="mx-auto text-5xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Account Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to view and manage your wishlist. If you don't have an account yet, you can register for free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="inline-block bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Create Account
            </Link>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 text-sm">
              Want to browse products instead?
              <Link 
                to="/products"
                className="text-primary hover:underline ml-1"
              >
                View All Products
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FiHeart className="mx-auto text-5xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Items added to your wishlist will be saved here for you to revisit later.
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:gap-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row">
              <div className="md:w-48 h-48 md:h-auto flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-md"
                  />
                </Link>
              </div>
              <div className="flex-1 md:ml-6 flex flex-col">
                <div className="flex-1">
                  <Link
                    to={`/products/${item.id}`}
                    className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-2 flex items-center">
                    {item.discount ? (
                      <>
                        <span className="text-lg font-bold text-primary">
                          ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm line-through text-gray-500">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm font-medium text-green-600">
                          {item.discount}% off
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    {item.inStock ? (
                      <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
                      item.inStock
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <FiTrash2 className="mr-2" />
                    Remove
                  </button>
                  <button
                    onClick={() => shareWishlistItem(item)}
                    className="flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <FiShare2 className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 