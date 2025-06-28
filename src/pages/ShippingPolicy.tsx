
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            🚚 Shipping Policy
          </h1>
          
          <div className="funky-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-purple-600 text-xl mb-8 text-center">
                Get your funky products delivered with style! Here's everything about our shipping! 📦✨
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🌍 Shipping Areas</h2>
              <p className="text-purple-700 mb-4">
                We currently ship to all locations within the United States. International shipping 
                is coming soon - stay tuned for updates!
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">⚡ Processing Time</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Standard orders: 1-2 business days</li>
                <li>Custom/personalized items: 3-5 business days</li>
                <li>Pre-orders: As specified on product page</li>
                <li>Holiday seasons may extend processing time</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🎯 Delivery Options</h2>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">Standard Shipping (FREE)</h3>
                <ul className="list-disc list-inside text-purple-600 space-y-1">
                  <li>5-7 business days delivery</li>
                  <li>Free on orders over $50</li>
                  <li>$5.99 on orders under $50</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">Express Shipping</h3>
                <ul className="list-disc list-inside text-purple-600 space-y-1">
                  <li>2-3 business days delivery</li>
                  <li>$12.99 shipping fee</li>
                  <li>Available for most items</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">Overnight Shipping</h3>
                <ul className="list-disc list-inside text-purple-600 space-y-1">
                  <li>Next business day delivery</li>
                  <li>$24.99 shipping fee</li>
                  <li>Order by 2 PM for next day delivery</li>
                </ul>
              </div>
              
              <h2 className="section-title text-2xl mt-8 mb-4">📱 Order Tracking</h2>
              <p className="text-purple-700 mb-4">
                Once your order ships, you'll receive a tracking number via email. You can track 
                your package in real-time and know exactly when your funky goodies will arrive!
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🏠 Delivery Instructions</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Someone must be available to receive the package</li>
                <li>We'll leave packages in safe locations if no one's home</li>
                <li>Apartment residents: provide buzzer codes if needed</li>
                <li>Special instructions can be added during checkout</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">❓ Shipping Issues</h2>
              <p className="text-purple-700 mb-4">
                Package lost or damaged? Contact us immediately! We'll work with the carrier to 
                resolve the issue and ensure you get your products in perfect condition.
              </p>
              
              <p className="text-center text-purple-600 mt-12 text-lg font-semibold">
                Questions about shipping? We're here to help make it smooth and funky! 🎨📞
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
