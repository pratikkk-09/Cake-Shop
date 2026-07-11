import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');

  const tax = Math.round(totalPrice * 0.05);
  const total = totalPrice + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      setLoading(false);
      toast.success('Order placed successfully!');
      navigate('/'); // Or navigate to order success page
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="p-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => navigate('/shop')} className="text-primary-600 underline">Go to shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required type="text" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required type="tel" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                  <input type="email" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* Pickup Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pickup Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                  <input required type="date" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                  <input required type="time" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`block border p-4 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-primary-500 bg-primary-50' : 'hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="COD" 
                      checked={paymentMethod === 'COD'} 
                      onChange={() => setPaymentMethod('COD')}
                      className="text-primary-600 focus:ring-primary-500" 
                    />
                    <span className="font-medium">Cash on Delivery (Pay at Shop)</span>
                  </div>
                </label>
                <label className={`block border p-4 rounded-xl cursor-pointer transition-colors ${paymentMethod === 'UPI' ? 'border-primary-500 bg-primary-50' : 'hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="UPI" 
                      checked={paymentMethod === 'UPI'} 
                      onChange={() => setPaymentMethod('UPI')}
                      className="text-primary-600 focus:ring-primary-500" 
                    />
                    <span className="font-medium">UPI Payment</span>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600 flex-1 pr-4">{item.quantity}x {item.product.name}</span>
                  <span className="font-medium text-gray-900">₹{(item.product.discountPrice || item.product.price) * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm text-gray-600 mb-6 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5%)</span>
                <span className="font-medium text-gray-900">₹{tax}</span>
              </div>
              <div className="pt-4 border-t flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-70 text-white py-3 rounded-full font-medium transition-colors"
            >
              {loading ? 'Processing...' : `Place Order (₹${total})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
