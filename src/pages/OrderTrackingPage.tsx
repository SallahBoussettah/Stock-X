import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheck, FiCheckCircle, FiPrinter, FiMail, FiAlertCircle, FiSearch } from 'react-icons/fi';

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

const OrderTrackingPage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [trackingError, setTrackingError] = useState('');
  
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setTrackingError('Please enter a valid order ID or tracking number');
      return;
    }
    
    setIsLoading(true);
    setTrackingError('');
    
    // Simulate API call
    setTimeout(() => {
      // Mock success response for demo purposes
      // In a real app, this would be an API call to your backend
      if (trackingNumber === '12345' || trackingNumber.toLowerCase() === 'ord-2023-1001') {
        const mockOrderDetails: OrderDetails = {
          orderId: 'ORD-2023-1001',
          customerName: 'John Smith',
          orderDate: '2023-07-15T10:30:00Z',
          estimatedDelivery: '2023-07-20T17:00:00Z',
          status: 'shipped',
          carrier: 'FedEx',
          trackingNumber: 'FDX123456789',
          items: [
            {
              id: '1',
              name: 'Wireless Headphones',
              quantity: 1,
              price: 149.99,
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            },
            {
              id: '2',
              name: 'Smart Watch',
              quantity: 1,
              price: 299.99,
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80'
            }
          ],
          shippingAddress: {
            name: 'John Smith',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States'
          }
        };
        setOrderDetails(mockOrderDetails);
      } else if (trackingNumber === '54321' || trackingNumber.toLowerCase() === 'ord-2023-1002') {
        const mockOrderDetails: OrderDetails = {
          orderId: 'ORD-2023-1002',
          customerName: 'Sarah Johnson',
          orderDate: '2023-07-16T14:45:00Z',
          estimatedDelivery: '2023-07-21T17:00:00Z',
          status: 'processing',
          carrier: 'UPS',
          trackingNumber: 'UPS987654321',
          items: [
            {
              id: '3',
              name: 'Smartphone Case',
              quantity: 2,
              price: 24.99,
              image: 'https://images.unsplash.com/photo-1533573141592-10a4471481b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            },
            {
              id: '4',
              name: 'Bluetooth Speaker',
              quantity: 1,
              price: 79.99,
              image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            }
          ],
          shippingAddress: {
            name: 'Sarah Johnson',
            street: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90001',
            country: 'United States'
          }
        };
        setOrderDetails(mockOrderDetails);
      } else {
        setTrackingError('No order found with that ID or tracking number. Please check and try again.');
        setOrderDetails(null);
      }
      setIsLoading(false);
    }, 1500);
  };
  
  const getOrderSteps = (status: OrderDetails['status']): OrderStep[] => {
    const steps: OrderStep[] = [
      {
        label: 'Order Placed',
        description: 'Your order has been received',
        icon: <FiCheckCircle className="h-6 w-6" />,
        date: orderDetails ? formatDate(getDateAfterDays(orderDetails.orderDate, 0)) : undefined,
        completed: true,
        current: status === 'processing',
      },
      {
        label: 'Processing',
        description: 'Your order is being prepared',
        icon: <FiPackage className="h-6 w-6" />,
        date: orderDetails ? formatDate(getDateAfterDays(orderDetails.orderDate, 1)) : undefined,
        completed: ['shipped', 'out-for-delivery', 'delivered'].includes(status),
        current: status === 'processing',
      },
      {
        label: 'Shipped',
        description: 'Your order is on the way',
        icon: <FiTruck className="h-6 w-6" />,
        date: orderDetails ? formatDate(getDateAfterDays(orderDetails.orderDate, 2)) : undefined,
        completed: ['out-for-delivery', 'delivered'].includes(status),
        current: status === 'shipped',
      },
      {
        label: 'Out for Delivery',
        description: 'Your order is out for delivery',
        icon: <FiTruck className="h-6 w-6" />,
        date: orderDetails ? formatDate(getDateAfterDays(orderDetails.orderDate, 3)) : undefined,
        completed: status === 'delivered',
        current: status === 'out-for-delivery',
      },
      {
        label: 'Delivered',
        description: 'Your order has been delivered',
        icon: <FiCheck className="h-6 w-6" />,
        date: orderDetails ? formatDate(getDateAfterDays(orderDetails.orderDate, 4)) : undefined,
        completed: status === 'delivered',
        current: false,
      },
    ];
    
    return steps;
  };
  
  // Helper to simulate different dates based on order status
  const getDateAfterDays = (dateString: string, days: number): string => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString();
  };
  
  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate order total
  const calculateOrderTotal = (items: OrderDetails['items']): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-gray-600 mb-4">
            Enter your order ID or tracking number below to track the status of your order.
          </p>
          
          <form onSubmit={handleTrackOrder} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Order ID or Tracking Number (try: 12345 or 54321)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label="Order ID or Tracking Number"
              />
              {trackingError && (
                <p className="text-red-500 mt-2 text-sm">{trackingError}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center min-w-[120px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <FiSearch className="mr-2" />
                  Track
                </>
              )}
            </button>
          </form>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>For demonstration, use order IDs: 12345, 54321, ORD-2023-1001, or ORD-2023-1002</p>
          </div>
        </div>
        
        {orderDetails && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">Order #{orderDetails.orderId}</h2>
                  <p className="text-gray-600">
                    Placed on {formatDate(orderDetails.orderDate)}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button className="inline-flex items-center text-gray-600 hover:text-primary">
                    <FiPrinter className="mr-1" />
                    <span className="text-sm">Print</span>
                  </button>
                  <button className="inline-flex items-center text-gray-600 hover:text-primary">
                    <FiMail className="mr-1" />
                    <span className="text-sm">Contact Support</span>
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-500 mb-1">Tracking Number:</div>
                <div className="text-gray-800 font-medium">{orderDetails.trackingNumber} ({orderDetails.carrier})</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery:</div>
                <div className="text-gray-800 font-medium">{formatDate(orderDetails.estimatedDelivery)}</div>
              </div>
              
              {/* Timeline */}
              <div className="mb-10 relative">
                <div className="hidden md:block absolute left-0 top-0 h-full w-0.5 bg-gray-200 ml-6"></div>
                
                <div className="space-y-8 relative">
                  {getOrderSteps(orderDetails.status).map((step, index) => (
                    <div key={index} className="flex flex-col md:flex-row">
                      <div className="md:w-1/6 mb-4 md:mb-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-100 text-green-600' : step.current ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.icon}
                        </div>
                      </div>
                      <div className="md:w-5/6">
                        <h3 className={`font-medium ${
                          step.completed ? 'text-green-600' : step.current ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                        {step.date && (
                          <p className="text-sm text-gray-500 mt-1">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold mb-4">Shipping Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h4>
                  <p className="text-gray-800">
                    {orderDetails.shippingAddress.name}<br />
                    {orderDetails.shippingAddress.street}<br />
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}<br />
                    {orderDetails.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping Method</h4>
                  <p className="text-gray-800">
                    {orderDetails.carrier} Standard Shipping<br />
                    Tracking Number: {orderDetails.trackingNumber}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              
              {/* Order Items */}
              <div className="mb-6">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-start py-4 border-b last:border-b-0">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                        <div className="flex">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Totals */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-medium">${calculateOrderTotal(orderDetails.items).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Shipping</p>
                  <p className="font-medium">${(9.99).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Tax</p>
                  <p className="font-medium">${(calculateOrderTotal(orderDetails.items) * 0.07).toFixed(2)}</p>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-bold">
                      ${(calculateOrderTotal(orderDetails.items) + 9.99 + (calculateOrderTotal(orderDetails.items) * 0.07)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!orderDetails && !isLoading && !trackingError && (
          <div className="text-center py-10">
            <FiAlertCircle className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tracking information</h3>
            <p className="mt-1 text-gray-500">Enter your order ID or tracking number to view status</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage; 