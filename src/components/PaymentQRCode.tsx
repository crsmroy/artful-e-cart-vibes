
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface PaymentQRCodeProps {
  amount: number;
  merchantName?: string;
  merchantUPI?: string;
  orderId: string;
}

const PaymentQRCode = ({ 
  amount, 
  merchantName = "Funky Store", 
  merchantUPI = "merchant@paytm",
  orderId 
}: PaymentQRCodeProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setIsGenerating(true);
        
        // Create UPI payment string with amount
        const upiString = `upi://pay?pa=${merchantUPI}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Payment for Order ${orderId}`)}`;
        
        // Generate QR code
        const qrDataUrl = await QRCode.toDataURL(upiString, {
          width: 256,
          margin: 2,
          color: {
            dark: '#7C3AED',
            light: '#FFFFFF'
          }
        });
        
        setQrCodeUrl(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateQR();
  }, [amount, merchantName, merchantUPI, orderId]);

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold text-purple-700 mb-4">📱 Scan to Pay</h3>
      
      <div className="bg-white rounded-2xl p-6 border-4 border-purple-200 shadow-lg inline-block">
        {isGenerating ? (
          <div className="w-64 h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <img 
              src={qrCodeUrl} 
              alt="Payment QR Code" 
              className="mx-auto rounded-lg"
            />
            <div className="text-center">
              <p className="text-lg font-bold text-purple-800">₹{amount.toFixed(2)}</p>
              <p className="text-sm text-purple-600">Scan with any UPI app</p>
              <p className="text-xs text-purple-500 mt-2">
                Google Pay • PhonePe • Paytm • BHIM
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-purple-600">
        <p className="font-medium">Payment Instructions:</p>
        <p>1. Scan the QR code with your UPI app</p>
        <p>2. Verify the amount: ₹{amount.toFixed(2)}</p>
        <p>3. Complete the payment</p>
        <p>4. Take a screenshot and upload below</p>
      </div>
    </div>
  );
};

export default PaymentQRCode;
