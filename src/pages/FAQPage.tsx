import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

interface FAQ {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: string;
}

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());
  
  // FAQ Categories
  const categories = [
    { id: 'all', name: 'All FAQs' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'products', name: 'Products & Stock' },
    { id: 'account', name: 'Account & Payment' },
    { id: 'technical', name: 'Technical Support' },
  ];
  
  // FAQ Data
  const faqs: FAQ[] = [
    // Orders & Shipping
    {
      id: '1',
      question: 'How long will it take to receive my order?',
      answer: (
        <div>
          <p>Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Express (2-3 business days)</li>
            <li>Priority (1-2 business days)</li>
            <li>Overnight (next business day, order by 2pm EST)</li>
          </ul>
          <p className="mt-2">International shipping times vary by destination and typically take 7-14 business days.</p>
        </div>
      ),
      category: 'orders'
    },
    {
      id: '2',
      question: 'How can I track my order?',
      answer: (
        <div>
          <p>You can track your order in several ways:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Log in to your account and view your order history</li>
            <li>Click the tracking link in your shipping confirmation email</li>
            <li>Visit our <a href="/order-tracking" className="text-primary hover:underline">Order Tracking page</a> and enter your order number and email</li>
            <li>Contact our customer service team for assistance</li>
          </ol>
        </div>
      ),
      category: 'orders'
    },
    {
      id: '3',
      question: 'Do you ship internationally?',
      answer: (
        <p>Yes, we ship to over 40 countries worldwide. International shipping rates and delivery times vary by location. You can view the available shipping options for your country during checkout. Please note that international orders may be subject to import duties and taxes which are the responsibility of the customer.</p>
      ),
      category: 'orders'
    },
    {
      id: '4',
      question: 'Do you offer free shipping?',
      answer: (
        <p>We offer free standard shipping on all domestic orders over $50. International orders over $100 qualify for discounted shipping rates. Promotional free shipping offers may be available during special events and holidays.</p>
      ),
      category: 'orders'
    },
    
    // Returns & Refunds
    {
      id: '5',
      question: 'What is your return policy?',
      answer: (
        <div>
          <p>We offer a 30-day return policy for most items in new, unworn condition with original tags and packaging. To initiate a return:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Log in to your account and go to order history</li>
            <li>Select the order and items you wish to return</li>
            <li>Follow the return instructions and print your return label</li>
            <li>Pack the items securely with all original packaging</li>
            <li>Drop off the package at an authorized shipping location</li>
          </ol>
          <p className="mt-2">Please note that certain items like personalized products, intimate apparel, and final sale items cannot be returned.</p>
        </div>
      ),
      category: 'returns'
    },
    {
      id: '6',
      question: 'How long does it take to process a refund?',
      answer: (
        <p>Once we receive your return, it typically takes 1-2 business days to inspect and process. After processing, refunds are issued to your original payment method. It may take an additional 3-5 business days for the refund to appear in your account, depending on your financial institution.</p>
      ),
      category: 'returns'
    },
    {
      id: '7',
      question: 'Can I exchange an item instead of returning it?',
      answer: (
        <p>Yes, you can exchange items for a different size or color if available. To request an exchange, follow the same process as returns but select "Exchange" and specify the item you'd like instead. If the exchanged item has a different price, we'll either charge or refund the difference accordingly.</p>
      ),
      category: 'returns'
    },
    {
      id: '8',
      question: 'What if I received a defective item?',
      answer: (
        <p>If you receive a defective or damaged item, please contact our customer service team within 7 days of delivery. We'll provide a prepaid return label and expedite a replacement or refund. Please provide photos of the defect to help us improve our quality control process.</p>
      ),
      category: 'returns'
    },
    
    // Products & Stock
    {
      id: '9',
      question: 'How can I check if an item is in stock?',
      answer: (
        <p>Product pages display real-time inventory status. If an item is available, you'll see "In Stock" with the available quantity. For items with size or color variations, stock is shown per variation. You can also check in-store availability by entering your location on the product page.</p>
      ),
      category: 'products'
    },
    {
      id: '10',
      question: 'Can I be notified when an out-of-stock item is available?',
      answer: (
        <p>Yes, on any out-of-stock product page, click the "Notify Me When Available" button and enter your email address. We'll send you a one-time notification when the item is back in stock. Popular items may sell out quickly, so we recommend acting promptly when you receive a restock notification.</p>
      ),
      category: 'products'
    },
    {
      id: '11',
      question: 'Are your product measurements accurate?',
      answer: (
        <div>
          <p>We strive to provide accurate measurements for all our products. For apparel, we include detailed size charts with measurements in both inches and centimeters. For other products, dimensions are listed in the product specifications section.</p>
          <p className="mt-2">If you have specific measurement questions, please contact our customer service team for assistance.</p>
        </div>
      ),
      category: 'products'
    },
    {
      id: '12',
      question: 'Do you offer gift wrapping?',
      answer: (
        <p>Yes, we offer gift wrapping services for $5 per item. During checkout, select the "Gift Wrap" option and you can choose from several wrapping styles. You can also include a personalized gift message that will be printed on a gift card. Gift-wrapped items are shipped in discreet packaging with no price information.</p>
      ),
      category: 'products'
    },
    
    // Account & Payment
    {
      id: '13',
      question: 'What payment methods do you accept?',
      answer: (
        <div>
          <p>We accept the following payment methods:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Credit/Debit Cards (Visa, Mastercard, American Express, Discover)</li>
            <li>PayPal</li>
            <li>Apple Pay (on iOS devices)</li>
            <li>Google Pay (on Android devices)</li>
            <li>Shop Pay</li>
            <li>Gift Cards</li>
          </ul>
          <p className="mt-2">All transactions are secure and encrypted.</p>
        </div>
      ),
      category: 'account'
    },
    {
      id: '14',
      question: 'Is it safe to save my payment information?',
      answer: (
        <p>Yes, we use industry-standard encryption and security protocols to protect your payment information. When you choose to save your payment method, the data is tokenized and stored securely. We do not store your full credit card details on our servers. You can delete saved payment methods at any time from your account settings.</p>
      ),
      category: 'account'
    },
    {
      id: '15',
      question: 'How do I create or reset my password?',
      answer: (
        <div>
          <p>To create an account:</p>
          <ol className="list-decimal pl-5 mt-2 mb-2 space-y-1">
            <li>Click "Account" in the top menu</li>
            <li>Select "Register"</li>
            <li>Enter your email and create a password</li>
            <li>Complete the registration form</li>
          </ol>
          <p>To reset your password:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Click "Account" in the top menu</li>
            <li>Select "Login"</li>
            <li>Click "Forgot Password"</li>
            <li>Enter your email and follow the instructions sent to your inbox</li>
          </ol>
        </div>
      ),
      category: 'account'
    },
    {
      id: '16',
      question: 'Can I place an order without creating an account?',
      answer: (
        <p>Yes, we offer guest checkout options. You can complete your purchase without creating an account by selecting "Continue as Guest" during the checkout process. However, creating an account allows you to track orders, save favorite products, access order history, and enjoy a faster checkout experience for future purchases.</p>
      ),
      category: 'account'
    },
    
    // Technical Support
    {
      id: '17',
      question: 'Why can\'t I complete my purchase?',
      answer: (
        <div>
          <p>There are several common reasons why a purchase might not complete:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Payment information is incorrect or expired</li>
            <li>Billing address doesn't match the card information</li>
            <li>An item in your cart is no longer available</li>
            <li>Your bank is declining the transaction</li>
            <li>There might be a temporary technical issue</li>
          </ul>
          <p className="mt-2">Try refreshing the page, using a different payment method, or contact your bank to ensure there are no restrictions on your card. If problems persist, contact our customer support.</p>
        </div>
      ),
      category: 'technical'
    },
    {
      id: '18',
      question: 'The website is slow or not loading properly. What can I do?',
      answer: (
        <div>
          <p>If you're experiencing technical issues with our website, try these troubleshooting steps:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Clear your browser cache and cookies</li>
            <li>Try a different web browser (Chrome, Firefox, Safari, etc.)</li>
            <li>Check your internet connection</li>
            <li>Disable browser extensions that might interfere</li>
            <li>Try accessing the site from a different device</li>
          </ol>
          <p className="mt-2">If problems persist, please contact our technical support team with details about the issue, including your device, browser, and screenshots if possible.</p>
        </div>
      ),
      category: 'technical'
    },
    {
      id: '19',
      question: 'How do I use a promo code?',
      answer: (
        <div>
          <p>To apply a promo code to your order:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Add items to your shopping cart</li>
            <li>Proceed to checkout</li>
            <li>Look for the "Promo Code" or "Discount Code" field</li>
            <li>Enter your code and click "Apply"</li>
          </ol>
          <p className="mt-2">If valid, the discount will be applied to your order total. Please note that some promo codes have restrictions such as minimum purchase requirements, exclusions, or expiration dates.</p>
        </div>
      ),
      category: 'technical'
    },
    {
      id: '20',
      question: 'Why didn\'t I receive my order confirmation email?',
      answer: (
        <div>
          <p>If you haven't received your order confirmation email:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Check your spam or junk folder</li>
            <li>Make sure you entered the correct email address during checkout</li>
            <li>Add our email domain to your safe senders list</li>
            <li>Check if your mailbox is full</li>
          </ol>
          <p className="mt-2">You can also view your order details by logging into your account. If you still can't find your confirmation, please contact our customer service team with your order number (if available).</p>
        </div>
      ),
      category: 'technical'
    }
  ];
  
  // Toggle FAQ open/closed
  const toggleFAQ = (id: string) => {
    const newOpenFAQs = new Set(openFAQs);
    if (newOpenFAQs.has(id)) {
      newOpenFAQs.delete(id);
    } else {
      newOpenFAQs.add(id);
    }
    setOpenFAQs(newOpenFAQs);
  };
  
  // Filter FAQs by search query and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => (
            <div 
              key={faq.id} 
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                {openFAQs.has(faq.id) ? (
                  <FiChevronUp className="flex-shrink-0 ml-2 text-gray-500" />
                ) : (
                  <FiChevronDown className="flex-shrink-0 ml-2 text-gray-500" />
                )}
              </button>
              
              {openFAQs.has(faq.id) && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="prose max-w-none text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FiSearch className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
            <p className="text-gray-600">
              We couldn't find any FAQs matching your search. Try different keywords or
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-primary hover:underline focus:outline-none ml-1"
              >
                view all FAQs
              </button>
            </p>
          </div>
        )}
      </div>
      
      {/* Contact Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          If you couldn't find the answer you were looking for, our customer support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/contact"
            className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors"
          >
            Contact Support
          </a>
          <a
            href="tel:+18001234567"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Call Us: (800) 123-4567
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 