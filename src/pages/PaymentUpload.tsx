
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OrderData {
  orderId: string;
  totalAmount: number;
  customerName: string;
}

const PaymentUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    } else {
      toast({
        title: "No Order Found! 🛒",
        description: "Please complete your order first.",
        variant: "destructive",
      });
      navigate('/shopping');
    }
  }, [navigate, toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type! 📷",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large! 📏",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !orderData) {
      toast({
        title: "No File Selected! 📁",
        description: "Please select a payment screenshot to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${orderData.orderId}_${Date.now()}.${fileExt}`;
      const filePath = `payment-screenshots/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(filePath);

      // Update order with screenshot URL and mark as success
      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          payment_screenshot_url: publicData.publicUrl,
          payment_status: 'Success'
        })
        .eq('id', orderData.orderId);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Payment Screenshot Uploaded! 🎉",
        description: "Your payment has been confirmed successfully.",
      });

      // Clean up and redirect
      localStorage.removeItem('orderData');
      localStorage.removeItem('productData');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed! ❌",
        description: "Failed to upload payment screenshot. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            💳 Upload Payment Screenshot
          </h1>
          
          {/* Order Info */}
          <div className="funky-card mb-8">
            <h2 className="section-title mb-4">📋 Order Details</h2>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 border-2 border-green-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-purple-700">Order ID:</span>
                <span className="text-purple-800 font-mono text-sm">{orderData.orderId}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-purple-700">Customer:</span>
                <span className="text-purple-800">{orderData.customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-purple-700">Amount to Pay:</span>
                <span className="text-purple-800 font-bold text-xl">${orderData.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="funky-card">
            <h2 className="section-title mb-6">📸 Upload Payment Proof</h2>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-purple-600 mb-4">
                  Please upload a screenshot or photo of your payment confirmation
                </p>
                
                <div className="border-4 border-dashed border-purple-300 rounded-2xl p-8 bg-purple-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="payment-screenshot"
                  />
                  <label
                    htmlFor="payment-screenshot"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <div className="text-6xl">📷</div>
                    <div className="text-lg font-semibold text-purple-700">
                      Click to select payment screenshot
                    </div>
                    <div className="text-sm text-purple-500">
                      Supported: JPG, PNG, GIF (Max 5MB)
                    </div>
                  </label>
                </div>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Preview:</h3>
                  <img
                    src={previewUrl}
                    alt="Payment screenshot preview"
                    className="max-w-full max-h-64 mx-auto rounded-2xl border-4 border-purple-200 shadow-lg"
                  />
                  <p className="text-purple-600 mt-4">File: {selectedFile?.name}</p>
                </div>
              )}

              {/* Upload Button */}
              <div className="text-center pt-6">
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="funky-button bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-xl glow disabled:opacity-50"
                >
                  {isUploading ? "Uploading... 📤" : "Upload & Confirm Payment 🚀"}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-purple-500">
                  Your payment will be verified within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentUpload;
