"use client";
import React, { useRef, useState } from 'react';
import ShoeCard from '@/app/Components/productcard';
import { ALL_PRODUCTS } from '@/lib/ShoeProduct';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CatalogPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse drag to scroll state variables
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Left/Right Arrow Navigation
  const scrollByAmount = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white py-6 overflow-hidden text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & Navigation Arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Drop 04 Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1">
              Featured Collection
            </h2>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollByAmount(-400)}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByAmount(400)}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* X-Axis Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex items-stretch gap-4 overflow-x-auto pb-6 pt-2 snap-x no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {ALL_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              // Responsive width breakdown:
              // - Mobile: calc(50% - 8px) -> exactly 2 cards side-by-side
              // - Tablet (md): calc(33.333% - 11px) -> 3 cards
              // - Large (lg): calc(25% - 12px) -> 4 cards
              // - Extra Large (xl): calc(20% - 13px) -> exactly 5 cards fit in desktop view
              className="shrink-0 snap-start w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-13px)] transition-transform duration-300 hover:-translate-y-1"
            >
              <ShoeCard 
                product={product} 
                onAddToCart={(item) => console.log('Added to cart:', item)} 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}