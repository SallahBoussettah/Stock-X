import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories?: { id: string; name: string; count: number }[];
}

const CategoriesPage: React.FC = () => {
  // In a real app, this would be fetched from an API
  const categories: Category[] = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'The latest gadgets and electronic devices, including smartphones, laptops, tablets, and smart home technology.',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1401&q=80',
      productCount: 24,
      subcategories: [
        { id: 'smartphones', name: 'Smartphones', count: 8 },
        { id: 'laptops', name: 'Laptops & Computers', count: 6 },
        { id: 'audio', name: 'Audio & Headphones', count: 5 },
        { id: 'wearables', name: 'Wearable Technology', count: 5 }
      ]
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Stylish clothing, footwear, and accessories for men, women, and children of all ages.',
      image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      productCount: 18,
      subcategories: [
        { id: 'men', name: 'Men\'s Clothing', count: 6 },
        { id: 'women', name: 'Women\'s Clothing', count: 8 },
        { id: 'kids', name: 'Kids\' Clothing', count: 4 }
      ]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Complete your look with our range of watches, jewelry, bags, and other fashion accessories.',
      image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      productCount: 12,
      subcategories: [
        { id: 'watches', name: 'Watches', count: 4 },
        { id: 'jewelry', name: 'Jewelry', count: 3 },
        { id: 'bags', name: 'Bags & Wallets', count: 5 }
      ]
    },
    {
      id: 'sports',
      name: 'Sports & Outdoors',
      description: 'Everything you need for fitness, sports, camping, and outdoor activities.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      productCount: 14,
      subcategories: [
        { id: 'fitness', name: 'Fitness Equipment', count: 5 },
        { id: 'sportswear', name: 'Sportswear', count: 4 },
        { id: 'camping', name: 'Camping Gear', count: 5 }
      ]
    },
    {
      id: 'beauty',
      name: 'Beauty & Health',
      description: 'Premium skincare, makeup, personal care, and health products for your daily routine.',
      image: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      productCount: 15,
      subcategories: [
        { id: 'skincare', name: 'Skincare', count: 6 },
        { id: 'makeup', name: 'Makeup', count: 5 },
        { id: 'hair', name: 'Hair Care', count: 4 }
      ]
    },
    {
      id: 'home',
      name: 'Home & Kitchen',
      description: 'Furnish and decorate your home with our selection of furniture, decor, and kitchen appliances.',
      image: 'https://images.unsplash.com/photo-1556911220-bda9f7f4ec2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      productCount: 10,
      subcategories: [
        { id: 'furniture', name: 'Furniture', count: 3 },
        { id: 'kitchen', name: 'Kitchen Appliances', count: 4 },
        { id: 'decor', name: 'Home Decor', count: 3 }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop By Category</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  {category.productCount} Products
                </span>
              </div>
              
              {category.subcategories && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">Subcategories:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {category.subcategories.map(sub => (
                      <Link 
                        key={sub.id} 
                        to={`/products?category=${sub.id}`}
                        className="flex items-center text-gray-700 hover:text-primary"
                      >
                        <FiChevronRight className="mr-1" size={14} />
                        {sub.name}
                        <span className="ml-1 text-xs text-gray-500">({sub.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <Link 
                to={`/products?category=${category.id}`} 
                className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
              >
                Browse {category.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage; 