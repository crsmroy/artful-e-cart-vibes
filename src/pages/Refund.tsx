
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Refund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            💰 Refund Policy
          </h1>
          
          <div className="funky-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-purple-600 text-xl mb-8 text-center">
                We want you to be absolutely happy with your purchase! Here's our funky refund policy! 🎨
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">⏰ Refund Period</h2>
              <p className="text-purple-700 mb-4">
                You have 30 days from the date of purchase to request a refund. The item must be in 
                its original condition and packaging.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">✅ Eligible Items</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Items in original condition</li>
                <li>Items with original packaging and tags</li>
                <li>Items that haven't been used or damaged</li>
                <li>Items purchased within the last 30 days</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">❌ Non-Refundable Items</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Personalized or customized products</li>
                <li>Perishable goods</li>
                <li>Digital downloads</li>
                <li>Items damaged by misuse</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🔄 Refund Process</h2>
              <ol className="list-decimal list-inside text-purple-700 space-y-2 mb-4">
                <li>Contact our customer service team</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive return authorization and instructions</li>
                <li>Ship the item back to us</li>
                <li>Receive your refund within 5-10 business days</li>
              </ol>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🚚 Return Shipping</h2>
              <p className="text-purple-700 mb-4">
                Return shipping costs are the responsibility of the customer unless the item was 
                defective or we made an error with your order.
              </p>
              
              <p className="text-center text-purple-600 mt-12 text-lg font-semibold">
                Questions? Contact us anytime! We're here to help! 💜
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Refund;
