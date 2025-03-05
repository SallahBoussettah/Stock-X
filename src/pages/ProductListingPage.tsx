import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiGrid, FiList, FiChevronDown, FiFilter, FiX } from 'react-icons/fi';
import { ProductFilterOptions } from '../types/product';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProductFilterOptions>({
    categories: category ? [category] : [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    sortBy: 'newest',
    inStock: true,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Mock categories
  const categories = [
    { id: 'electronics', name: 'Electronics', count: 24 },
    { id: 'fashion', name: 'Fashion', count: 18 },
    { id: 'accessories', name: 'Accessories', count: 12 },
    { id: 'sports', name: 'Sports & Outdoors', count: 9 },
    { id: 'beauty', name: 'Beauty & Health', count: 15 },
  ];

  // Mock products data
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      const mockProducts = [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
          category: 'Electronics',
          description: 'Premium noise cancelling wireless headphones with crystal clear sound.',
          rating: 4.5,
        },
        {
          id: '2',
          name: 'Designer Watch',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          category: 'Accessories',
          description: 'Elegant designer watch with genuine leather strap and stainless steel case.',
          rating: 4.8,
        },
        {
          id: '3',
          name: 'Fitness Tracker',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
          category: 'Electronics',
          description: 'Advanced fitness tracker with heart rate monitor and sleep tracking.',
          rating: 4.3,
        },
        {
          id: '4',
          name: 'Leather Bag',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
          category: 'Fashion',
          description: 'Premium leather bag with multiple compartments and adjustable strap.',
          rating: 4.7,
        },
        {
          id: '5',
          name: 'Smartphone',
          price: 699.99,
          image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2027&q=80',
          category: 'Electronics',
          description: 'Latest model smartphone with high-resolution camera and fast processor.',
          rating: 4.6,
        },
        {
          id: '6',
          name: 'Wireless Earbuds',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1978&q=80',
          category: 'Electronics',
          description: 'Comfortable wireless earbuds with long battery life and premium sound quality.',
          rating: 4.2,
        },
        {
          id: '7',
          name: 'Running Shoes',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          category: 'Sports',
          description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
          rating: 4.4,
        },
        {
          id: '8',
          name: 'Premium Sunglasses',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
          category: 'Accessories',
          description: 'Designer sunglasses with UV protection and polarized lenses.',
          rating: 4.9,
        }
      ];

      // Filter products based on category if selected
      let filteredProducts = mockProducts;
      if (category) {
        filteredProducts = mockProducts.filter(
          product => product.category.toLowerCase() === category.toLowerCase()
        );
      }

      setProducts(filteredProducts);
      setIsLoading(false);
    }, 800); // Simulating network delay
  }, [category]);

  const handleCategoryChange = (categoryId: string) => {
    // Update filters
    const updatedCategories = filters.categories?.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...(filters.categories || []), categoryId];
    
    setFilters({
      ...filters,
      categories: updatedCategories
    });
    
    // In a real app, this would trigger a fetch with the new filters
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            } ${i === Math.floor(rating) && rating % 1 > 0 ? 'text-yellow-400' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-gray-500 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      sortBy: e.target.value as any
    });
    // In a real app, this would trigger a re-fetch or re-sort
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 rounded-md"
          >
            <FiFilter className="mr-2" />
            Filters
          </button>
        </div>

        {/* Sidebar filters - desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                      checked={filters.categories?.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                    />
                    <span className="ml-2 text-gray-700">{cat.name}</span>
                    <span className="ml-auto text-xs text-gray-500">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex items-center">
                <input
                  type="number"
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  value={filters.priceRange?.min}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange!, min: Number(e.target.value) }
                  })}
                />
                <span className="mx-2">to</span>
                <input
                  type="number"
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  value={filters.priceRange?.max}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: { ...filters.priceRange!, max: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      className="form-radio h-4 w-4 text-primary rounded focus:ring-primary"
                      checked={filters.rating === rating}
                      onChange={() => setFilters({ ...filters, rating })}
                    />
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-500 whitespace-nowrap">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Availability</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                  checked={filters.inStock}
                  onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                />
                <span className="ml-2 text-gray-700">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Mobile filters - slide out */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)}></div>
            <div className="absolute inset-y-0 left-0 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="overflow-y-auto p-4">
                    {/* Filter content - same as desktop but styled for mobile */}
                    {/* Categories */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Categories</h3>
                      <div className="space-y-2">
                        {categories.map(cat => (
                          <label key={cat.id} className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
                              checked={filters.categories?.includes(cat.id)}
                              onChange={() => handleCategoryChange(cat.id)}
                            />
                            <span className="ml-2 text-gray-700">{cat.name}</span>
                            <span className="ml-auto text-xs text-gray-500">{cat.count}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Price Range</h3>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="w-24 px-3 py-2 border border-gray-300 rounded text-sm"
                          value={filters.priceRange?.min}
                          onChange={(e) => setFilters({
                            ...filters,
                            priceRange: { ...filters.priceRange!, min: Number(e.target.value) }
                          })}
                        />
                        <span className="mx-2">to</span>
                        <input
                          type="number"
                          className="w-24 px-3 py-2 border border-gray-300 rounded text-sm"
                          value={filters.priceRange?.max}
                          onChange={(e) => setFilters({
                            ...filters,
                            priceRange: { ...filters.priceRange!, max: Number(e.target.value) }
                          })}
                        />
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Rating</h3>
                      <div className="space-y-3">
                        {[4, 3, 2, 1].map(rating => (
                          <label key={rating} className="flex items-center">
                            <input
                              type="radio"
                              name="rating"
                              className="form-radio h-5 w-5 text-primary rounded focus:ring-primary"
                              checked={filters.rating === rating}
                              onChange={() => setFilters({ ...filters, rating })}
                            />
                            <div className="ml-2 flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-sm text-gray-500">& up</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Availability */}
                    <div>
                      <h3 className="font-medium mb-2">Availability</h3>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
                          checked={filters.inStock}
                          onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                        />
                        <span className="ml-2 text-gray-700">In Stock Only</span>
                      </label>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <button 
                      className="w-full btn-primary py-2"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1">
          {/* Results header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold mb-2 sm:mb-0">
              {category 
                ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` 
                : 'All Products'}
            </h1>
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
              {/* View options */}
              <div className="flex border rounded overflow-hidden">
                <button
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList className="h-5 w-5" />
                </button>
              </div>
              {/* Sort options */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={filters.sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-500 mb-6">Showing {products.length} results</p>

          {/* Product grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="card group">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <h3 className="font-bold text-lg mb-1">
                      <Link to={`/products/${product.id}`} className="hover:text-primary">
                        {product.name}
                      </Link>
                    </h3>
                    {renderStarRating(product.rating)}
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                      <button className="btn-primary py-2 px-4 text-sm">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {products.map((product) => (
                <div key={product.id} className="card flex flex-col sm:flex-row overflow-hidden">
                  <div className="relative w-full sm:w-48 h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <h3 className="font-bold text-lg mb-1">
                        <Link to={`/products/${product.id}`} className="hover:text-primary">
                          {product.name}
                        </Link>
                      </h3>
                      {renderStarRating(product.rating)}
                      <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                      <button className="btn-primary py-2 px-4">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination - simplified */}
          <div className="mt-10 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white"
              >
                2
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage; 