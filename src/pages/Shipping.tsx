
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MathCaptcha from "@/components/MathCaptcha";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateEmail, validateIndianPhoneNumber, validateIndianState, getValidationMessage } from "@/utils/validation";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentCaptchaVerified, setIsPaymentCaptchaVerified] = useState(false);
  
  // Form fields
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Validation states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);

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
    const allFieldsFilled = requiredFields.every(field => field.trim() !== "");
    
    // Validate email
    const emailValidation = getValidationMessage('email', email);
    setEmailError(emailValidation);
    
    // Validate phone
    const phoneValidation = getValidationMessage('phone', phone);
    setPhoneError(phoneValidation);
    
    // Validate state
    const stateValidation = getValidationMessage('state', state);
    setStateError(stateValidation);
    
    return allFieldsFilled && !emailValidation && !phoneValidation && !stateValidation;
  };

  const saveOrderToDatabase = async (paymentMethod: string, paymentStatus = "Pending", paymentId: string | null = null) => {
    if (!productData) return null;

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            product_name: productData.productName,
            quantity: productData.quantity,
            price_per_item: productData.pricePerItem,
            total_price: productData.totalPrice,
            customer_name: customerName,
            email: email,
            phone: phone,
            address: address,
            city: city,
            state: state,
            zip_code: zipCode,
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            payment_id: paymentId,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to save order:', error);
      throw error;
    }
  };

  const handleCOD = async () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information! 📝",
        description: "Please fill in all shipping details correctly.",
        variant: "destructive",
      });
      return;
    }

    if (!isPaymentCaptchaVerified) {
      toast({
        title: "Security Verification Required! 🔐",
        description: "Please complete the math captcha to proceed with payment.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await saveOrderToDatabase("COD", "Pending");
      
      setShowConfirmation(true);
      
      setTimeout(() => {
        setShowConfirmation(false);
        localStorage.removeItem('productData');
        navigate('/');
      }, 5000);
      
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Your Cash on Delivery order has been confirmed.",
      });
    } catch (error) {
      toast({
        title: "Order Failed! ❌",
        description: "Failed to save your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnlinePayment = async () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information! 📝",
        description: "Please fill in all shipping details correctly.",
        variant: "destructive",
      });
      return;
    }

    if (!isPaymentCaptchaVerified) {
      toast({
        title: "Security Verification Required! 🔐",
        description: "Please complete the math captcha to proceed with payment.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save order with pending status first
      const order = await saveOrderToDatabase("Online", "Pending", `PAY_${Date.now()}`);
      
      if (order) {
        // Store order data and redirect to payment screenshot page
        localStorage.setItem('orderData', JSON.stringify({
          orderId: order.id,
          totalAmount: productData?.totalPrice,
          customerName: customerName,
        }));
        
        toast({
          title: "Redirecting to Payment! 💳",
          description: "Please upload your payment screenshot.",
        });
        
        navigate('/payment-upload');
      }
    } catch (error) {
      toast({
        title: "Payment Failed! ❌",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value) {
                      setEmailError(getValidationMessage('email', e.target.value));
                    }
                  }}
                  placeholder="your.email@example.com"
                  className={`funky-input w-full ${emailError ? 'border-red-500' : ''}`}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  📱 Phone (Indian Number)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (e.target.value) {
                      setPhoneError(getValidationMessage('phone', e.target.value));
                    }
                  }}
                  placeholder="+91 9876543210 or 9876543210"
                  className={`funky-input w-full ${phoneError ? 'border-red-500' : ''}`}
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
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
                  🗺️ State (Indian State)
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    if (e.target.value) {
                      setStateError(getValidationMessage('state', e.target.value));
                    }
                  }}
                  placeholder="e.g., Maharashtra, Delhi, Tamil Nadu"
                  className={`funky-input w-full ${stateError ? 'border-red-500' : ''}`}
                />
                {stateError && <p className="text-red-500 text-sm mt-1">{stateError}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  📮 PIN Code
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="6-digit PIN code"
                  className="funky-input w-full max-w-xs"
                />
              </div>
            </div>
            
            {/* Payment Security Captcha */}
            <div className="mt-12 pt-8 border-t-4 border-purple-200">
              <h3 className="section-title text-center mb-6">🔐 Payment Security Verification</h3>
              <div className="max-w-md mx-auto mb-8">
                <MathCaptcha 
                  onVerify={setIsPaymentCaptchaVerified} 
                  isVerified={isPaymentCaptchaVerified}
                />
              </div>
              
              <h3 className="section-title text-center mb-8">💳 Choose Payment Method</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={handleCOD}
                  disabled={isLoading || !isPaymentCaptchaVerified}
                  className={`funky-button bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-xl glow disabled:opacity-50 ${
                    !isPaymentCaptchaVerified ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? "Processing..." : "💵 Cash on Delivery"}
                </button>
                
                <button
                  onClick={handleOnlinePayment}
                  disabled={isLoading || !isPaymentCaptchaVerified}
                  className={`funky-button bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-xl glow disabled:opacity-50 ${
                    !isPaymentCaptchaVerified ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? "Processing..." : "💳 Online Payment"}
                </button>
              </div>
              
              <p className="text-center text-purple-600 mt-6 text-lg">
                Complete the security verification above to unlock payment options! 🎉
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
