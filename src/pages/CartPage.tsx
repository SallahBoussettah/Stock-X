import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant: string;
  maxQuantity: number;
}

const CartPage = () => {
  // In a real app, this would come from Redux state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      productId: '101',
      name: 'Wireless Headphones',
      price: 149.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      variant: 'Black',
      maxQuantity: 10
    },
    {
      id: '2',
      productId: '102',
      name: 'Designer Watch',
      price: 299.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
      variant: 'Silver',
      maxQuantity: 15
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10.00 : 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) return;
    
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    // Mock coupon logic - in a real app this would validate with backend
    if (couponCode.toLowerCase() === 'discount20') {
      setDiscount(subtotal * 0.2); // 20% off
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  const clearCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponApplied(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <FiShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <Link to={`/products/${item.productId}`} className="hover:text-primary">
                                {item.name}
                              </Link>
                            </div>
                            {item.variant && (
                              <div className="text-sm text-gray-500">Variant: {item.variant}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={item.maxQuantity}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="mx-2 w-12 text-center border border-gray-300 rounded-md"
                          />
                          <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link to="/products" className="text-primary flex items-center">
                <FiArrowLeft className="mr-2" /> Continue Shopping
              </Link>
              <button
                className="btn btn-outline"
                onClick={() => setCartItems([])}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mt-6">
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Code
                </label>
                {couponApplied ? (
                  <div className="flex items-center">
                    <span className="flex-grow bg-green-50 text-green-800 py-2 px-4 rounded border border-green-200">
                      {couponCode} applied
                    </span>
                    <button
                      onClick={clearCoupon}
                      className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      className="flex-grow rounded-l-md border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-gray-100 text-gray-700 px-4 rounded-r-md border border-gray-300 hover:bg-gray-200"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="mt-6 w-full btn btn-primary"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 