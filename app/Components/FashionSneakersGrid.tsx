"use client";
import React from 'react';

export default function FashionSneakersGrid() {
  const gridItems = [
    {
      subtitle: "COMFORT MEETS FASHION",
      title: "Discover shoes that look great",
      image: "https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-1.png?v=1731045532&width=1920",
      href: "http://localhost:3000/#",
    },
    {
      subtitle: "ELEVATE YOUR LOOK",
      title: "Find the perfect pair of shoes",
      image: "https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-2.png?v=1731045532&width=1920",
      href: "http://localhost:3000/#",
    },
    {
      subtitle: "STEP INTO STYLE",
      title: "The latest trends in footwear",
      image: "https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-3.png?v=1731045526&width=1920",
      href: "http://localhost:3000/#",
    },
    {
      subtitle: "SHOP BY BRAND",
      title: "Find your favorite brands and styles",
      image: "https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-4.png?v=1731045517&width=1920",
      href: "http://localhost:3000/#",
    },
    {
      subtitle: "SALE AND CLEARANCE",
      title: "Shop our latest deals and discounts",
      image: "https://qx-shooz.myshopify.com/cdn/shop/files/five-col-banner-5.png?v=1731045518&width=1920",
      href: "http://localhost:3000/#",
    }
  ];

  return (
    <section className="w-full py-14 md:py-20 px-3 sm:px-4 md:px-12 bg-neutral-950 text-white overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-amber-500 uppercase block mb-2">
            FASHION SNEAKERS
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Timeless styles for everyday wear
          </h2>
          <p className="text-[11px] sm:text-sm text-neutral-400 mt-2 sm:mt-3">
            High-performance footwear for sports and workouts
          </p>
        </div>

        {/* Grid Container */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* Top Row: 3 Columns on both Mobile & Desktop */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {gridItems.slice(0, 3).map((item, idx) => (
              <div 
                key={idx} 
                className="group relative h-[210px] sm:h-[350px] md:h-[460px] rounded-xl overflow-hidden bg-neutral-900 shadow-lg"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-3 sm:p-6 md:p-8 flex flex-col justify-end text-left z-10">
                  <span className="text-[8px] sm:text-[10px] font-extrabold tracking-[0.15em] sm:tracking-[0.2em] text-amber-400 uppercase mb-1 sm:mb-2 truncate">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xs sm:text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-tight sm:leading-snug mb-2 sm:mb-4 line-clamp-2">
                    {item.title}
                  </h3>
                  <a 
                    href={item.href} 
                    className="inline-flex items-center gap-1 text-[9px] sm:text-xs font-bold uppercase tracking-widest text-white group-hover:text-amber-400 transition-colors w-fit"
                  >
                    <span>SHOP NOW</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: 2 Columns on both Mobile & Desktop */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {gridItems.slice(3, 5).map((item, idx) => (
              <div 
                key={idx} 
                className="group relative h-[230px] sm:h-[350px] md:h-[460px] rounded-xl overflow-hidden bg-neutral-900 shadow-lg"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end text-left z-10">
                  <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.15em] sm:tracking-[0.2em] text-amber-400 uppercase mb-1 sm:mb-2 truncate">
                    {item.subtitle}
                  </span>
                  <h3 className="text-sm sm:text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-tight sm:leading-snug mb-2 sm:mb-4 line-clamp-2">
                    {item.title}
                  </h3>
                  <a 
                    href={item.href} 
                    className="inline-flex items-center gap-1 text-[9px] sm:text-xs font-bold uppercase tracking-widest text-white group-hover:text-amber-400 transition-colors w-fit"
                  >
                    <span>SHOP NOW</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}