import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterestP, 
  FaYoutube 
} from 'react-icons/fa6';
import { GiFootTrip } from 'react-icons/gi';

export default function NewsletterFooter() {
  return ( 
    <footer className="w-full  text-neutral-800 pt-4 pb-8 ">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        
        {/* 1. Subscribe Banner Box */}
        <div className="relative bg-[#f1a9b2] rounded-xl overflow-hidden mb-16 p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row items-center justify-between shadow-xl">
          {/* Background Image / Sneaker Graphic Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0 mix-blend-overlay"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&auto=format&fit=crop&q=80')` 
            }}
          />

          {/* Left Title */}
          <div className="relative z-10 text-white max-w-lg mb-6 lg:mb-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-tight">
              SUBSCRIBE TO OUR NEWS ARTICALS
            </h3>
          </div>

          {/* Right Input & Button */}
          <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2 max-w-md">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full sm:w-80 bg-white text-neutral-900 px-4 py-3.5 text-sm outline-none placeholder:text-neutral-400"
            />
            <button 
              type="button" 
              className="w-full sm:w-auto bg-neutral-900 hover:bg-black text-white text-xs font-bold tracking-widest uppercase px-6 py-3.5 transition-colors shrink-0"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* 2. Multi-Column Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-300">
          
          {/* Column 1: Information */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 mb-4">
              INFOMATION
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li><a href="#" className="hover:text-black transition-colors">My Account</a></li>
              <li><a href="#" className="hover:text-black transition-colors">My Cart</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Size Chart</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Wishlist</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Gift Card</a></li>
            </ul>
          </div>

          {/* Column 3: Brand & Contact Info (Centered on desktop) */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col items-center text-center lg:text-left lg:items-start">
            <div className="flex items-center pb-3">
                      <a href="https://qx-shooz.myshopify.com/" className="text-lg font-black tracking-wider flex items-center text-black">
                        SH
                        <span className="inline-flex items-center justify-center mx-0.5 text-black">
                          <GiFootTrip />
                        </span>
                        Z
                      </a>
                    </div>
            <p className="text-xs text-neutral-600 mb-2">
              <strong className="text-neutral-900">T:</strong> + (08) 9055 0269
            </p>
            <p className="text-xs text-neutral-600 mb-2">
              <strong className="text-neutral-900">E:</strong> example@example.com
            </p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              50 Porana Place, West Casuarinas, Western Australia, Australia.
            </p>
          </div>

          {/* Column 4: Categories */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 mb-4">
              CATEGORIES
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li><a href="#" className="hover:text-black transition-colors">Athletic Footwear</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Boots for Every Occasion</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Luxury Leather Shoes</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sandals & Slides</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sneakerhead's Haven</a></li>
            </ul>
          </div>

          {/* Column 5: Support */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sign In</a></li>
              <li><a href="#" className="hover:text-black transition-colors">My Account</a></li>
            </ul>
          </div>

        </div>

        {/* 3. Bottom Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2024 Shooz. All rights reserved</p>

          {/* Payment Badges Mock / Icons */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-black text-white font-bold text-[10px] rounded">AMEX</span>
            <span className="px-2 py-1 bg-blue-600 text-white font-bold text-[10px] rounded">Pay</span>
            <span className="px-2 py-1 bg-blue-500 text-white font-bold text-[10px] rounded">VISA</span>
            <span className="px-2 py-1 bg-orange-600 text-white font-bold text-[10px] rounded">MC</span>
            <span className="px-2 py-1 bg-purple-600 text-white font-bold text-[10px] rounded">DISC</span>
          </div>
        </div>

      </div>
    </footer>
  );
}