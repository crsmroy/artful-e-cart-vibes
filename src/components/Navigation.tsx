
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b-4 border-purple-200 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🛒</span>
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FunkyCart
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-semibold transition-all duration-300 hover:text-purple-600 ${
                isActive('/') ? 'text-purple-600 text-shadow' : 'text-gray-700'
              }`}
            >
              🏠 Home
            </Link>
            <Link 
              to="/shopping" 
              className={`font-semibold transition-all duration-300 hover:text-purple-600 ${
                isActive('/shopping') ? 'text-purple-600 text-shadow' : 'text-gray-700'
              }`}
            >
              🛍️ Shop
            </Link>
            <Link 
              to="/contact" 
              className={`font-semibold transition-all duration-300 hover:text-purple-600 ${
                isActive('/contact') ? 'text-purple-600 text-shadow' : 'text-gray-700'
              }`}
            >
              📞 Contact
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-purple-600 text-2xl">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
