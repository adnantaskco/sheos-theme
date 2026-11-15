import React from 'react';

export default function ComfortMeetsFashion() {
  return (
    <section className="w-full bg-[#e6e2dd] py-16  ">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-neutral-200/50 rounded-2xl overflow-hidden ">
        
        {/* Left Side: Product / Model Image Box */}
        <div className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] rounded-xl overflow-hidden bg-neutral-300 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80" 
            alt="Comfort Meets Fashion Sneaker" 
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right Side: Text & CTA Content */}
        <div className="flex flex-col justify-center text-left md:pl-8 space-y-4">
          <span className="text-[11px] font-bold tracking-[0.25em] text-amber-500 uppercase">
            COMFORT MEETS FASHION
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 uppercase leading-[1.15]">
            Discover shoes that look great and feel even better
          </h2>

          <p className="text-sm text-neutral-600 leading-relaxed font-normal pt-1">
            Our collection features comfortable and stylish footwear designed to keep your feet happy all day long.
          </p>

          <div className="pt-4">
            <a 
              href="https://qx-shooz.myshopify.com/collections" 
              className="inline-flex items-center gap-2 bg-[#722f37] hover:bg-[#5a242c] text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-none transition-all duration-300 shadow-lg"
            >
              <span>SHOP NOW</span>
              <span className="text-base font-normal">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}