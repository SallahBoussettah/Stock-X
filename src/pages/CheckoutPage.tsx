import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiCheck, FiShield, FiCreditCard, FiTruck } from 'react-icons/fi';

const CheckoutPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // In a real app, this would come from Redux store
  const cartItems = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 149.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      variant: 'Black',
    },
    {
      id: '2',
      name: 'Designer Watch',
      price: 299.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
      variant: 'Silver',
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethod === 'express' ? 15.00 : 10.00;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as 1 | 2 | 3);
      window.scrollTo(0, 0);
    } else {
      // Submit order
      console.log('Order placed!');
      // In a real app, this would dispatch a Redux action
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* Checkout Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > 1 ? <FiCheck className="w-5 h-5" /> : 1}
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > 2 ? <FiCheck className="w-5 h-5" /> : 2}
              </div>
              <span className="text-sm">Payment</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className="text-sm">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 pb-2 border-b">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-input w-full"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-input w-full"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-input w-full"
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="form-input w-full mb-2"
                        placeholder="123 Main St."
                        required
                      />
                      <input
                        type="text"
                        id="addressLine2"
                        className="form-input w-full"
                        placeholder="Apt 4B"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          className="form-input w-full"
                          placeholder="New York"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State*
                        </label>
                        <input
                          type="text"
                          id="state"
                          className="form-input w-full"
                          placeholder="NY"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          className="form-input w-full"
                          placeholder="10001"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="form-input w-full"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>

                    <h3 className="text-lg font-semibold mb-4 mt-8">Shipping Method</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id="standard"
                          name="shippingMethod"
                          value="standard"
                          className="mt-1 h-4 w-4 text-primary"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                        />
                        <div className="ml-3">
                          <label htmlFor="standard" className="font-medium text-gray-900">
                            Standard Shipping
                          </label>
                          <p className="text-gray-500 text-sm">
                            Delivery in 3-5 business days
                          </p>
                          <p className="text-gray-900 font-medium">$10.00</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id="express"
                          name="shippingMethod"
                          value="express"
                          className="mt-1 h-4 w-4 text-primary"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                        />
                        <div className="ml-3">
                          <label htmlFor="express" className="font-medium text-gray-900">
                            Express Shipping
                          </label>
                          <p className="text-gray-500 text-sm">
                            Delivery in 1-2 business days
                          </p>
                          <p className="text-gray-900 font-medium">$15.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 pb-2 border-b">Payment Information</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="creditCard"
                            name="paymentMethod"
                            className="h-4 w-4 text-primary focus:ring-primary"
                            defaultChecked
                          />
                          <label htmlFor="creditCard" className="ml-2 text-sm text-gray-700 flex items-center">
                            <FiCreditCard className="mr-2" /> Credit / Debit Card
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            className="h-4 w-4 text-primary focus:ring-primary"
                          />
                          <label htmlFor="paypal" className="ml-2 text-sm text-gray-700">
                            PayPal
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          className="form-input w-full"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          className="form-input w-full"
                          placeholder="•••• •••• •••• ••••"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            className="form-input w-full"
                            placeholder="MM / YY"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            className="form-input w-full"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-gray-50 p-4 rounded-md flex items-start">
                      <FiShield className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-sm text-gray-600">
                        Your payment information is encrypted and secure. We never store your full card details.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Order Confirmation */}
                {step === 3 && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <FiCheck className="text-green-600 w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
                      <p className="text-gray-600">
                        Your order has been placed and is being processed. You will receive an email
                        confirmation shortly.
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4 mb-6">
                      <h3 className="font-semibold mb-2">Order #23456789</h3>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Order Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Estimated Delivery:</span>
                        <span>
                          {new Date(Date.now() + (shippingMethod === 'express' ? 2 : 5) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6 mt-6">
                      <h3 className="font-semibold mb-4 flex items-center">
                        <FiTruck className="mr-2" /> Shipping Information
                      </h3>
                      <p className="text-gray-700">
                        John Doe<br />
                        123 Main St, Apt 4B<br />
                        New York, NY 10001<br />
                        United States<br />
                        (555) 123-4567
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="mt-8 flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                    >
                      Back
                    </button>
                  ) : (
                    <Link to="/cart" className="btn btn-outline">
                      Return to Cart
                    </Link>
                  )}
                  
                  <button type="submit" className="btn btn-primary">
                    {step < 3 ? (step === 1 ? 'Continue to Payment' : 'Place Order') : 'Continue Shopping'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="mt-1 text-sm text-gray-500">
                        {item.variant && `${item.variant} · `}Qty {item.quantity}
                      </div>
                    </div>
                    <p className="ml-4 text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-medium text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 