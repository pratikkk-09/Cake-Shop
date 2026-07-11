import React from 'react';
import { Link } from 'react-router';
import { ChevronRight, Star } from '../components/Icons';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-7xl mx-auto bg-primary-600 rounded-3xl relative overflow-hidden flex items-center py-16 px-8 sm:px-16 min-h-[400px]">
          <div className="z-10 max-w-lg">
            <span className="text-primary-100 font-semibold tracking-widest text-xs uppercase mb-3 block">Freshly Baked Daily</span>
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
              Premium Custom Cakes for Every Moment
            </h1>
            <p className="text-primary-50 text-lg mb-6 leading-relaxed opacity-90">
              Discover over 100+ designer cakes handcrafted with love in the heart of Yalgud.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="bg-white text-primary-600 px-8 py-3 rounded-full font-bold text-sm shadow-lg inline-flex items-center gap-2">
                Order Now <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/custom-builder" className="border border-primary-400 text-white px-8 py-3 rounded-full font-bold text-sm bg-primary-700/30">
                Build Custom Cake
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="hidden lg:block absolute right-[-40px] top-[-40px] w-80 h-80 bg-primary-500 rounded-full opacity-50"></div>
          <div className="hidden lg:flex absolute right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 items-center justify-center">
            <div className="text-center">
               <div className="text-5xl mb-2">🎂</div>
               <span className="text-white font-bold block">Signature</span>
               <span className="text-primary-200 text-xs">Red Velvet</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of cakes designed specifically for your celebrations.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {['Birthday', 'Wedding', 'Anniversary', 'Kids', 'Theme', 'Eggless'].map((category) => (
            <Link key={category} to={`/shop?category=${category.toLowerCase()}`} className="group block text-center">
              <div className="aspect-square rounded-full bg-gray-100 mb-4 overflow-hidden relative border-4 border-transparent group-hover:border-primary-100 transition-colors">
                 <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
                   Image
                 </div>
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
