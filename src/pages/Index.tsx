
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="page-title bounce-in mb-8 text-shadow">
            Welcome to FunkyCart!
          </h1>
          <p className="text-2xl text-purple-600 mb-12 font-medium max-w-3xl mx-auto">
            🎨 Where shopping meets art! Discover amazing products in the most vibrant, 
            energizing e-commerce experience you've ever seen! ✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/shopping" className="funky-button text-xl">
              🛍️ Start Shopping Now!
            </Link>
            <Link to="/contact" className="funky-button bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
              💬 Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-16 text-shadow">
            Why Choose FunkyCart? 🌟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="funky-card text-center float" style={{animationDelay: '0s'}}>
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Artistic Design</h3>
              <p className="text-purple-600">Experience shopping like never before with our vibrant, artistic interface!</p>
            </div>
            
            <div className="funky-card text-center float" style={{animationDelay: '0.2s'}}>
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Lightning Fast</h3>
              <p className="text-purple-600">Super smooth checkout process that gets you what you want, when you want it!</p>
            </div>
            
            <div className="funky-card text-center float" style={{animationDelay: '0.4s'}}>
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Secure Payments</h3>
              <p className="text-purple-600">Multiple payment options including Cash on Delivery for your convenience!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-8 text-shadow">Ready to Experience the Magic? ✨</h2>
          <p className="text-xl text-purple-600 mb-8 font-medium">
            Join thousands of happy customers who've discovered the joy of funky shopping!
          </p>
          <Link to="/shopping" className="funky-button text-2xl glow">
            🚀 Let's Go Shopping!
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
