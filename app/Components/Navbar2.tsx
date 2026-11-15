"use client";
import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  ChevronDown, 
  X, 
  Menu 
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { GiFootTrip } from 'react-icons/gi';

// Interface definitions for strict TypeScript safety
interface NavItem {
  name: string;
  href: string;
}

interface NavColumn {
  title: string;
  items: NavItem[];
}

interface FeaturedCard {
  title: string;
  subtitle: string;
  href: string;
  bgClass: string;
  badge: string;
}

interface MegaMenu {
  label: string;
  href: string;
  type: "mega";
  columns: NavColumn[];
  featuredCard?: FeaturedCard;
}

interface DropdownMenu {
  label: string;
  href: string;
  type: "dropdown";
  items: NavItem[];
}

type NavMenu = MegaMenu | DropdownMenu;

const navData: Record<string, NavMenu> = {
  shop: {
    label: "Shop",
    href: "https://qx-shooz.myshopify.com/collections/all",
    type: "mega",
    columns: [
      {
        title: "Layout",
        items: [
          { name: "Filter Sidebar", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Filter Top", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Filter Drawer", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Without Filter", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Collection - 2 columns", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Collection - 3 columns", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Collection - 4 columns", href: "https://qx-shooz.myshopify.com/collections/all" },
        ]
      },
      {
        title: "Features",
        items: [
          { name: "Banner Image", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Banner No Image", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Banner Split", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Collection list", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Sub Collection", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Pagination", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Infinity", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Load More", href: "https://qx-shooz.myshopify.com/collections/all" },
        ]
      },
      {
        title: "Hover Style",
        items: [
          { name: "Hover Style 1", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Hover Style 2", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Hover Style 3", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Hover Style 4", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Hover Style 5", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Hover Style 6", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Hover Style 7", href: "https://qx-shooz.myshopify.com/collections/all" },
          { name: "Hover Style 8", href: "https://qx-shooz.myshopify.com/collections/all" },
        ]
      }
    ],
    featuredCard: {
      title: "Athletic Footwear",
      subtitle: "8 products",
      href: "https://qx-shooz.myshopify.com/collections/athletic-footwear",
      bgClass: "bg-[#0b3c4c]",
      badge: "Athletic Preview"
    }
  },
  product: {
    label: "Product",
    href: "https://qx-shooz.myshopify.com/#",
    type: "mega",
    columns: [
      {
        title: "Product Layouts",
        items: [
          { name: "Thumbnails - bottom", href: "#" },
          { name: "Thumbnails - left", href: "#" },
          { name: "Thumbnails - right", href: "#" },
          { name: "Without Thumbnails", href: "#" },
          { name: "List - stacked", href: "#" },
          { name: "List - grid", href: "#" },
          { name: "Collage - style 1", href: "#" },
          { name: "Collage - style 2", href: "#" },
        ]
      },
      {
        title: "Product Type",
        items: [
          { name: "Simple Product", href: "#" },
          { name: "Variable Product", href: "#" },
          { name: "With Video", href: "#" },
          { name: "Sold Out - Coming", href: "#" },
        ]
      },
      {
        title: "List Featured 1",
        items: [
          { name: "Sticky ATC", href: "#" },
          { name: "Frequently Bought Together", href: "#" },
          { name: "Count Down", href: "#" },
          { name: "Cross Selling", href: "#" },
          { name: "Upsell Popup", href: "#" },
          { name: "Low Stock Alert", href: "#" },
          { name: "Pickup Store", href: "#" },
        ]
      },
      {
        title: "List Featured 2",
        items: [
          { name: "Dropdown Variant", href: "#" },
          { name: "Swatch Variant Color", href: "#" },
          { name: "Swatch Variant Image", href: "#" },
          { name: "Variant Image Square", href: "#" },
          { name: "Size Guide", href: "#" },
          { name: "Description Accordion", href: "#" },
          { name: "Description Tab Center", href: "#" },
        ]
      }
    ],
    featuredCard: {
      title: "Waterproof Hiking Boots",
      subtitle: "$25.00",
      href: "https://qx-shooz.myshopify.com/products/waterproof-hiking-boots",
      bgClass: "bg-gray-50 border border-gray-100",
      badge: "TrailGear"
    }
  },
  blog: {
    label: "Blog",
    href: "https://qx-shooz.myshopify.com/blogs/news",
    type: "mega",
    columns: [
      {
        title: "List Layout",
        items: [
          { name: "List Left Sidebar", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "List Right Sidebar", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "List Item Basic", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "List Item Overlay", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "List Item Box", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "List Item Classic", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "List Item Classic Box", href: "https://qx-shooz.myshopify.com/blogs/news" },
        ]
      },
      {
        title: "Grid Layout",
        items: [
          { name: "Grid Left Sidebar", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Grid Right Sidebar", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Grid Item Basic", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Grid Item Overlay", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Grid Item Box", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Grid Item Classic", href: "https://qx-shooz.myshopify.com/blogs/news" },
        ]
      },
      {
        title: "Article",
        items: [
          { name: "Title in image", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Title after image", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Title before image", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Left Sidebar", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Right Sidebar", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Title Center", href: "https://qx-shooz.myshopify.com/blogs/news" },
          { name: "Article Video", href: "https://qx-shooz.myshopify.com/blogs/news" },
        ]
      }
    ],
    featuredCard: {
      title: "Enjoy a 50% Price Slash",
      subtitle: "Revamp Your Wardrobe at Jaw-Dropping Prices.",
      href: "https://qx-shooz.myshopify.com/collections/all",
      bgClass: "bg-[#d2b48c]",
      badge: "Promo Preview"
    }
  },
  
};

export default function Navbar2() {
  const [topBannerOpen, setTopBannerOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);

  const toggleMobileSub = (key: string) => {
    setOpenMobileSub(openMobileSub === key ? null : key);
  };

  return (
    <header className="absolute w-full font-sans  z-50">
      {/* 1. Top Announcement Bar */}
      {topBannerOpen && (
        <div className="bg-[#722f37] text-white text-xs transition-all">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-2 flex justify-between items-center">
            <div className="flex-1 text-center overflow-hidden whitespace-nowrap">
              <span>Enjoy 20% off your entire order with the code <strong className="underline">SHOEFRESH20</strong>.</span>
            </div>
            <button 
              onClick={() => setTopBannerOpen(false)} 
              className="text-white hover:text-gray-200 focus:outline-none ml-2"
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Sub-Utility Bar */}
      <div className="bg-gray-100 border-b border-gray-200 text-xs text-gray-600">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-1.5 flex justify-between items-center">
          <div>
            <span>One Day Delivery Available</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://qx-shooz.myshopify.com/account/register" className="hover:text-black transition-colors">Login / Register</a>
            <div className="flex items-center space-x-3 text-gray-700">
              <a href="#facebook" aria-label="Facebook" className="hover:text-black"><FaFacebook size={14} /></a>
              <a href="#twitter" aria-label="Twitter" className="hover:text-black"><FaTwitter size={14} /></a>
              <a href="#instagram" aria-label="Instagram" className="hover:text-black"><FaInstagram size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 relative">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 flex items-center justify-between">
        
        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 focus:outline-none mr-3"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="https://qx-shooz.myshopify.com/" className="text-4xl font-black tracking-wider flex items-center text-black">
            SH
            <span className="inline-flex items-center justify-center mx-0.5 text-black">
              <GiFootTrip />
            </span>
            Z
          </a>
        </div>

        {/* Desktop Center Menu Links */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-800">
          <li>
            <a href="https://qx-shooz.myshopify.com/" className="text-[#722f37] border-b-2 border-[#722f37] pb-1">Home</a>
          </li>

          {Object.entries(navData).map(([key, menu]: [string, NavMenu]) => (
            <li key={key} className="relative group cursor-pointer py-2 static">
              <a href={menu.href} className="flex items-center gap-1 hover:text-[#722f37]">
                <span>{menu.label}</span>
                <ChevronDown size={14} />
              </a>

              {/* Full-Screen Mega Menu / Dropdown */}
              {menu.type === "mega" ? (
                <div className="absolute top-full left-0 w-screen bg-white border-t border-b border-gray-200 shadow-2xl px-16 py-10 hidden group-hover:grid grid-cols-1 md:grid-cols-5 gap-8 z-50">
                  {menu.columns.map((col, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-black text-sm uppercase tracking-wider mb-4 pb-1 border-b border-gray-100">{col.title}</h4>
                      <ul className="space-y-2.5 text-sm text-gray-600">
                        {col.items.map((item, i) => (
                          <li key={i}>
                            <a href={item.href} className="hover:text-[#722f37] transition-colors block">{item.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Featured Card Column */}
                  {menu.featuredCard && (
                    <div className="col-span-1 md:border-l md:pl-8 border-gray-100 flex flex-col justify-center">
                      <a href={menu.featuredCard.href} className="group/card block">
                        <div className={`${menu.featuredCard.bgClass} h-36 rounded-md overflow-hidden relative mb-3 flex items-center justify-center shadow-inner`}>
                          <span className="text-white text-xs font-semibold px-2.5 py-1 bg-black/40 rounded">{menu.featuredCard.badge}</span>
                        </div>
                        <h5 className="font-bold text-sm text-black group-hover/card:text-[#722f37]">{menu.featuredCard.title}</h5>
                        <p className="text-xs text-gray-500 mt-1">{menu.featuredCard.subtitle}</p>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg py-2 hidden group-hover:block z-50">
                  {menu.items.map((item, i) => (
                    <a key={i} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#722f37]">
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* Buy Now Sale Link */}
          <li className="relative flex items-center">
            <a href="https://1.envato.market/shooz" className="hover:text-[#722f37]">Buy Now</a>
            <span className="absolute -top-3 -right-8 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Sale
            </span>
          </li>
        </ul>

        {/* Right Side Action Icons */}
        <div className="flex items-center space-x-5 text-gray-800">
          <button aria-label="Search" className="hover:text-[#722f37] transition-colors">
            <Search size={20} />
          </button>
          <button aria-label="Account" className="hover:text-[#722f37] transition-colors">
            <User size={20} />
          </button>
          <button aria-label="Wishlist" className="hover:text-[#722f37] transition-colors">
            <Heart size={20} />
          </button>
          <button aria-label="Cart" className="flex items-center space-x-1 hover:text-[#722f37] transition-colors relative">
            <div className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </div>
          </button>
        </div>

        </div>
      </nav>

      {/* Mobile Off-Canvas / Accordion Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-xl">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="font-bold text-gray-900">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}><X size={20} /></button>
            </div>
            <a href="https://qx-shooz.myshopify.com/" className="block text-sm font-medium text-[#722f37]">Home</a>

            {Object.entries(navData).map(([key, menu]: [string, NavMenu]) => (
              <div key={key} className="space-y-2">
                <button 
                  onClick={() => toggleMobileSub(key)}
                  className="w-full flex justify-between items-center text-sm font-medium text-gray-800 py-1"
                >
                  <span>{menu.label}</span>
                  <ChevronDown size={14} className={`transform transition-transform ${openMobileSub === key ? 'rotate-180' : ''}`} />
                </button>

                {openMobileSub === key && (
                  <div className="pl-4 space-y-3 py-2 border-l-2 border-gray-100">
                    {menu.type === "mega" ? (
                      menu.columns.map((col, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-xs font-bold text-gray-400 uppercase">{col.title}</p>
                          {col.items.map((item, i) => (
                            <a key={i} href={item.href} className="block text-xs text-gray-600 py-0.5 hover:text-[#722f37]">{item.name}</a>
                          ))}
                        </div>
                      ))
                    ) : (
                      menu.items.map((item, i) => (
                        <a key={i} href={item.href} className="block text-xs text-gray-600 py-0.5 hover:text-[#722f37]">{item.name}</a>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}

            <a href="https://1.envato.market/shooz" className="block text-sm font-medium text-green-600 pt-2">Buy Now (Sale)</a>
          </div>
        </div>
      )}
    </header>
  );
}