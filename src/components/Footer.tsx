import React from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, Mail, Instagram, Clock, CakeSlice } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 text-slate-600 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-slate-900">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-primary-200">
                <CakeSlice className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter">
                MAHALAXMI<span className="text-primary-600 uppercase font-medium ml-1 text-base">Cakes</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500">
              Baking happiness daily. Premium quality cakes, pastries, and more for your special occasions.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/pratikkk_009" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-primary-600 transition-colors">Shop</Link></li>
              <li><Link to="/categories" className="hover:text-primary-600 transition-colors">Categories</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>Near Hanuman Dairy, Kagal Road, Yalgud, Pin 416236, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>+91 9309128464</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span>pratikc0203@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-500 shrink-0" />
                <div>
                  <p>Monday - Sunday</p>
                  <p className="text-primary-600 font-medium">7:00 AM – 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Mahalaxmi Cakes. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-slate-900 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
