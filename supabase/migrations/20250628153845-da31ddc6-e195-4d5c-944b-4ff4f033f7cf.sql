
-- Create the orders table with all required columns
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price_per_item FLOAT NOT NULL,
  total_price FLOAT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('COD', 'Online')),
  payment_status TEXT NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Success', 'Failed')),
  payment_id TEXT,
  payment_screenshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-screenshots', 'payment-screenshots', true);

-- Create storage policy to allow public access to payment screenshots
CREATE POLICY "Allow public access to payment screenshots" ON storage.objects
FOR SELECT USING (bucket_id = 'payment-screenshots');

CREATE POLICY "Allow authenticated users to upload payment screenshots" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'payment-screenshots');

CREATE POLICY "Allow authenticated users to update payment screenshots" ON storage.objects
FOR UPDATE USING (bucket_id = 'payment-screenshots');

CREATE POLICY "Allow authenticated users to delete payment screenshots" ON storage.objects
FOR DELETE USING (bucket_id = 'payment-screenshots');

-- Insert some test data
INSERT INTO public.orders (
  product_name, quantity, price_per_item, total_price, customer_name, 
  email, phone, address, city, state, zip_code, payment_method, payment_status
) VALUES 
(
  'Funky T-Shirt', 2, 25.99, 51.98, 'John Doe', 
  'john@example.com', '+1234567890', '123 Main St', 'New York', 'NY', '10001', 
  'COD', 'Pending'
),
(
  'Cool Sneakers', 1, 89.99, 89.99, 'Jane Smith', 
  'jane@example.com', '+1987654321', '456 Oak Ave', 'Los Angeles', 'CA', '90210', 
  'Online', 'Success'
),
(
  'Artistic Hoodie', 3, 45.50, 136.50, 'Bob Johnson', 
  'bob@example.com', '+1122334455', '789 Pine Rd', 'Chicago', 'IL', '60601', 
  'Online', 'Pending'
);
