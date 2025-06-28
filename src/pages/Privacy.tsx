
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            🔒 Privacy Policy
          </h1>
          
          <div className="funky-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-purple-600 text-xl mb-8 text-center">
                Your privacy is super important to us! Here's how we keep your data safe and funky! ✨
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">📊 Information We Collect</h2>
              <p className="text-purple-700 mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us. This may include your name, email address, phone number, 
                shipping address, and payment information.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🛡️ How We Use Your Information</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your purchases</li>
                <li>Provide customer support</li>
                <li>Send you promotional materials (with your consent)</li>
                <li>Improve our services and user experience</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🔐 Data Security</h2>
              <p className="text-purple-700 mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. Your data is encrypted and 
                stored securely using industry-standard practices.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🍪 Cookies</h2>
              <p className="text-purple-700 mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize 
                content. You can control cookie settings through your browser preferences.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">📞 Contact Us</h2>
              <p className="text-purple-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us through our 
                contact page or email us directly.
              </p>
              
              <p className="text-center text-purple-600 mt-12 text-lg font-semibold">
                Last updated: December 2024 🎨
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
