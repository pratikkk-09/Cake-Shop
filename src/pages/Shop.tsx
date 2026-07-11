import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Filter, Search, Star } from '../components/Icons';
import { Link } from 'react-router';
import { Product } from '../types';
import axios from 'axios';

const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Classic Black Forest',
    slug: 'classic-black-forest',
    category: 'Birthday',
    description: 'Delicious chocolate sponge layered with fresh cream and cherries.',
    images: [],
    price: 450,
    weightOptions: ['500g', '1kg'],
    flavourOptions: ['Black Forest'],
    shapeOptions: ['Round'],
    egglessAvailable: true,
    preparationTime: '2 hours',
    stock: 10,
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 124,
    isFeatured: true,
    hasOffer: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Red Velvet Love',
    slug: 'red-velvet-love',
    category: 'Wedding',
    description: 'Rich red velvet sponge with cream cheese frosting.',
    images: [],
    price: 600,
    weightOptions: ['500g', '1kg', '2kg'],
    flavourOptions: ['Red Velvet'],
    shapeOptions: ['Heart', 'Round'],
    egglessAvailable: true,
    preparationTime: '4 hours',
    stock: 30,
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 89,
    isFeatured: true,
    hasOffer: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryQuery = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/products');
        if (response.data.success && response.data.data.length > 0) {
          // Normalize category from object if populated
          const normalized = response.data.data.map((p: any) => ({
             ...p,
             category: typeof p.category === 'object' ? p.category.name : p.category
          }));
          setProducts(normalized);
        } else {
          setProducts(mockProducts);
        }
      } catch (error) {
        console.warn("Using mock products due to API error or missing DB");
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    if (categoryQuery === 'all') return true;
    const catName = typeof p.category === 'string' ? p.category : (p.category as any).name || '';
    return catName.toLowerCase().includes(categoryQuery.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Cakes</h1>
          <p className="text-gray-500 mt-1">Browse our delicious collection</p>
        </div>
        
        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search cakes..." 
              className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
            />
          </div>
          <select className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option>Sort by: Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
            <h3 className="font-bold text-slate-800 border-b pb-3 mb-1">Categories</h3>
            <div className="space-y-1">
              {['All', 'Birthday', 'Wedding', 'Anniversary', 'Kids'].map(cat => {
                const isActive = categoryQuery === cat.toLowerCase() || categoryQuery.includes(cat.toLowerCase());
                return (
                  <button 
                    key={cat} 
                    onClick={() => setSearchParams({ category: cat.toLowerCase() })}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3, 4, 5, 6].map(n => (
                 <div key={n} className="animate-pulse">
                   <div className="bg-gray-200 aspect-square rounded-2xl mb-4"></div>
                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                   <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                 </div>
               ))}
             </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link key={product._id} to={`/product/${product.slug}`} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col group hover:border-primary-200 transition-colors">
                  <div className="h-40 sm:h-48 bg-slate-100 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center text-4xl group-hover:scale-[1.02] transition-transform duration-500">
                    🎂
                    {product.egglessAvailable && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm">
                        Eggless
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-tight group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-500 mb-3 flex-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                       {product.discountPrice ? (
                         <>
                           <span className="text-xs text-slate-400 line-through">₹{product.price}</span>
                           <span className="text-lg font-black text-primary-600">₹{product.discountPrice}</span>
                         </>
                       ) : (
                         <span className="text-lg font-black text-primary-600">₹{product.price}</span>
                       )}
                    </div>
                    <div className="p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors flex items-center gap-1">
                      <span className="text-xs font-bold px-1">View</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
