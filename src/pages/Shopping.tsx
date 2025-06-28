
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Shopping = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pricePerItem, setPricePerItem] = useState(0);
  const { toast } = useToast();
  
  const totalPrice = quantity * pricePerItem;
  
  const handleProceedToShipping = () => {
    if (!productName || pricePerItem <= 0 || quantity <= 0) {
      toast({
        title: "Oops! Missing Details 🙈",
        description: "Please fill in all product details before proceeding!",
        variant: "destructive",
      });
      return;
    }
    
    // Store product details in localStorage for the shipping page
    const productData = {
      productName,
      quantity,
      pricePerItem,
      totalPrice
    };
    localStorage.setItem('productData', JSON.stringify(productData));
    
    toast({
      title: "Product Added! ✨",
      description: "Proceeding to shipping details...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-16 bounce-in text-shadow">
            🛍️ Shopping Paradise!
          </h1>
          
          <div className="funky-card max-w-2xl mx-auto">
            <h2 className="section-title text-center mb-8">
              Create Your Perfect Order ✨
            </h2>
            
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  🎯 Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="What amazing product would you like?"
                  className="funky-input w-full text-lg"
                />
              </div>
              
              {/* Quantity */}
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  📦 Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="funky-input w-full text-lg"
                />
              </div>
              
              {/* Price Per Item */}
              <div>
                <label className="block text-lg font-semibold text-purple-700 mb-2">
                  💰 Price Per Item ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={pricePerItem}
                  onChange={(e) => setPricePerItem(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="funky-input w-full text-lg"
                />
              </div>
              
              {/* Total Price Display */}
              <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl p-6 border-4 border-yellow-300">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-800">
                    🎉 Total Amount:
                  </span>
                  <span className="text-3xl font-bold text-orange-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-orange-700 mt-2">
                  {quantity} × ${pricePerItem.toFixed(2)} = ${totalPrice.toFixed(2)}
                </p>
              </div>
              
              {/* Proceed Button */}
              <div className="text-center pt-6">
                <Link
                  to="/shipping"
                  onClick={handleProceedToShipping}
                  className="funky-button text-xl glow"
                >
                  🚀 Proceed to Shipping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Fun Product Suggestions */}
          <div className="mt-16">
            <h3 className="section-title text-center mb-8">
              🌟 Popular Picks
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Funky Art Prints", price: 29.99, emoji: "🎨" },
                { name: "Rainbow Phone Case", price: 15.99, emoji: "📱" },
                { name: "Cosmic Coffee Mug", price: 12.99, emoji: "☕" }
              ].map((item, index) => (
                <div key={index} className="funky-card text-center cursor-pointer hover:scale-110"
                     onClick={() => {
                       setProductName(item.name);
                       setPricePerItem(item.price);
                       setQuantity(1);
                     }}>
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h4 className="font-bold text-purple-700 mb-2">{item.name}</h4>
                  <p className="text-2xl font-bold text-pink-600">${item.price}</p>
                  <p className="text-purple-500 mt-2">Click to select!</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shopping;
