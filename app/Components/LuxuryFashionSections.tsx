"use client";

import React, { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Plus,
} from "lucide-react";

import ShoeCard from "@/app/Components/productcard";
import { ALL_PRODUCTS } from "@/lib/ShoeProduct";

// Product Type
type ShoeProduct = (typeof ALL_PRODUCTS)[number];

// Section Data (মোবাইলে ২টা কার্ডের সাথে সামঞ্জস্য রেখে সাজানো)
const heroProducts = ALL_PRODUCTS.slice(0, 2);
const trendingProducts = ALL_PRODUCTS.slice(2, 6);
const bestSellerProducts = ALL_PRODUCTS.slice(6, 10);

const LOOK_ITEMS = [
  { name: "Sneakers", price: "$89.00" },
  { name: "Handbag", price: "$129.00" },
  { name: "Sunglasses", price: "$49.00" },
] as const;

const BUNDLE_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    alt: "Sneakers",
  },
  {
    src: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500",
    alt: "Cap",
  },
  {
    src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    alt: "Sunglasses",
  },
] as const;

// Reusable Product Card Wrapper
function ProductCard({ product }: { product: ShoeProduct }) {
  return (
    <div className="h-full min-w-0">
      <ShoeCard
        product={product}
        onAddToCart={(item) => console.log("Added to cart:", item)}
      />
    </div>
  );
}

