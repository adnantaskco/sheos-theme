import React from 'react';

export default function BootsSection() {
  const categories = [
    {
      title: "Athletic Footwear",
      count: "8",
      image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-5.png?v=1731658002&width=540",
      href: "#"
    },
    {
      title: "Luxury Leather Shoes",
      count: "8",
      image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-6.png?v=1731658012&width=540",
      href: "#"
    },
    {
      title: "Sustainable Footwear",
      count: "8",
      image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-1.png?v=1731657959&width=540",
      href: "#"
    },
    {
      title: "Sandals & Slides",
      count: "8",
      image: "https://qx-shooz.myshopify.com/cdn/shop/collections/col-2.png?v=1731657969&width=540",
      href: "#"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-12 bg-white text-neutral-900">
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-[0.2em] text-amber-500 uppercase block mb-2">
          Stylish And Comfortable For Every Season
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 uppercase">
          Boots & Booties
        </h2>
        <p className="text-xs md:text-sm text-neutral-500 mt-2">
          Check out our collection of the top New Products that encourage conversion.
        </p>
      </div>

      {/* 4-Column Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {categories.map((cat, idx) => (
          <a 
            key={idx} 
            href={cat.href} 
            className="group relative block rounded-xl overflow-hidden bg-neutral-100 h-[380px] sm:h-[420px] shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle bottom gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            </div>

            {/* Bottom Floating Card Info */}
            <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 text-center  transform transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 tracking-tight">
                {cat.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {cat.count}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}