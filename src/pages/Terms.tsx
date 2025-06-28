
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            📋 Terms & Conditions
          </h1>
          
          <div className="funky-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-purple-600 text-xl mb-8 text-center">
                Welcome to our funky terms! These keep everything fair and fun for everyone! 🎉
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🎯 Acceptance of Terms</h2>
              <p className="text-purple-700 mb-4">
                By accessing and using FunkyCart, you accept and agree to be bound by the terms 
                and provision of this agreement. These terms apply to all users of the site.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🛍️ Use of Service</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>You must be at least 13 years old to use this service</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree to provide accurate and complete information</li>
                <li>You will not use the service for any unlawful purposes</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">💳 Orders and Payments</h2>
              <p className="text-purple-700 mb-4">
                All orders are subject to acceptance and availability. Prices are subject to change 
                without notice. We accept various payment methods and all transactions are secure.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">📦 Product Availability</h2>
              <p className="text-purple-700 mb-4">
                We strive to ensure all products listed are available, but cannot guarantee 
                availability. In case of unavailability, we will notify you and offer alternatives 
                or a full refund.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">⚖️ Limitation of Liability</h2>
              <p className="text-purple-700 mb-4">
                FunkyCart shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of the service.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🔄 Changes to Terms</h2>
              <p className="text-purple-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be posted on 
                this page and your continued use constitutes acceptance of modified terms.
              </p>
              
              <p className="text-center text-purple-600 mt-12 text-lg font-semibold">
                Last updated: December 2024 ✨
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
