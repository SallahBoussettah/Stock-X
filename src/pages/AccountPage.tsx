import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiSettings, FiCreditCard, FiMapPin, FiLogOut, FiTruck, FiCheck, FiCheckCircle } from 'react-icons/fi';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

interface OrderStep {
  label: string;
  description: string;
  icon: React.ReactNode;
  date?: string;
  completed: boolean;
  current: boolean;
}

interface OrderDetails {
  orderId: string;
  customerName: string;
  orderDate: string;
  estimatedDelivery: string;
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
  carrier: string;
  trackingNumber: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

const AccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Load user profile from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserProfile({
        firstName: user.firstName || 'John',
        lastName: user.lastName || 'Doe',
        email: user.email || 'user@example.com',
        phone: '(555) 123-4567',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      });
    }
    
    // Simulate loading order history
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-39382',
          date: '2023-09-15',
          total: 129.99,
          status: 'delivered',
          items: 2
        },
        {
          id: 'ORD-38291',
          date: '2023-08-27',
          total: 249.50,
          status: 'delivered',
          items: 3
        },
        {
          id: 'ORD-37190',
          date: '2023-07-14',
          total: 89.99,
          status: 'cancelled',
          items: 1
        },
        {
          id: 'ORD-36089',
          date: '2023-06-02',
          total: 199.98,
          status: 'delivered',
          items: 2
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDateAfterDays = (dateString: string, days: number): string => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const getOrderSteps = (status: OrderDetails['status']): OrderStep[] => {
    const steps: OrderStep[] = [
      {
        label: 'Order Placed',
        description: 'Your order has been confirmed',
        icon: <FiCheckCircle className="w-6 h-6" />,
        date: selectedOrder?.orderDate,
        completed: true,
        current: status === 'processing'
      },
      {
        label: 'Processing',
        description: 'Your order is being prepared',
        icon: <FiPackage className="w-6 h-6" />,
        date: status !== 'processing' ? getDateAfterDays(selectedOrder?.orderDate || '', 1) : undefined,
        completed: status !== 'processing',
        current: status === 'processing'
      },
      {
        label: 'Shipped',
        description: 'Your order has been shipped',
        icon: <FiTruck className="w-6 h-6" />,
        date: status === 'shipped' || status === 'out-for-delivery' || status === 'delivered' 
          ? getDateAfterDays(selectedOrder?.orderDate || '', 2) 
          : undefined,
        completed: status === 'shipped' || status === 'out-for-delivery' || status === 'delivered',
        current: status === 'shipped'
      },
      {
        label: 'Out for Delivery',
        description: 'Your order is on its way',
        icon: <FiTruck className="w-6 h-6" />,
        date: status === 'out-for-delivery' || status === 'delivered' 
          ? getDateAfterDays(selectedOrder?.orderDate || '', 4) 
          : undefined,
        completed: status === 'out-for-delivery' || status === 'delivered',
        current: status === 'out-for-delivery'
      },
      {
        label: 'Delivered',
        description: 'Your order has been delivered',
        icon: <FiCheck className="w-6 h-6" />,
        date: status === 'delivered' ? selectedOrder?.estimatedDelivery : undefined,
        completed: status === 'delivered',
        current: status === 'delivered'
      }
    ];

    return steps;
  };

  const handleTrackOrder = (orderId: string) => {
    setSelectedOrder(null);
    setIsLoadingTracking(true);

    // Simulate API call to fetch order tracking details
    setTimeout(() => {
      // Mock order details - in a real app, this would come from an API
      const mockOrderDetails: OrderDetails = {
        orderId: orderId,
        customerName: `${userProfile?.firstName} ${userProfile?.lastName}`,
        orderDate: '2023-05-15',
        estimatedDelivery: '2023-05-20',
        status: 'out-for-delivery',
        carrier: 'Express Delivery',
        trackingNumber: '12345678',
        items: [
          {
            id: '1',
            name: 'Designer Watch',
            quantity: 1,
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80'
          },
          {
            id: '2',
            name: 'Leather Bag',
            quantity: 1,
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'
          }
        ],
        shippingAddress: {
          name: `${userProfile?.firstName} ${userProfile?.lastName}`,
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'United States'
        }
      };
      
      setSelectedOrder(mockOrderDetails);
      setIsLoadingTracking(false);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={userProfile?.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {userProfile?.firstName} {userProfile?.lastName}
                </h3>
                <p className="text-gray-500">{userProfile?.email}</p>
                <p className="text-gray-500">{userProfile?.phone}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Account Information</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{userProfile?.firstName} {userProfile?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{userProfile?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{userProfile?.phone}</p>
                  </div>
                </div>
                <button className="mt-4 text-primary hover:text-primary-dark font-medium">
                  Edit Profile
                </button>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Account Activity</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="font-medium">Today at 10:32 AM</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">January 15, 2023</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Password</p>
                    <p className="font-medium">********</p>
                    <button className="text-primary hover:text-primary-dark text-sm font-medium">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Order History</h3>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : orders.length > 0 ? (
              <>
                {selectedOrder && (
                  <div className="mb-8 border-b pb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold">Tracking Order: {selectedOrder.orderId}</h4>
                      <button 
                        onClick={() => {
                          setSelectedOrder(null);
                        }}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Close Tracking
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <h5 className="text-md font-semibold mb-4">Tracking Information</h5>
                      <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 md:left-[1.65rem]"></div>
                        
                        <div className="space-y-8">
                          {getOrderSteps(selectedOrder.status).map((step, index) => (
                            <div key={index} className="relative flex items-start">
                              <div 
                                className={`flex-shrink-0 z-10 w-12 h-12 flex items-center justify-center rounded-full border-2 mr-4 
                                  ${step.completed 
                                    ? 'bg-green-500 border-green-500 text-white' 
                                    : step.current 
                                      ? 'border-primary bg-primary-50 text-primary' 
                                      : 'border-gray-300 bg-white text-gray-300'}`}
                              >
                                {step.icon}
                              </div>
                              
                              <div className="flex-1 pt-1.5">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                  <div>
                                    <h4 className={`text-lg font-medium ${step.current ? 'text-primary' : 'text-gray-900'}`}>
                                      {step.label}
                                    </h4>
                                    <p className="text-gray-600 mt-1">{step.description}</p>
                                  </div>
                                  {step.date && (
                                    <span className="text-sm text-gray-500 mt-1 md:mt-0">{formatDate(step.date)}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-md font-semibold mb-3">Shipping Details</h5>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                          <p>{selectedOrder.shippingAddress.street}</p>
                          <p>
                            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                          </p>
                          <p>{selectedOrder.shippingAddress.country}</p>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="font-medium">Delivery Method:</p>
                            <p>{selectedOrder.carrier}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Tracking Number: {selectedOrder.trackingNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-md font-semibold mb-3">Order Summary</h5>
                        <div className="space-y-4">
                          {selectedOrder.items.map((item) => (
                            <div key={item.id} className="flex items-start">
                              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden mr-4">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                <p>${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.items} {order.items === 1 ? 'item' : 'items'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-3">
                              <Link to={`/order/${order.id}`} className="text-primary hover:text-primary-dark">
                                View
                              </Link>
                              {order.status !== 'cancelled' && (
                                <button 
                                  onClick={() => handleTrackOrder(order.id)}
                                  className="text-primary hover:text-primary-dark flex items-center"
                                >
                                  {isLoadingTracking && selectedOrder?.orderId === order.id ? (
                                    <span className="flex items-center">
                                      <span className="animate-spin h-3 w-3 mr-1 border-t-2 border-b-2 border-primary rounded-full"></span>
                                      Loading...
                                    </span>
                                  ) : (
                                    <>Track<FiTruck className="ml-1 h-3 w-3" /></>
                                  )}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                <Link
                  to="/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        );
        
      case 'wishlist':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Wishlist</h3>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Browse Products
              </Link>
            </div>
          </div>
        );
        
      case 'addresses':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Saved Addresses</h3>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Add New Address
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 relative">
                <div className="absolute top-4 right-4 space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">Edit</button>
                  <button className="text-gray-400 hover:text-gray-500">Delete</button>
                </div>
                <div className="pt-6">
                  <p className="font-medium">{userProfile?.firstName} {userProfile?.lastName}</p>
                  <p className="text-gray-500">123 Main Street</p>
                  <p className="text-gray-500">Apt 4B</p>
                  <p className="text-gray-500">New York, NY 10001</p>
                  <p className="text-gray-500">United States</p>
                  <p className="text-gray-500">{userProfile?.phone}</p>
                  
                  <div className="mt-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Default Shipping
                    </span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Default Billing
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 relative">
                <div className="absolute top-4 right-4 space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">Edit</button>
                  <button className="text-gray-400 hover:text-gray-500">Delete</button>
                </div>
                <div className="pt-6">
                  <p className="font-medium">{userProfile?.firstName} {userProfile?.lastName}</p>
                  <p className="text-gray-500">456 Work Avenue</p>
                  <p className="text-gray-500">Suite 789</p>
                  <p className="text-gray-500">San Francisco, CA 94103</p>
                  <p className="text-gray-500">United States</p>
                  <p className="text-gray-500">(555) 987-6543</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'payment':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Payment Methods</h3>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Add Payment Method
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 4H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H2V6h20v12zM4 12h4v2H4v-2zm10 0h4v2h-4v-2zm-6 0h4v2H8v-2z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-gray-500 text-sm">Expires 12/2025</p>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Default
                  </span>
                </div>
                <div className="ml-4">
                  <button className="text-gray-400 hover:text-gray-500 mr-2">Edit</button>
                  <button className="text-gray-400 hover:text-gray-500">Delete</button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 4H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H2V6h20v12zM4 12h4v2H4v-2zm10 0h4v2h-4v-2zm-6 0h4v2H8v-2z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium">Mastercard ending in 5678</p>
                  <p className="text-gray-500 text-sm">Expires 08/2024</p>
                </div>
                <div className="ml-4">
                  <button className="text-gray-400 hover:text-gray-500 mr-2">Edit</button>
                  <button className="text-gray-400 hover:text-gray-500">Delete</button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">Account Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="order-updates"
                        name="order-updates"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="order-updates" className="font-medium text-gray-700">
                        Order Updates
                      </label>
                      <p className="text-gray-500">Receive notifications about your order status and shipping updates.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="promotions"
                        name="promotions"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="promotions" className="font-medium text-gray-700">
                        Promotions and Deals
                      </label>
                      <p className="text-gray-500">Receive emails about new promotions, discounts, and special offers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="new-products"
                        name="new-products"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="new-products" className="font-medium text-gray-700">
                        New Products
                      </label>
                      <p className="text-gray-500">Be the first to know about new product releases and updates.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Privacy Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="data-collection"
                        name="data-collection"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="data-collection" className="font-medium text-gray-700">
                        Data Collection
                      </label>
                      <p className="text-gray-500">Allow us to collect data about your browsing and shopping habits to improve your experience.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="third-party"
                        name="third-party"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="third-party" className="font-medium text-gray-700">
                        Third-Party Sharing
                      </label>
                      <p className="text-gray-500">Allow us to share your information with trusted third-party partners.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Account Actions</h4>
                <div className="space-y-4">
                  <button className="text-red-600 hover:text-red-800 font-medium">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!userProfile && isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={userProfile?.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{userProfile?.firstName} {userProfile?.lastName}</h3>
                  <p className="text-gray-500 text-sm">{userProfile?.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FiUser className="mr-3 h-5 w-5" />
                    My Profile
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <FiPackage className="mr-3 h-5 w-5" />
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'wishlist' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <FiHeart className="mr-3 h-5 w-5" />
                    Wishlist
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'addresses' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('addresses')}
                  >
                    <FiMapPin className="mr-3 h-5 w-5" />
                    Addresses
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'payment' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('payment')}
                  >
                    <FiCreditCard className="mr-3 h-5 w-5" />
                    Payment Methods
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <FiSettings className="mr-3 h-5 w-5" />
                    Account Settings
                  </button>
                </li>
                <li className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage; 