// Responsive Product Carousel (Mobile: 2 cards per view, Desktop: multi-card)
function ProductCarousel({ items }: { items: ShoeProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const step = Math.max(container.clientWidth * 0.5, 180);
    container.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative min-w-0">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth pb-2 sm:gap-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((product) => (
          <div
            key={product.id}
            className="w-[calc(50%-0.3125rem)] shrink-0 snap-start sm:w-[calc(50%-0.4375rem)] md:w-[46%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Previous products"
        className="absolute left-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#eee5da] bg-white/95 text-[#24211e] shadow-md backdrop-blur-sm transition hover:bg-[#c49a58] hover:text-white sm:-left-3 sm:h-9 sm:w-9"
      >
        <ArrowLeft size={16} />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Next products"
        className="absolute right-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#eee5da] bg-white/95 text-[#24211e] shadow-md backdrop-blur-sm transition hover:bg-[#c49a58] hover:text-white sm:-right-3 sm:h-9 sm:w-9"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

// Main Component
export default function LuxuryFashionSections() {
  return (
    <main className="w-full overflow-x-hidden bg-[#faf8f5] py-5 text-[#24211e] sm:py-7">
      <div className="container mx-auto space-y-5 px-4 sm:space-y-6 sm:px-6 lg:px-8">
        {/* =================================
            1. EDITORIAL PRODUCT SHOWCASE
        ================================== */}
        <section className="relative overflow-hidden rounded-2xl bg-[#e9d9c8] shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800"
            alt="Luxury fashion collection"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#f5e9dc]/95 via-[#e9d9c8]/80 to-[#e9d9c8]/90 lg:bg-gradient-to-r lg:from-[#f5e9dc]/95 lg:via-[#e9d9c8]/65 lg:to-transparent" />

          <div className="relative grid grid-cols-1 items-center gap-6 p-4 sm:p-8 lg:min-h-[420px] lg:grid-cols-[1fr_1.15fr] lg:p-10">
            {/* Hero Content */}
            <div className="max-w-md">
              <h1 className="font-serif text-4xl leading-[0.98] tracking-tight sm:text-5xl lg:text-7xl">
                Step Into
                <span className="block text-[#b88743]">Elegance</span>
              </h1>

              <p className="mt-3 text-sm text-[#51473e] sm:mt-4 sm:text-base">
                Premium shoes. Timeless style.
              </p>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#171614] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#b88743] sm:mt-6 sm:px-6 sm:py-3"
              >
                <span>Explore Collection</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Hero Products (মোবাইলে ২ কলাম গ্রিড, বড় স্ক্রিনে ২ কলাম) */}
            <div className="grid grid-cols-2 items-end gap-2.5 sm:gap-4">
              {heroProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* =================================
            2. SHOP THE LOOK & 3. TRENDING NOW
        ================================== */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* 2. SHOP THE LOOK */}
          <section className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl bg-[#eee5db] p-4 sm:flex-row sm:items-center sm:p-7">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1100"
              alt="Complete fashion look"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#f4ece3]/95 via-[#f4ece3]/75 to-[#f4ece3]/85 sm:bg-gradient-to-r sm:from-[#f4ece3]/95 sm:via-[#f4ece3]/70 sm:to-transparent" />

            <div className="relative z-10 max-w-[240px]">
              <h2 className="font-serif text-3xl leading-none sm:text-4xl lg:text-5xl">
                Complete
                <span className="block text-[#b88743]">the Look</span>
              </h2>

              <p className="mt-3 text-xs leading-relaxed text-[#51473e] sm:mt-4 sm:text-sm">
                From head to toe, with perfect style.
              </p>

              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#191715] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#b88743] sm:mt-5 sm:py-3"
              >
                <span>Shop The Look</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Look Items */}
            <div className="relative z-10 mt-6 grid grid-cols-2 gap-2 sm:mt-0 sm:flex sm:flex-col sm:self-end">
              {LOOK_ITEMS.map(({ name, price }, idx) => (
                <div
                  key={name}
                  className={`flex items-center justify-between gap-2 rounded-full bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm transition hover:scale-[1.02] sm:min-w-[170px] sm:p-2 ${
                    idx === 2 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eee6dc] text-[#24211e] sm:h-9 sm:w-9">
                      <ShoppingBag size={15} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold leading-tight">
                        {name}
                      </p>
                      <p className="text-[10px] text-gray-500">{price}</p>
                    </div>
                  </div>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#faf8f5] text-[#24211e]">
                    <Plus size={13} />
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. TRENDING NOW */}
          <section className="min-w-0 rounded-2xl border border-[#eee7df] bg-white p-4 sm:p-7">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.75fr_1.45fr] md:items-center">
              {/* Trending Heading */}
              <div>
                <h2 className="font-serif text-3xl leading-none sm:text-4xl lg:text-5xl">
                  What&apos;s
                  <span className="block text-[#ce6c86]">Trending</span>
                </h2>

                <p className="mt-3 text-xs leading-6 text-gray-500 sm:mt-4">
                  Discover the most loved styles this season.
                </p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#191715] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#b88743] sm:py-3"
                >
                  <span>View All</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Trending Products Carousel */}
              

<ProductCarousel items={trendingProducts} />
            </div>
          </section>
        </div>

        {/* =================================
            4. BEST SELLERS & 5. SEASONAL COLLECTION
        ================================== */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {/* 4. BEST SELLERS */}
          <section className="min-w-0 rounded-2xl border border-[#eee7df] bg-white p-4 sm:p-7">
            <div className="grid grid-cols-1 items-center gap-5 xl:grid-cols-[0.65fr_1.65fr]">
              {/* Best Seller Heading */}
              <div>
                <h2 className="font-serif text-3xl leading-none sm:text-4xl lg:text-5xl">
                  Customer
                  <span className="block text-[#b88743]">Favorites</span>
                </h2>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                  These styles are absolutely loved!
                </p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#191715] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#b88743] sm:mt-5 sm:py-3"
                >
                  <span>Shop Best Sellers</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Best Seller Products (মোবাইলে ২ কলাম গ্রিড) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                {bestSellerProducts.slice(0, 2).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* 5. SEASONAL COLLECTION */}
          <section className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl bg-[#202328] p-5 text-white sm:p-8">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200"
              alt="Seasonal fashion collection"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#16191e]/95 via-[#16191e]/65 to-transparent" />

            <div className="relative z-10">
              <h2 className="font-serif text-3xl leading-none sm:text-4xl lg:text-5xl">
                Winter
                <span className="block text-[#e4b56d]">Collection</span>
              </h2>

              <p className="mt-3 text-sm text-gray-200 sm:mt-4">
                Stay warm. Stay stylish.
              </p>
            </div>

            <div className="relative z-10 mt-6">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#e4b56d] px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-white sm:py-3"
              >
                <span>Explore Winter</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </section>
        </div>

        {/* =================================
            6. COMPLETE YOUR STYLE (BUNDLE)
        ================================== */}
        <section className="relative overflow-hidden rounded-2xl border border-[#eee2d2] bg-gradient-to-r from-[#f5e8d8] via-[#fffaf4] to-[#f1dfc9] p-4 sm:p-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.4fr_0.85fr]">
            {/* Bundle Content */}
            <div>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Complete Your
                <span className="text-[#bd8b4c]"> Style</span>
              </h2>

              <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                Get the perfect bundle and save more!
              </p>

              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#171614] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#b88743] sm:mt-5 sm:px-6 sm:py-3"
              >
                <span>Shop Bundle</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Bundle Images */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-4">
              {BUNDLE_ITEMS.map((item, idx) => (
                <React.Fragment key={item.alt}>
                  <div className="aspect-square w-20 overflow-hidden rounded-xl bg-white/70 p-1.5 shadow-sm sm:w-28 sm:p-2 md:w-32">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  {idx < BUNDLE_ITEMS.length - 1 && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/85 text-[#66503a] shadow-sm sm:h-7 sm:w-7">
                      <Plus size={14} />
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Bundle Price */}
            <div className="flex flex-row items-center justify-between rounded-2xl border border-[#e7c99f] bg-[#f0d5ae] p-4 sm:p-5 lg:flex-col lg:items-start">
              <div>
                <p className="text-xs font-medium text-[#66503a]">Bundle Price</p>

                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl font-bold sm:text-3xl">$119.00</span>
                  <span className="text-xs text-gray-600 line-through">
                    $167.00
                  </span>
                </div>
              </div>

              <span className="inline-block rounded-full bg-[#171614] px-4 py-2 text-xs font-medium text-white lg:mt-3">
                Save 29%
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}