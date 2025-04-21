
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

// This is a placeholder empty cart for now
const CartPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-heading font-bold mb-8 techno-header">
          Your Cart
        </h1>
        
        <div className="tech-container p-8 text-center">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">
              It looks like you haven't added any products to your cart yet.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button className="btn-tech w-full sm:w-auto">
                Browse Products
              </Button>
            </Link>
            <a 
              href="https://wa.me/11234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 btn-tech bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            >
              <MessageSquare className="h-5 w-5" />
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
