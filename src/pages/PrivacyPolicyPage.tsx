import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-blue max-w-none">
          <p>
            At StoreX, we respect your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website or make a purchase.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information that you provide directly to us, such as:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact information (name, email address, mailing address, phone number)</li>
            <li>Account information (username, password)</li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Order information (products purchased, order history)</li>
            <li>Profile information (preferences, interests)</li>
            <li>Communications (customer service inquiries, feedback)</li>
          </ul>
          <p>
            We may also automatically collect certain information when you visit our website, such as:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Usage data (pages visited, time spent on pages, referring websites)</li>
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Location information</li>
            <li>Cookies and similar technologies</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
          <p>
            We may use your information for various purposes, including to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process and fulfill your orders</li>
            <li>Create and manage your account</li>
            <li>Provide customer service</li>
            <li>Send transactional emails (order confirmations, shipping updates)</li>
            <li>Send marketing communications (if you opt in)</li>
            <li>Personalize your shopping experience</li>
            <li>Improve our website and services</li>
            <li>Detect and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. Information Sharing</h2>
          <p>
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service providers (payment processors, shipping carriers, marketing partners)</li>
            <li>Business partners (with your consent)</li>
            <li>Legal authorities (when required by law or to protect our rights)</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing
            activities and to improve your experience on our website. You can manage your cookie preferences
            through your browser settings.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized
            access, disclosure, alteration, or destruction. However, no method of transmission over the Internet
            or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, such as:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided below.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">7. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect
            personal information from children under 13. If you are a parent or guardian and believe that
            your child has provided us with personal information, please contact us.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">8. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than the country in which
            you reside. These countries may have different data protection laws. We will take appropriate
            measures to ensure that your personal information remains protected in accordance with this
            Privacy Policy.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">9. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal
            requirements. We will notify you of any material changes by posting the updated Privacy Policy on
            our website and updating the "Last updated" date.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy
            practices, please contact us at:
          </p>
          <address className="not-italic mt-2">
            StoreX Inc.<br />
            123 E-Commerce St<br />
            Marketplace, NY 10001<br />
            Email: privacy@storex.com<br />
            Phone: (555) 123-4567
          </address>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Link to="/" className="text-primary hover:text-primary-dark">
            Back to Home
          </Link>
          <Link to="/terms" className="text-primary hover:text-primary-dark">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 