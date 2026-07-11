import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingCart, ChevronRight } from '../components/Icons';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any delicious cakes to your cart yet.</p>
        <Link to="/shop" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2">
          Start Shopping <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex gap-6 py-6 border-b">
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-xs text-gray-400">
                {item.product.name.substring(0, 10)}...
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                    <div className="font-bold text-gray-900">₹{(item.product.discountPrice || item.product.price) * item.quantity}</div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.selectedWeight} • {item.selectedFlavour} {item.isEggless && '• Eggless'}
                  </p>
                  {item.specialInstructions && (
                    <p className="text-xs text-gray-400 bg-gray-50 p-2 rounded italic">
                      Msg: {item.specialInstructions}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border rounded-full h-9">
                    <button 
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="px-3 h-full text-gray-500 hover:text-gray-900"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="px-3 h-full text-gray-500 hover:text-gray-900"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5%)</span>
                <span className="font-medium text-gray-900">₹{Math.round(totalPrice * 0.05)}</span>
              </div>
              <div className="pt-4 border-t flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-full font-medium transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
