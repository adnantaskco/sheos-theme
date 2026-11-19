"use client";

import { useState } from "react";

const shoes = [
  {
    id: 1,
    name: "Air Motion",
    category: "Running Collection",
    image:
      "https://i.pinimg.com/1200x/33/5c/7a/335c7a303b8839e6e491df45581a21c9.jpg",
  },
  {
    id: 2,
    name: "Urban Runner",
    category: "Lifestyle Collection",
    image:
      "https://i.pinimg.com/1200x/93/84/83/93848363ee8d0fc903d296885349e6ac.jpg",
  },
  {
    id: 3,
    name: "Street Classic",
    category: "Streetwear Collection",
    image:
      "https://plain-apac-prod-public.komododecks.com/202611/16/8cEiLn9tTSudKr0SnIxu/image.png",
  },
  {
    id: 4,
    name: "Cloud Walker",
    category: "Comfort Collection",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1400",
  },
  {
    id: 5,
    name: "Retro Sport",
    category: "New Arrivals",
    image:
      "https://i.pinimg.com/1200x/4e/c9/a1/4ec9a1d713bd1715fc0ddf772c7f2f5d.jpg",
  },
];

export default function ExpandableShoeHero() {
  const [active, setActive] = useState(2);

  return (
    <section className="w-full bg-[#f5f4f0] px-3 pt-36 pb-8 sm:px-6 sm:pt-36 md:pt-28 lg:px-8">
      <div className="">
        {/* Mobile: Vertical Accordion | Desktop: Horizontal Accordion */}
        <div className="flex h-[calc(100svh-7.5rem)] min-h-[500px] max-h-[740px] w-full flex-col gap-2 overflow-hidden rounded-2xl md:h-[560px] md:flex-row md:gap-3">
          {shoes.map((shoe, index) => {
            const isActive = active === index;

            return (
              <button
                key={shoe.id}
                type="button"
                onClick={() => setActive(index)}
                className={`group relative min-h-0 min-w-0 overflow-hidden rounded-xl text-left transition-all duration-700 ease-in-out focus:outline-none ${
                  isActive ? "flex-[5]" : "flex-[1]"
                } md:flex-none`}
                data-active={isActive}
                aria-label={`Explore ${shoe.name}`}
                aria-expanded={isActive}
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-colors duration-700 ${
                    isActive
                      ? "bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                      : "bg-black/55 group-hover:bg-black/35"
                  }`}
                />

                {/* Collapsed Label: Horizontal Row on Mobile, Vertical Column on Desktop */}
                <div
                  className={`absolute inset-0 flex flex-row items-center justify-between px-5 text-white transition-opacity duration-500 md:flex-col md:px-0 md:py-6 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="text-xs font-medium tracking-widest text-white/75">
                    0{shoe.id}
                  </span>

                  <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 group-hover:translate-x-1 md:text-sm md:[writing-mode:vertical-rl] md:rotate-180 md:group-hover:translate-x-0 md:group-hover:-translate-y-1">
                    {shoe.name}
                  </span>

                  <span className="h-[1px] w-4 bg-white/40 md:h-4 md:w-[1px]" />
                </div>

                {/* Expanded Content */}
                <div
                  className={`absolute bottom-0 left-0 w-full p-5 text-white transition-all duration-700 sm:p-6 md:p-8 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-5 opacity-0"
                  }`}
                >
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 sm:text-xs md:mb-2">
                    {shoe.category}
                  </p>

                  <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:mb-5 md:text-4xl lg:text-5xl">
                    {shoe.name}
                  </h2>

                  <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white sm:px-6 sm:py-3 sm:text-xs">
                    Explore Collection
                    <span>↗</span>
                  </span>
                </div>

                {/* Top Right Counter on Active Card */}
                {isActive && (
                  <span className="absolute hidden sm:block right-4 top-4 rounded-full border border-white/40 bg-black/25 px-3.5 py-1 text-[11px] font-medium tracking-wider text-white backdrop-blur-sm md:right-5 md:top-5 md:px-4 md:py-1.5 md:text-xs">
                    0{shoe.id} / 05
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Flex Ratio Override */}
      <style jsx>{`
        @media (min-width: 768px) {
          button[data-active="true"] {
            flex: 6 1 0% !important;
          }
          button[data-active="false"] {
            flex: 1 1 0% !important;
          }
        }
      `}</style>
    </section>
  );
}