"use client"
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { GiFootTrip } from 'react-icons/gi';

// TypeScript Interfaces
interface FeaturedItem {
  title: string;
  subtitle: string;
  image: string;
}

interface Category {
  name: string;
  href: string;
  badge?: string;
  isHighlight?: boolean;
  featured?: FeaturedItem[];
  links?: string[];
}

interface MobileAccordionItemProps {
  category: Category;
  closeDrawer: () => void;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [cartCount] = useState<number>(0);

  // Handle scroll effect for glassmorphism navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navCategories: Category[] = [
    {
      name: 'New Releases',
      href: '#new',
      badge: 'Drop 04',
      featured: [
        {
          title: 'AeroGlide Carbon',
          subtitle: 'Marathon Performance',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
        },
        {
          title: 'Veloce Court Low',
          subtitle: 'Italian Leather Craft',
          image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80',
        },
      ],
      links: ['Latest Drops', 'Limited Editions', 'Collaborations', 'Coming Soon'],
    },
    {
      name: 'Men',
      href: '#men',
      featured: [
        {
          title: 'Running & Training',
          subtitle: 'Engineered for Speed',
          image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80',
        },
        {
          title: 'Everyday Lifestyle',
          subtitle: 'Minimalist Comfort',
          image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80',
        },
      ],
      links: ['Sneakers', 'Running Shoes', 'Basketball', 'Boots & Chelsea', 'Loafers', 'Slides'],
    },
    {
      name: 'Women',
      href: '#women',
      featured: [
        {
          title: 'CloudStep Studio',
          subtitle: 'Featherlight Cushion',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
        },
        {
          title: 'Urban Platform',
          subtitle: 'Elevated Streetwear',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
        },
      ],
      links: ['Lifestyle Sneakers', 'Running', 'Training & Gym', 'Platforms', 'Flats & Mules', 'Boots'],
    },
    {
      name: 'Collections',
      href: '#collections',
      links: ['Heritage Archive', 'Gore-Tex Weatherproof', 'Sustainable Knit', 'Pro Track Series'],
    },
    {
      name: 'Sale',
      href: '#sale',
      isHighlight: true,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-neutral-950 text-white text-xs py-2 px-4 text-center tracking-wider uppercase font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Complimentary Express Shipping on Orders Over $150 — Free 30-Day Returns
        </span>
      </div>

      {/* Main Navbar */}
      <nav
        onMouseLeave={() => setActiveDropdown(null)}
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-neutral-200/80 py-3'
            : 'bg-white border-neutral-100 py-4'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Mobile Hamburger + Brand Logo */}
            <div className="flex items-center gap-3 lg:gap-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="lg:hidden p-2 -ml-2 text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Brand Logo */}
              <div className="flex items-center">
                        <a href="/" className="text-4xl font-black tracking-wider flex items-center text-black">
                          SH
                          <span className="inline-flex items-center justify-center mx-0.5 text-black">
                            <GiFootTrip />
                          </span>
                          Z
                        </a>
                      </div>
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navCategories.map((category) => (
                <div
                  key={category.name}
                  onMouseEnter={() =>
                    category.links ? setActiveDropdown(category.name) : setActiveDropdown(null)
                  }
                  className="relative py-2"
                >
                  <a
                    href={category.href}
                    className={`flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors ${
                      category.isHighlight
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-neutral-800 hover:text-neutral-500'
                    }`}
                  >
                    <span>{category.name}</span>
                    {category.badge && (
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-neutral-900 text-white rounded">
                        {category.badge}
                      </span>
                    )}
                    {category.links && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === category.name ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </a>
                </div>
              ))}
            </div>

            {/* Right: Search, User Account, Bag */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Expandable Desktop/Tablet Search Bar */}
              <div className="hidden md:flex items-center">
                {isSearchOpen ? (
                  <div className="flex items-center bg-neutral-100 rounded-full px-3.5 py-1.5 border border-neutral-300 focus-within:border-neutral-900 transition-all w-56 xl:w-64">
                    <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search Air, Jordan, Runners..."
                      autoFocus
                      className="bg-transparent text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none w-full"
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-neutral-400 hover:text-neutral-800 ml-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Search products"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 bg-neutral-100/80 hover:bg-neutral-200/70 rounded-full transition-colors"
                  >
                    <Search className="w-4 h-4 text-neutral-800" />
                    <span className="hidden xl:inline text-xs font-medium text-neutral-500 pr-4">
                      Search footwear...
                    </span>
                  </button>
                )}
              </div>

              {/* Mobile Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle mobile search"
                className="md:hidden p-2 text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Profile */}
              <button
                aria-label="Account"
                className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Shopping Bag */}
              <button
                aria-label="Shopping bag"
                className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-950 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Input Bar */}
          {isSearchOpen && (
            <div className="md:hidden pt-3 pb-1">
              <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2 border border-neutral-300">
                <Search className="w-4 h-4 text-neutral-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search shoes, styles, sizes..."
                  autoFocus
                  className="bg-transparent text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none w-full"
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Mega Menu Dropdown */}
        {activeDropdown && (
          <div
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={() => setActiveDropdown(null)}
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-neutral-200 shadow-xl animate-fadeIn"
          >
            <div className="max-w-7xl mx-auto px-8 py-8">
              {navCategories
                .filter((cat) => cat.name === activeDropdown)
                .map((category) => (
                  <div key={category.name} className="grid grid-cols-12 gap-8">
                    {/* Category Links */}
                    <div className="col-span-4 border-r border-neutral-100 pr-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                        Shop {category.name}
                      </p>
                      <ul className="space-y-3">
                        {category.links?.map((link: string) => (
                          <li key={link}>
                            <a
                              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                              className="group flex items-center justify-between text-base font-medium text-neutral-800 hover:text-amber-600 transition-colors"
                            >
                              <span>{link}</span>
                              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual Featured Cards */}
                    <div className="col-span-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                        Featured Highlights
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        {category.featured ? (
                          category.featured.map((item: FeaturedItem) => (
                            <a
                              key={item.title}
                              href="#featured"
                              className="group relative overflow-hidden rounded-xl bg-neutral-100 aspect-[16/9] flex items-end p-5"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                              <div className="relative z-10 text-white">
                                <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                                  {item.subtitle}
                                </p>
                                <h4 className="text-lg font-bold mt-0.5">{item.title}</h4>
                              </div>
                            </a>
                          ))
                        ) : (
                          <div className="col-span-2 bg-neutral-100 rounded-xl p-6 flex items-center justify-between">
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                                Curated Footwear
                              </span>
                              <h4 className="text-xl font-bold text-neutral-900 mt-1">
                                Explore Full {category.name} Catalog
                              </h4>
                              <p className="text-sm text-neutral-600 mt-1">
                                Precision-engineered silhouettes built for everyday movement.
                              </p>
                            </div>
                            <a
                              href={category.href}
                              className="px-5 py-2.5 bg-neutral-950 text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors"
                            >
                              Shop All
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile & Tablet Slide-Over Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark Backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <div
          className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <span className="text-xl font-black tracking-tight uppercase">
              KINETIX<span className="text-amber-600">.</span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Accordion Links */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
            {navCategories.map((category) => (
              <MobileAccordionItem
                key={category.name}
                category={category}
                closeDrawer={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 bg-neutral-50 border-t border-neutral-200 space-y-4">
            <div className="w-full">
              <a
                href="#account"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-950 text-white text-sm font-semibold rounded-full w-full"
              >
                <User className="w-4 h-4" />
                Sign In
              </a>
            </div>
            <p className="text-xs text-center text-neutral-500">
              Free shipping & returns for KINETIX Members.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

// Sub-component for Mobile/Tablet Expandable Category Links
const MobileAccordionItem: React.FC<MobileAccordionItemProps> = ({ category, closeDrawer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="py-3.5">
      {category.links ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between text-left py-1"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-neutral-900">{category.name}</span>
              {category.badge && (
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-500 text-white rounded-full">
                  {category.badge}
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="mt-3 pl-2 space-y-3">
              <ul className="space-y-2.5 border-l-2 border-neutral-200 pl-4">
                {category.links.map((link: string) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={closeDrawer}
                      className="block text-sm font-medium text-neutral-600 hover:text-neutral-950"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Featured Shoe Preview inside Mobile Drawer */}
              {category.featured && (
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {category.featured.map((item: FeaturedItem) => (
                    <a
                      key={item.title}
                      href="#featured"
                      onClick={closeDrawer}
                      className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-neutral-100"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                        <span className="text-xs font-bold text-white leading-tight">
                          {item.title}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <a
          href={category.href}
          onClick={closeDrawer}
          className={`block py-1 text-lg font-bold ${
            category.isHighlight ? 'text-red-600' : 'text-neutral-900'
          }`}
        >
          {category.name}
        </a>
      )}
    </div>
  );
};

export default Navbar;