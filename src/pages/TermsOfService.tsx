
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            📜 Terms of Service
          </h1>
          
          <div className="funky-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-purple-600 text-xl mb-8 text-center">
                These are the rules that keep our funky community awesome and safe! 🌟
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🎪 Service Description</h2>
              <p className="text-purple-700 mb-4">
                FunkyCart provides an artistic e-commerce platform where users can browse, purchase, 
                and enjoy a unique shopping experience with vibrant design and creative flair.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">👤 User Accounts</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>You are responsible for maintaining account security</li>
                <li>One account per person</li>
                <li>Accurate information must be provided</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🚫 Prohibited Uses</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Fraudulent or deceptive practices</li>
                <li>Harassment or abuse of other users</li>
                <li>Violation of any applicable laws</li>
                <li>Interference with service operation</li>
                <li>Unauthorized access to other accounts</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🔒 Privacy and Data</h2>
              <p className="text-purple-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand 
                how we collect, use, and protect your information.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">⚡ Service Availability</h2>
              <p className="text-purple-700 mb-4">
                We strive to maintain 99.9% uptime, but cannot guarantee uninterrupted service. 
                Maintenance and updates may temporarily affect availability.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🔧 Modifications</h2>
              <p className="text-purple-700 mb-4">
                We reserve the right to modify or discontinue any part of our service with or 
                without notice. We also reserve the right to update these terms at any time.
              </p>
              
              <p className="text-center text-purple-600 mt-12 text-lg font-semibold">
                By using FunkyCart, you agree to these terms! Let's keep it funky! 🎨
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
