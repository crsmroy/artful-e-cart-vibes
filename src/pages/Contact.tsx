
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Missing Information! 📝",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send the message via API
    console.log("Contact form submission:", { name, email, message });
    
    toast({
      title: "Message Sent! ✨",
      description: "We'll get back to you super soon!",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            📞 Get in Touch!
          </h1>
          
          <p className="text-2xl text-purple-600 text-center mb-16 font-medium">
            We'd love to hear from you! Drop us a message and let's make magic happen! ✨
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="funky-card">
              <h2 className="section-title mb-6">💌 Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-purple-700 mb-2">
                    👤 Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What should we call you?"
                    className="funky-input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-purple-700 mb-2">
                    📧 Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.awesome@email.com"
                    className="funky-input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-purple-700 mb-2">
                    💭 Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className="funky-input w-full resize-none"
                  />
                </div>
                
                <button type="submit" className="funky-button w-full text-xl glow">
                  🚀 Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="funky-card text-center float" style={{animationDelay: '0s'}}>
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">Creative Support</h3>
                <p className="text-purple-600">
                  Our creative team is here to help you with anything you need!
                </p>
              </div>
              
              <div className="funky-card text-center float" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">Lightning Fast</h3>
                <p className="text-purple-600">
                  We typically respond within 24 hours, often much faster!
                </p>
              </div>
              
              <div className="funky-card text-center float" style={{animationDelay: '0.4s'}}>
                <div className="text-4xl mb-4">💜</div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">Made with Love</h3>
                <p className="text-purple-600">
                  Every interaction is crafted with care and artistic flair!
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

export default Contact;
