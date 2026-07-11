import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ShoppingCart, User, Menu, X, CakeSlice } from './Icons';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-white border-b border-slate-100 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-primary-200">
              <CakeSlice className="w-5 h-5" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900">
              MAHALAXMI<span className="text-primary-600 uppercase font-medium ml-1 text-lg">Cakes</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary-600 ${
                    isActive ? 'text-primary-600' : 'text-slate-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Link to="/cart" className="relative p-2 text-slate-700 hover:text-primary-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/login" className="hidden md:flex items-center justify-center h-10 w-10 bg-slate-100 rounded-full border border-slate-200 text-slate-600 hover:text-primary-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                <User className="w-5 h-5" />
                Login / Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
