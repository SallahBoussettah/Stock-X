import React, { useState, FormEvent } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiMessageSquare, 
  FiSend,
  FiCheckCircle
} from 'react-icons/fi';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderNumber?: string;
}

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  image: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'locations'>('contact');

  // Store locations data
  const storeLocations: StoreLocation[] = [
    {
      id: '1',
      name: 'Downtown Store',
      address: '123 Fashion Street',
      city: 'New York, NY 10001',
      phone: '+1 (212) 555-1234',
      email: 'downtown@example.com',
      hours: {
        weekdays: '10:00 AM - 8:00 PM',
        saturday: '10:00 AM - 6:00 PM',
        sunday: '11:00 AM - 5:00 PM',
      },
      image: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    },
    {
      id: '2',
      name: 'West Side Mall',
      address: '456 Shopping Avenue',
      city: 'Los Angeles, CA 90024',
      phone: '+1 (310) 555-5678',
      email: 'westside@example.com',
      hours: {
        weekdays: '10:00 AM - 9:00 PM',
        saturday: '10:00 AM - 8:00 PM',
        sunday: '11:00 AM - 6:00 PM',
      },
      image: 'https://images.unsplash.com/photo-1604963641568-608861aedc0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    },
    {
      id: '3',
      name: 'East Side Outlet',
      address: '789 Discount Drive',
      city: 'Chicago, IL 60611',
      phone: '+1 (312) 555-9012',
      email: 'eastside@example.com',
      hours: {
        weekdays: '9:00 AM - 9:00 PM',
        saturday: '9:00 AM - 7:00 PM',
        sunday: '10:00 AM - 6:00 PM',
      },
      image: 'https://images.unsplash.com/photo-1605083964581-2a8956a6eb9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          orderNumber: '',
        });
        
        // Reset submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`px-6 py-3 font-medium text-sm focus:outline-none ${
            activeTab === 'contact'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Support
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm focus:outline-none ${
            activeTab === 'locations'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('locations')}
        >
          Store Locations
        </button>
      </div>
      
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <FiCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-4">
                  Your message has been sent successfully. Our team will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Order Number (optional)
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="If your inquiry is about an order"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiMail className="h-5 w-5 text-primary mt-1" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Email Us</p>
                    <p className="text-sm text-gray-600">support@example.com</p>
                    <p className="text-sm text-gray-600">sales@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiPhone className="h-5 w-5 text-primary mt-1" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
                    <p className="text-sm text-gray-600">Mon-Fri: 9am-6pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiMessageSquare className="h-5 w-5 text-primary mt-1" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                    <button className="mt-1 text-sm text-primary hover:underline">
                      Start a chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Response Time</h3>
              <p className="text-sm text-gray-600 mb-4">
                We strive to respond to all inquiries within 24 hours during business days.
                For urgent matters, please call our customer service line.
              </p>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Business Hours</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'locations' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeLocations.map(location => (
              <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={location.image} 
                    alt={location.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FiMapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-gray-600">{location.address}</p>
                        <p className="text-gray-600">{location.city}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiPhone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-gray-600">{location.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiMail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-gray-600">{location.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiClock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-sm text-gray-700 font-medium">Hours:</p>
                        <p className="text-sm text-gray-600">Mon-Fri: {location.hours.weekdays}</p>
                        <p className="text-sm text-gray-600">Sat: {location.hours.saturday}</p>
                        <p className="text-sm text-gray-600">Sun: {location.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${location.address}, ${location.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2 px-4 bg-primary text-white text-center rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer in-store pickup?</h3>
                <p className="text-gray-600">
                  Yes, we offer free in-store pickup at all of our retail locations. Simply select "In-Store Pickup" 
                  at checkout and choose your preferred location.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Can I return online purchases to a physical store?</h3>
                <p className="text-gray-600">
                  Absolutely! You can return items purchased online to any of our physical store locations
                  within 30 days of purchase with a receipt or order confirmation.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer price matching?</h3>
                <p className="text-gray-600">
                  We offer price matching for identical items sold by major retailers. Bring proof of the 
                  competitor's current price when visiting our stores or contact customer service for online purchases.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Are all products available in all stores?</h3>
                <p className="text-gray-600">
                  Product availability varies by location. To check if a specific item is in stock at your
                  local store, please call ahead or use the "Check In-Store Availability" feature on our website.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage; 