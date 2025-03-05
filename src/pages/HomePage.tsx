import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // In a real app, these would come from an API
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Designer Watch',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
      category: 'Accessories'
    },
    {
      id: '3',
      name: 'Fitness Tracker',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      category: 'Electronics'
    },
    {
      id: '4',
      name: 'Leather Bag',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
      category: 'Accessories'
    }
  ]);

  const [categories, setCategories] = useState([
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'home', name: 'Home & Kitchen' },
  ]);

  return (
    <div>
      {/* Hero Section with background image instead of solid color */}
      <div className="relative">
        <div 
          className="bg-cover bg-center h-96" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')", 
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-indigo-900 bg-opacity-70"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop the Latest Trends</h1>
            <p className="text-xl text-white mb-8">Discover premium products with exclusive deals and discounts</p>
            <Link to="/products" className="btn btn-primary px-8 py-3 text-lg">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                    />
                  </Link>
                </div>
                <div>
                  <Link to={`/products/${product.id}`} className="text-lg font-medium text-gray-900 hover:text-primary">
                    {product.name}
                  </Link>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="font-bold text-gray-900 mt-1">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-lg h-64 group">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1401&q=80"
                alt="Electronics"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link
                  to="/products?category=electronics"
                  className="text-white text-2xl font-bold hover:underline"
                >
                  Electronics
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg h-64 group">
              <img
                src="https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Fashion"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link
                  to="/products?category=fashion"
                  className="text-white text-2xl font-bold hover:underline"
                >
                  Fashion
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg h-64 group">
              <img
                src="https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                alt="Accessories"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link
                  to="/products?category=accessories"
                  className="text-white text-2xl font-bold hover:underline"
                >
                  Accessories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="form-input flex-grow"
                required
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 