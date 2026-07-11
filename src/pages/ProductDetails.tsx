import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, Clock, Minus, Plus } from '../components/Icons';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export default function ProductDetails() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('500g');
  const [selectedFlavor, setSelectedFlavor] = useState('Black Forest');
  const [message, setMessage] = useState('');

  // Mock product data for now
  const product: Product = {
    _id: '1',
    name: 'Classic Black Forest Cake',
    slug: 'classic-black-forest',
    category: 'Birthday',
    description: 'A timeless classic! Layers of moist chocolate sponge, whipped fresh cream, and cherries.',
    images: [],
    price: 450,
    weightOptions: ['500g', '1kg', '1.5kg', '2kg'],
    flavourOptions: ['Black Forest', 'Chocolate Truffle', 'Dark Chocolate'],
    shapeOptions: ['Round'],
    egglessAvailable: true,
    preparationTime: '2 hours',
    stock: 10,
    isAvailable: true,
    rating: 4.0,
    reviewsCount: 124,
    isFeatured: true,
    hasOffer: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      weight: selectedWeight,
      flavour: selectedFlavor,
      shape: 'Round',
      isEggless: true,
      message: message.trim() || undefined
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden border">
             <div className="w-full h-full flex items-center justify-center text-gray-400">Main Image</div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="aspect-square bg-gray-50 rounded-xl border cursor-pointer hover:border-primary-500 transition-colors">
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Thumb {n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-primary-600 uppercase tracking-wider">Birthday</span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1 bg-white border px-2 py-0.5 rounded shadow-sm">
                <div className="w-3 h-3 border border-green-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-gray-700">Eggless</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current text-gray-300" />
                <span className="text-gray-900 font-medium ml-1">4.0</span>
              </div>
              <a href="#reviews" className="text-primary-600 hover:underline">124 Reviews</a>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">₹450 <span className="text-base font-normal text-gray-500 line-through ml-2">₹550</span></div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-6 pt-6 border-t">
            {/* Weight Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Weight</h3>
              <div className="flex flex-wrap gap-3">
                {product.weightOptions.map(weight => (
                  <button 
                    key={weight} 
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedWeight === weight ? 'border-primary-500 text-primary-700 bg-primary-50' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Flavor</h3>
              <div className="flex flex-wrap gap-3">
                {product.flavourOptions.map(flavor => (
                  <button 
                    key={flavor} 
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedFlavor === flavor ? 'border-primary-500 text-primary-700 bg-primary-50' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            {/* Cake Message */}
            <div>
               <h3 className="text-sm font-medium text-gray-900 mb-3">Message on Cake (Optional)</h3>
               <input 
                 type="text" 
                 placeholder="e.g. Happy Birthday John" 
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                 maxLength={30} 
               />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border rounded-full h-12">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full text-gray-500 hover:text-gray-900"><Minus className="w-4 h-4" /></button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full text-gray-500 hover:text-gray-900"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white h-12 rounded-full font-medium transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t">
             <div className="flex items-center gap-3 text-sm text-gray-600">
               <Truck className="w-5 h-5 text-gray-400 shrink-0" />
               <span>Store Pickup Available</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-600">
               <Clock className="w-5 h-5 text-gray-400 shrink-0" />
               <span>Ready in 2 Hours</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-600 col-span-2">
               <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0" />
               <span>100% Fresh & Vegetarian Options</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
