
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ShoeCard from "@/app/Components/productcard";
import { FemaleProductData } from "@/lib/ladiesdata";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LadiesCatalogPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeDot, setActiveDot] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getCardWidth = useCallback(() => {
    const slider = scrollRef.current;
    const card = slider?.firstElementChild as HTMLElement | null;

    if (!slider || !card) return 0;

    const style = window.getComputedStyle(slider);
    const gap = parseFloat(style.columnGap) || 0;

    return card.getBoundingClientRect().width + gap;
  }, []);

  const updateActiveDot = useCallback(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    const index = Math.round(slider.scrollLeft / cardWidth);
    setActiveDot(Math.min(index, FemaleProductData.length - 1));
  }, [getCardWidth]);

  // Move one card forward
  const nextSlide = useCallback(() => {
    const slider = scrollRef.current;
    if (!slider || FemaleProductData.length <= 1) return;

    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScroll - 5) {
      // Return to first card
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  }, [getCardWidth]);

  // Move one card backward
  const prevSlide = useCallback(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    if (slider.scrollLeft <= 5) {
      slider.scrollTo({
        left: slider.scrollWidth - slider.clientWidth,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  }, [getCardWidth]);

  // Auto play
  useEffect(() => {
    if (isPaused || FemaleProductData.length <= 1) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  // Dot navigation
  const goToSlide = (index: number) => {
    const slider = scrollRef.current;
    if (!slider) return;

    const cardWidth = getCardWidth();

    slider.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white py-8 overflow-hidden text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Drop 04 Selection
            </span>

            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1">
              Ladies Collection
            </h2>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-label="Previous product"
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-label="Next product"
              className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={updateActiveDot}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="
            flex items-stretch gap-4
            overflow-x-auto overflow-y-hidden
            pb-6 pt-2
            snap-x snap-mandatory
            scroll-smooth
            no-scrollbar
          "
        >
          {FemaleProductData.map((product) => (
            <div
              key={product.id}
              className="
                shrink-0 snap-start
                w-[calc(50%_-_8px)]
                md:w-[calc(33.333%_-_11px)]
                lg:w-[calc(25%_-_12px)]
                xl:w-[calc(20%_-_13px)]
                transition-transform duration-300
                hover:-translate-y-1
              "
            >
              <ShoeCard
                product={product}
                onAddToCart={(item) =>
                  console.log("Added to cart:", item)
                }
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-3">
          {FemaleProductData.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to product ${index + 1}`}
              className={`
                h-2.5 rounded-full transition-all duration-300
                ${
                  activeDot === index
                    ? "w-8 bg-amber-500"
                    : "w-2.5 bg-neutral-300 hover:bg-neutral-500"
                }
              `}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
