import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-blue max-w-none">
          <p>
            Please read these terms and conditions carefully before using our website and services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
          <p>
            Welcome to StoreX ("we," "our," or "us"). These Terms and Conditions govern your use of our website
            located at www.storex.com (the "Site") and all related services, features, content, and applications
            offered by us (collectively, the "Services").
          </p>
          <p>
            By accessing or using our Services, you ("you" or "user") agree to be bound by these Terms and our
            Privacy Policy. If you do not agree to these Terms, please do not use our Services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. Account Registration</h2>
          <p>
            To access certain features of our Services, you may be required to register for an account. When you
            register, you agree to provide accurate, current, and complete information about yourself and to
            update such information as necessary.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. Purchases and Payment</h2>
          <p>
            All product descriptions, prices, and availability are subject to change at any time without notice.
            We reserve the right to limit quantities of products purchased.
          </p>
          <p>
            Payment for all purchases must be made at the time of order. We accept various payment methods as
            indicated on the Site. You represent and warrant that you have the legal right to use any payment
            method you provide.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Shipping and Delivery</h2>
          <p>
            We will make reasonable efforts to ship products within the estimated timeframes indicated on our Site.
            However, we do not guarantee delivery times, which may vary due to factors beyond our control.
          </p>
          <p>
            Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
            You are responsible for filing any claims with carriers for damaged or lost shipments.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Returns and Refunds</h2>
          <p>
            Our return and refund policy is available on our Site. Please review this policy before making a purchase.
            We reserve the right to modify our return and refund policy at any time.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. User Content</h2>
          <p>
            You retain ownership of any content you submit to our Services, including reviews, comments, and feedback
            ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license
            to use, reproduce, modify, adapt, publish, translate, and display such content in connection with our Services.
          </p>
          <p>
            You agree not to submit User Content that is unlawful, defamatory, obscene, invasive of privacy, infringing
            of intellectual property rights, or otherwise objectionable.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">7. Intellectual Property</h2>
          <p>
            All content, features, and functionality on our Site, including but not limited to text, graphics, logos,
            icons, images, audio clips, and software, are owned by us, our licensors, or other providers and are protected
            by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform,
            republish, download, store, or transmit any material on our Site, except as permitted by these Terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
            we are headquartered, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make material changes to these Terms,
            we will notify you by email or by posting a notice on our Site. Your continued use of our Services
            after such changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <address className="not-italic mt-2">
            StoreX Inc.<br />
            123 E-Commerce St<br />
            Marketplace, NY 10001<br />
            Email: support@storex.com<br />
            Phone: (555) 123-4567
          </address>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Link to="/" className="text-primary hover:text-primary-dark">
            Back to Home
          </Link>
          <Link to="/privacy-policy" className="text-primary hover:text-primary-dark">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 