import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTag, FiClock, FiShoppingBag, FiPercent } from 'react-icons/fi';

interface Deal {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'bogo';
  discountValue: number;
  expiryDate: string; // ISO string
  minimumPurchase?: number;
  categoryId?: string;
  categoryName?: string;
  image: string;
  couponCode?: string;
  featured: boolean;
}

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'expiringSoon' | 'featured'>('all');
  
  useEffect(() => {
    // In a real app, this would be fetched from an API
    setTimeout(() => {
      const mockDeals: Deal[] = [
        {
          id: '1',
          title: 'Summer Sale',
          description: 'Get up to 40% off on all summer clothing and accessories. Limited time offer!',
          discountType: 'percentage',
          discountValue: 40,
          expiryDate: '2023-08-31T00:00:00Z',
          categoryId: 'fashion',
          categoryName: 'Fashion',
          image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          featured: true
        },
        {
          id: '2',
          title: 'Tech Week',
          description: 'Save big on the latest electronics and gadgets. Discounts on selected items.',
          discountType: 'percentage',
          discountValue: 25,
          expiryDate: '2023-09-15T00:00:00Z',
          categoryId: 'electronics',
          categoryName: 'Electronics',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          featured: true
        },
        {
          id: '3',
          title: 'Weekend Flash Sale',
          description: 'Flash sale with up to 50% off select items! This weekend only.',
          discountType: 'percentage',
          discountValue: 50,
          expiryDate: '2023-07-10T00:00:00Z',
          image: 'https://images.unsplash.com/photo-1607083209023-8d85416fc8c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          featured: false
        },
        {
          id: '4',
          title: '$20 Off Your First Order',
          description: 'New customers get $20 off their first order over $100.',
          discountType: 'fixed',
          discountValue: 20,
          expiryDate: '2023-12-31T00:00:00Z',
          minimumPurchase: 100,
          image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          couponCode: 'FIRST20',
          featured: true
        },
        {
          id: '5',
          title: 'Buy One Get One Free',
          description: 'Buy one item and get another of equal or lesser value for free in the Accessories section.',
          discountType: 'bogo',
          discountValue: 100,
          expiryDate: '2023-08-15T00:00:00Z',
          categoryId: 'accessories',
          categoryName: 'Accessories',
          image: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80',
          couponCode: 'BOGO2023',
          featured: false
        },
        {
          id: '6',
          title: '15% Off Health & Beauty',
          description: 'Get 15% off all Health & Beauty products with this limited-time offer.',
          discountType: 'percentage',
          discountValue: 15,
          expiryDate: '2023-07-25T00:00:00Z',
          categoryId: 'beauty',
          categoryName: 'Beauty & Health',
          image: 'https://images.unsplash.com/photo-1564895014082-26fee712e9c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
          couponCode: 'BEAUTY15',
          featured: false
        }
      ];
      
      setDeals(mockDeals);
      setIsLoading(false);
    }, 800); // Simulating network delay
  }, []);

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if deal is expiring soon (within 7 days)
  const isExpiringSoon = (dateString: string): boolean => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  };

  // Filter deals based on active filter
  const filteredDeals = deals.filter(deal => {
    if (activeFilter === 'expiringSoon') {
      return isExpiringSoon(deal.expiryDate);
    } else if (activeFilter === 'featured') {
      return deal.featured;
    }
    return true;
  });

  // Format discount for display
  const formatDiscount = (deal: Deal): string => {
    switch (deal.discountType) {
      case 'percentage':
        return `${deal.discountValue}% Off`;
      case 'fixed':
        return `$${deal.discountValue} Off`;
      case 'bogo':
        return 'Buy One Get One Free';
      default:
        return 'Special Offer';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Special Offers & Deals</h1>
        <p className="text-gray-600">
          Check out our limited-time promotions and exclusive discounts.
        </p>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap
            ${activeFilter === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          All Deals
        </button>
        <button
          onClick={() => setActiveFilter('featured')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap
            ${activeFilter === 'featured' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Featured Deals
        </button>
        <button
          onClick={() => setActiveFilter('expiringSoon')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap
            ${activeFilter === 'expiringSoon' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Ending Soon
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <div 
              key={deal.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden border
                ${isExpiringSoon(deal.expiryDate) ? 'border-red-300' : 'border-transparent'}`}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-0 right-0 ${
                  deal.discountType === 'percentage' ? 'bg-red-500' :
                  deal.discountType === 'fixed' ? 'bg-blue-500' : 'bg-green-500'
                } text-white py-1 px-3 rounded-bl-lg font-bold flex items-center`}>
                  <FiPercent className="mr-1" />
                  {formatDiscount(deal)}
                </div>
                {deal.featured && (
                  <div className="absolute top-0 left-0 bg-yellow-500 text-white py-1 px-3 rounded-br-lg font-bold">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{deal.title}</h2>
                
                <p className="text-gray-600 mb-4">
                  {deal.description}
                </p>
                
                <div className="flex items-center mb-3 text-sm">
                  <FiClock className="mr-2 text-gray-500" />
                  <span className={`${isExpiringSoon(deal.expiryDate) ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {isExpiringSoon(deal.expiryDate) ? 'Ending soon! ' : ''}
                    Expires: {formatDate(deal.expiryDate)}
                  </span>
                </div>
                
                {deal.categoryName && (
                  <div className="flex items-center mb-3 text-sm">
                    <FiTag className="mr-2 text-gray-500" />
                    <Link to={`/products?category=${deal.categoryId}`} className="text-primary hover:underline">
                      {deal.categoryName}
                    </Link>
                  </div>
                )}
                
                {deal.minimumPurchase && (
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <FiShoppingBag className="mr-2" />
                    <span>Min. purchase: ${deal.minimumPurchase.toFixed(2)}</span>
                  </div>
                )}
                
                {deal.couponCode && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-1">Use coupon code:</p>
                    <div className="bg-gray-100 border border-gray-300 rounded py-2 px-3 font-mono font-medium text-center">
                      {deal.couponCode}
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <Link 
                    to={deal.categoryId ? `/products?category=${deal.categoryId}` : "/products"} 
                    className="block w-full bg-primary text-white text-center py-2 rounded hover:bg-primary-dark transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FiTag className="mx-auto text-5xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No active deals found</h2>
          <p className="text-gray-600 mb-6">
            There are no active deals matching your selection at the moment.
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
          >
            View All Deals
          </button>
        </div>
      )}
    </div>
  );
};

export default DealsPage; 