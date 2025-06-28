
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface ProductData {
  productName: string;
  quantity: number;
  pricePerItem: number;
  totalPrice: number;
}

const Shipping = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Form fields
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const storedProductData = localStorage.getItem('productData');
    if (storedProductData) {
      setProductData(JSON.parse(storedProductData));
    } else {
      toast({
        title: "No Product Selected! 🛒",
        description: "Please select a product first.",
        variant: "destructive",
      });
      navigate('/shopping');
    }
  }, [navigate, toast]);

  const validateForm = () => {
    const requiredFields = [customerName, email, phone, address, city, state, zipCode];
    return requiredFields.every(field => field.trim() !== "");
  };

  const handleCOD = async () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information! 📝",
        description: "Please fill in all shipping details.",
        variant: "destructive",
      });
      return;
    }

    // Since Supabase isn't connected yet, we'll simulate the save operation
    console.log("Order data that would be saved to Supabase:", {
      ...productData,
      customerName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      paymentId: null,
    });

    setShowConfirmation(true);
    
    setTimeout(() => {
      setShowConfirmation(false);
      localStorage.removeItem('productData');
      navigate('/');
    }, 5000);
  };

  const handleOnlinePayment = () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information! 📝",
        description: "Please fill in all shipping details.",
        variant: "destructive",
      });
      return;
    }

    // Simulate payment gateway redirect
    toast({
      title: "Redirecting to Payment Gateway! 💳",
      description: "This would redirect to a real payment processor.",
    });
    
    // In a real app, this would redirect to Stripe, PayPal, etc.
    console.log("Would redirect to payment gateway with order data:", {
      ...productData,
      customerName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
    });
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      {/* Confirmation Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="funky-card max-w-md mx-4 text-center bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Order Confirmed!
            </h3>
            <p className="text-purple-600 mb-4">
              Your order has been placed successfully with Cash on Delivery!
            </p>
            <p className="text-purple-500">
              Redirecting to home page in a few seconds...
            </p>
          </div>
        </div>
      )}
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            🚚 Shipping Details
          </h1>
          
          {/* Order Summary */}
          <div className="funky-card mb-8">
            <h2 className="section-title mb-4">📦 Order Summary</h2>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 border-2 border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-purple-700">Product:</span>
                <span className="text-purple-800">{productData.productName}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-purple-700">Quantity:</span>
                <span className="text-purple-800">{productData.quantity}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-purple-700">Price per item:</span>
                <span className="text-purple-800">${productData.pricePerItem.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-purple-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl text-purple-800">Total:</span>
                  <span className="font-bold text-2xl text-purple-800">${productData.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Form */}
          <div className="funky-card">
            <h2 className="section-title mb-6">📝 Shipping Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  👤 Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className="funky-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  📧 Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="funky-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  📱 Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="funky-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  🏠 Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address"
                  className="funky-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  🏙️ City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City name"
                  className="funky-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  🗺️ State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State/Province"
                  className="funky-input w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  📮 ZIP Code
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="ZIP/Postal code"
                  className="funky-input w-full max-w-xs"
                />
              </div>
            </div>
            
            {/* Payment Options */}
            <div className="mt-12 pt-8 border-t-4 border-purple-200">
              <h3 className="section-title text-center mb-8">💳 Choose Payment Method</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={handleCOD}
                  className="funky-button bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-xl glow"
                >
                  💵 Cash on Delivery
                </button>
                
                <button
                  onClick={handleOnlinePayment}
                  className="funky-button bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-xl glow"
                >
                  💳 Online Payment
                </button>
              </div>
              
              <p className="text-center text-purple-600 mt-6 text-lg">
                Choose your preferred payment method to complete your order! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shipping;
