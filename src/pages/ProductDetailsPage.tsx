import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiChevronRight } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  variants: {
    id: string;
    name: string;
    options: {
      id: string;
      value: string;
      inStock: boolean;
    }[];
  }[];
  specifications: Record<string, string>;
}

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockProduct: Product = {
        id: productId || '1',
        name: 'Premium Wireless Headphones',
        price: 199.99,
        discountedPrice: 149.99,
        description: `Experience premium sound quality with our wireless headphones. These headphones feature active noise cancellation, 
                     a comfortable over-ear design, and up to 30 hours of battery life. Perfect for commuting, travel, or everyday use.
                    
                     The advanced Bluetooth 5.0 technology ensures a stable connection and the built-in microphone provides clear calls.
                     These headphones are compatible with all major devices including smartphones, tablets, and laptops.`,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80',
          'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        ],
        category: 'Electronics',
        inStock: true,
        stockQuantity: 25,
        rating: 4.7,
        reviewCount: 128,
        variants: [
          {
            id: 'color',
            name: 'Color',
            options: [
              { id: 'black', value: 'Black', inStock: true },
              { id: 'white', value: 'White', inStock: true },
              { id: 'blue', value: 'Blue', inStock: false },
            ],
          },
        ],
        specifications: {
          'Brand': 'TechAudio',
          'Model': 'ProSound X7',
          'Color': 'Multiple options',
          'Connectivity': 'Bluetooth 5.0',
          'Battery Life': 'Up to 30 hours',
          'Noise Cancellation': 'Active',
          'Microphone': 'Built-in',
          'Weight': '250g',
          'Warranty': '2 years',
        },
      };
      
      // Different products based on ID
      if (productId === '2') {
        mockProduct.name = 'Designer Watch';
        mockProduct.price = 299.99;
        mockProduct.discountedPrice = 149.99;
        mockProduct.description = `Elegant designer watch with premium materials and sophisticated design. Features a genuine leather strap, stainless steel case, and precise quartz movement.
                                  Water-resistant up to 50 meters and comes with a scratch-resistant sapphire crystal face.`;
        mockProduct.images = [
          'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=942&q=80',
          'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
          'https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=704&q=80',
        ];
        mockProduct.category = 'Accessories';
        mockProduct.variants = [
          {
            id: 'strap',
            name: 'Strap',
            options: [
              { id: 'leather', value: 'Leather', inStock: true },
              { id: 'metal', value: 'Metal', inStock: true },
              { id: 'silicone', value: 'Silicone', inStock: false },
            ],
          },
          {
            id: 'case',
            name: 'Case Color',
            options: [
              { id: 'silver', value: 'Silver', inStock: true },
              { id: 'gold', value: 'Gold', inStock: true },
              { id: 'rosegold', value: 'Rose Gold', inStock: true },
            ],
          },
        ];
        mockProduct.specifications = {
          'Brand': 'LuxWatch',
          'Model': 'Chrono X',
          'Movement': 'Swiss Quartz',
          'Case Material': 'Stainless Steel',
          'Case Diameter': '42mm',
          'Water Resistance': '50m',
          'Crystal': 'Sapphire',
          'Warranty': '3 years',
        };
      } else if (productId === '3') {
        mockProduct.name = 'Fitness Tracker';
        mockProduct.price = 99.99;
        mockProduct.discountedPrice = 79.99;
        mockProduct.description = `Advanced fitness tracker with heart rate monitoring, sleep tracking, and GPS. Track your steps, calories, and workouts with precision.
                                  Features a vibrant OLED display and up to 7 days of battery life. Water-resistant for swimming and showering.`;
        mockProduct.images = [
          'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
          'https://images.unsplash.com/photo-1509983165097-0c31a863e3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
          'https://images.unsplash.com/photo-1536262943558-524344f12332?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
        ];
        mockProduct.category = 'Electronics';
        mockProduct.variants = [
          {
            id: 'color',
            name: 'Color',
            options: [
              { id: 'black', value: 'Black', inStock: true },
              { id: 'blue', value: 'Blue', inStock: true },
              { id: 'pink', value: 'Pink', inStock: true },
            ],
          },
          {
            id: 'size',
            name: 'Band Size',
            options: [
              { id: 'small', value: 'Small', inStock: true },
              { id: 'medium', value: 'Medium', inStock: true },
              { id: 'large', value: 'Large', inStock: true },
            ],
          },
        ];
        mockProduct.specifications = {
          'Brand': 'FitTech',
          'Model': 'Activity Pro',
          'Display': 'OLED Touch',
          'Battery Life': 'Up to 7 days',
          'Water Resistance': '5 ATM',
          'Sensors': 'Heart Rate, Accelerometer, GPS',
          'Compatibility': 'iOS, Android',
          'Warranty': '1 year',
        };
      }
      
      setProduct(mockProduct);
      setSelectedImage(mockProduct.images[0]);
      // Initialize selected variants with first option of each variant
      const initialVariants: Record<string, string> = {};
      mockProduct.variants.forEach(variant => {
        const availableOption = variant.options.find(option => option.inStock);
        if (availableOption) {
          initialVariants[variant.id] = availableOption.id;
        }
      });
      setSelectedVariants(initialVariants);
      setIsLoading(false);
    }, 800);
  }, [productId]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (variantId: string, optionId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: optionId,
    }));
  };

  const addToCart = () => {
    // In a real app, this would dispatch a Redux action to add to cart
    console.log('Adding to cart:', {
      productId: product?.id,
      quantity,
      selectedVariants,
    });
  };

  const addToWishlist = () => {
    // In a real app, this would dispatch a Redux action to add to wishlist
    console.log('Adding to wishlist:', product?.id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="mt-2 text-gray-600">
            Sorry, the product you are looking for does not exist or has been removed.
          </p>
          <Link to="/products" className="mt-4 inline-block btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-600 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <FiChevronRight className="text-gray-400" />
                <Link to="/products" className="ml-1 text-gray-600 hover:text-primary">
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <FiChevronRight className="text-gray-400" />
                <Link to={`/products?category=${product.category.toLowerCase()}`} className="ml-1 text-gray-600 hover:text-primary">
                  {product.category}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <FiChevronRight className="text-gray-400" />
                <span className="ml-1 text-gray-800 font-medium">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="mb-4 bg-white rounded-lg overflow-hidden shadow-md h-[500px]">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all h-24 ${
                  selectedImage === image ? 'border-primary' : 'border-gray-200 hover:border-gray-400'
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${product.name} - view ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            {product.discountedPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">${product.discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-medium">
                  Save ${(product.price - product.discountedPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                In Stock ({product.stockQuantity} available)
              </span>
            ) : (
              <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            )}
          </div>
          
          {/* Short Description */}
          <div className="mb-6">
            <p className="text-gray-600">
              {product.description.split('\n')[0]}
            </p>
          </div>
          
          {/* Variants */}
          {product.variants.map(variant => (
            <div key={variant.id} className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">{variant.name}</h3>
              <div className="flex flex-wrap gap-2">
                {variant.options.map(option => (
                  <button
                    key={option.id}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      selectedVariants[variant.id] === option.id
                        ? 'border-primary bg-primary text-white'
                        : option.inStock
                        ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={() => option.inStock && handleVariantChange(variant.id, option.id)}
                    disabled={!option.inStock}
                  >
                    {option.value}
                    {!option.inStock && ' (Out of Stock)'}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                className="border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <input
                type="number"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 border-t border-b border-gray-300 text-center"
              />
              <button
                className="border border-gray-300 rounded-r-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stockQuantity}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Add to Cart & Wishlist */}
          <div className="mb-8 flex flex-wrap gap-4">
            <button
              onClick={addToCart}
              disabled={!product.inStock}
              className="btn btn-primary flex-1 md:flex-none md:min-w-[200px]"
            >
              <FiShoppingCart className="mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={addToWishlist}
              className="btn btn-outline flex-1 md:flex-none md:min-w-[200px]"
            >
              <FiHeart className="mr-2" />
              Add to Wishlist
            </button>
            <button className="btn btn-outline p-3">
              <FiShare2 />
            </button>
          </div>
          
          {/* Additional Info */}
          <div>
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'specifications'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('specifications')}
                >
                  Specifications
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </nav>
            </div>
            <div className="py-4">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  {product.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              )}
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-900">{key}: </span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <p className="text-gray-600">Reviews will be implemented in the next phase.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage; 