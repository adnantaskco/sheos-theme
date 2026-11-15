"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const PremiumCategories: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: '1',
      title: 'Performance Runners',
      subtitle: 'Carbon-Plated Speed',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      link: '#running',
    },
    {
      id: '2',
      title: 'Italian Leather Craft',
      subtitle: 'Minimalist Court Lows',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
      link: '#court',
    },
    {
      id: '3',
      title: 'Urban Platforms',
      subtitle: 'Elevated Streetwear',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
      link: '#platforms',
    },
    {
      id: '4',
      title: 'Weatherproof GORE-TEX',
      subtitle: 'Built for the Elements',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      link: '#weatherproof',
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Curated Silhouettes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase mt-2">
              Explore By Category
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md mt-4 md:mt-0">
            Precision engineering meets avant-garde design. Discover footwear crafted for every dimension of modern movement.
          </p>
        </div>

        {/* Category Bento-Style Grid: 2 columns on mobile, 12 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-6">
          {categories.map((item, index) => (
            <a
              key={item.id}
              href={item.link}
              className={`group relative rounded-2xl overflow-hidden bg-neutral-950 h-[210px] sm:h-[320px] md:h-[420px] flex flex-col justify-end p-3.5 sm:p-8 border border-neutral-800/60 transition-all duration-500 hover:border-amber-500/50 ${
                index === 0 || index === 3 
                  ? 'col-span-2 md:col-span-8' 
                  : 'col-span-1 md:col-span-4'
              }`}
            >
              {/* Background Image with Zoom on Hover */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlays for High Contrast Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Content Information */}
              <div className="relative z-10 flex items-end justify-between w-full">
                <div>
                  <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xs sm:text-2xl md:text-3xl font-black text-white uppercase mt-0.5 sm:mt-1 tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Animated Arrow Button Indicator */}
                <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-600 group-hover:border-amber-600 transition-all duration-300 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PremiumCategories;