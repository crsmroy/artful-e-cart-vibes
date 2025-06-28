
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-pink-700 to-blue-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🛒</span>
              <span className="font-bold text-2xl">FunkyCart</span>
            </div>
            <p className="text-purple-100 mb-6 text-lg">
              The most artistic and energizing e-commerce experience on the web! 
              Shop with style, shop with funk! ✨
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-yellow-300">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-yellow-300 transition-colors">
                🏠 Home
              </Link>
              <Link to="/shopping" className="block hover:text-yellow-300 transition-colors">
                🛍️ Shopping
              </Link>
              <Link to="/contact" className="block hover:text-yellow-300 transition-colors">
                📞 Contact Us
              </Link>
            </div>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-yellow-300">Legal</h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block hover:text-yellow-300 transition-colors">
                🔒 Privacy Policy
              </Link>
              <Link to="/terms" className="block hover:text-yellow-300 transition-colors">
                📋 Terms & Conditions
              </Link>
              <Link to="/refund" className="block hover:text-yellow-300 transition-colors">
                💰 Refund Policy
              </Link>
              <Link to="/terms-of-service" className="block hover:text-yellow-300 transition-colors">
                📜 Terms of Service
              </Link>
              <Link to="/shipping-policy" className="block hover:text-yellow-300 transition-colors">
                🚚 Shipping Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-purple-600 mt-12 pt-8 text-center">
          <p className="text-purple-200 text-lg">
            © 2024 FunkyCart. Made with 💜 and lots of creativity!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
