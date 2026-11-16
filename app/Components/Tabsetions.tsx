"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TabShoeCard from "@/app/Components/TabProductcard";

import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Colorway {
  id: string;
  name: string;
  image: string;
  swatchStyle: string;
}

export interface ShoeProduct {
  id: string;
  slug: string;
  brand: string;
  badge?: string;
  title: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  price: number;
  shippingNote?: string;
  defaultColorwayId: string;
  defaultSize: string;
  sizes: string[];
  colorways: Colorway[];
  tabCategory: string;
}

export const productsData: ShoeProduct[] = [
  {
    id: "1",
    slug: "boldwalks-chunky-platform-sandals",
    brand: "BoldWalks",
    badge: "-21%",
    title: "CHUNKY PLATFORM SANDALS",
    subtitle: "Comfortable Everyday Wear",
    rating: 5,
    reviewCount: 124,
    price: 25.00,
    shippingNote: "Free Shipping & Returns",
    defaultColorwayId: "c1",
    defaultSize: "US 7",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    colorways: [
      {
        id: "c1",
        name: "Black",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTes2FY3RFGAYs8pGmNznFJ3bER-LY5drCgiwxL4u69WA&s",
        swatchStyle: "#000000"
      },
      {
        id: "c2",
        name: "Brown",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDNbNoeiCnMygeY5h_7rmA_3t6Jh9FlIzmojNRseaNYg&s=10",
        swatchStyle: "#8B4513"
      }
    ],
    tabCategory: "featured"
  },
  {
    id: "2",
    slug: "sprintmax-lightweight-running-shoes",
    brand: "SPRINTMAX",
    badge: "SOLD OUT",
    title: "LIGHTWEIGHT RUNNING SHOES",
    subtitle: "High-Performance Athletic Kicks",
    rating: 4,
    reviewCount: 85,
    price: 0.00,
    shippingNote: "Free shipping available",
    defaultColorwayId: "c1",
    defaultSize: "US 8",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    colorways: [
      {
        id: "c1",
        name: "Grey",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTes2FY3RFGAYs8pGmNznFJ3bER-LY5drCgiwxL4u69WA&s",
        swatchStyle: "#808080"
      }
    ],
    tabCategory: "featured"
  },
  {
    id: "3",
    slug: "retrosole-vintage-suede-loafers",
    brand: "RETROSOLE",
    badge: "Classic",
    title: "VINTAGE SUEDE LOAFERS",
    subtitle: "Classic Retro Style",
    rating: 5,
    reviewCount: 92,
    price: 25.00,
    shippingNote: "Free Shipping & Returns",
    defaultColorwayId: "c1",
    defaultSize: "US 7",
    sizes: ["US 7", "US 8", "US 9"],
    colorways: [
      {
        id: "c1",
        name: "Tan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDNbNoeiCnMygeY5h_7rmA_3t6Jh9FlIzmojNRseaNYg&s=10",
        swatchStyle: "#D2B48C"
      }
    ],
    tabCategory: "featured"
  },
  {
    id: "4",
    slug: "ecostride-vegan-leather-combat-boots",
    brand: "ECOSTRIDE",
    badge: "SOLD OUT",
    title: "VEGAN LEATHER COMBAT BOOTS",
    subtitle: "Durable All-Weather Boots",
    rating: 4,
    reviewCount: 67,
    price: 25.00,
    shippingNote: "Free Shipping & Returns",
    defaultColorwayId: "c1",
    defaultSize: "US 8",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    colorways: [
      {
        id: "c1",
        name: "Black",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTes2FY3RFGAYs8pGmNznFJ3bER-LY5drCgiwxL4u69WA&s",
        swatchStyle: "#1a1a1a"
      }
    ],
    tabCategory: "featured"
  },
  {
    id: "5",
    slug: "sportyfeet-classic-white-tennis",
    brand: "SPORTYFEET",
    badge: "Classic",
    title: "CLASSIC WHITE TENNIS",
    subtitle: "Timeless Court Style",
    rating: 5,
    reviewCount: 210,
    price: 25.00,
    shippingNote: "Free Shipping & Returns",
    defaultColorwayId: "c1",
    defaultSize: "US 7",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    colorways: [
      {
        id: "c1",
        name: "White",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDNbNoeiCnMygeY5h_7rmA_3t6Jh9FlIzmojNRseaNYg&s=10",
        swatchStyle: "#FFFFFF"
      }
    ],
    tabCategory: "featured"
  },
  {
    id: "6",
    slug: "trailgear-waterproof-hiking-boots",
    brand: "TRAILGEAR",
    badge: "New Arrival",
    title: "WATERPROOF HIKING BOOTS",
    subtitle: "All-Terrain Adventure Gear",
    rating: 5,
    reviewCount: 145,
    price: 25.00,
    shippingNote: "Complimentary Express Shipping",
    defaultColorwayId: "c1",
    defaultSize: "US 8",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    colorways: [
      {
        id: "c1",
        name: "Charcoal",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTes2FY3RFGAYs8pGmNznFJ3bER-LY5drCgiwxL4u69WA&s",
        swatchStyle: "#333333"
      }
    ],
    tabCategory: "new"
  },
  {
    id: "7",
    slug: "urbanstep-classic-leather-sneakers",
    brand: "URBANSTEP",
    badge: "New Era",
    title: "CLASSIC LEATHER SNEAKERS",
    subtitle: "Everyday Streetwear",
    rating: 4,
    reviewCount: 78,
    price: 21.00,
    shippingNote: "Free Shipping & Returns",
    defaultColorwayId: "c1",
    defaultSize: "US 7",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    colorways: [
      {
        id: "c1",
        name: "White",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDNbNoeiCnMygeY5h_7rmA_3t6Jh9FlIzmojNRseaNYg&s=10",
        swatchStyle: "#f5f5f5"
      }
    ],
    tabCategory: "new"
  },
  {
    id: "8",
    slug: "trendyfeet-high-top-canvas-sneakers",
    brand: "TRENDYFEET",
    badge: "Bestseller",
    title: "HIGH-TOP CANVAS SNEAKERS",
    subtitle: "Casual Skate Style",
    rating: 5,
    reviewCount: 160,
    price: 25.00,
    shippingNote: "Free Shipping & Returns",
    defaultColorwayId: "c1",
    defaultSize: "US 7",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    colorways: [
      {
        id: "c1",
        name: "Black",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTes2FY3RFGAYs8pGmNznFJ3bER-LY5drCgiwxL4u69WA&s",
        swatchStyle: "#222222"
      }
    ],
    tabCategory: "best"
  },
  {
    id: "9",
    slug: "airwalk-breathable-mesh-slip-ons",
    brand: "AIRWALK",
    badge: "Trending",
    title: "BREATHABLE MESH SLIP-ONS",
    subtitle: "Ultra Lightweight Comfort",
    rating: 4,
    reviewCount: 112,
    price: 25.00,
    shippingNote: "Free Standard Shipping",
    defaultColorwayId: "c1",
    defaultSize: "US 8",
    sizes: ["US 8", "US 9", "US 10"],
    colorways: [
      {
        id: "c1",
        name: "Grey",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTes2FY3RFGAYs8pGmNznFJ3bER-LY5drCgiwxL4u69WA&s",
        swatchStyle: "#9ca3af"
      }
    ],
    tabCategory: "best"
  },
  {
    id: "10",
    slug: "luxefeet-premium-chelsea-boots",
    brand: "LUXEFEET",
    badge: "Pro Series",
    title: "PREMIUM CHELSEA BOOTS",
    subtitle: "Sophisticated Formalwear",
    rating: 5,
    reviewCount: 95,
    price: 25.00,
    shippingNote: "Free Priority Shipping",
    defaultColorwayId: "c1",
    defaultSize: "US 8",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    colorways: [
      {
        id: "c1",
        name: "Brown",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDNbNoeiCnMygeY5h_7rmA_3t6Jh9FlIzmojNRseaNYg&s=10",
        swatchStyle: "#5c4033"
      }
    ],
    tabCategory: "best"
  }
];

type TabCategory = "featured" | "new" | "best";

export default function SneakersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const [activeTab, setActiveTab] = useState<TabCategory>("featured");
  const [activeDot, setActiveDot] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  const filteredProducts = productsData.filter(
    (product) => product.tabCategory === activeTab
  );

  // Pagination calculation
  const updatePagination = useCallback(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const pageWidth = slider.clientWidth || 1;
    const maxScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth
    );

    const totalPages = Math.max(
      1,
      Math.ceil(maxScroll / pageWidth) + 1
    );

    const currentPage = Math.round(
      slider.scrollLeft / pageWidth
    );

    setDotCount(totalPages);
    setActiveDot(Math.min(currentPage, totalPages - 1));
  }, []);

  // Recalculate on resize and tab change
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    slider.scrollTo({ left: 0, behavior: "instant" });

    updatePagination();

    const observer = new ResizeObserver(updatePagination);
    observer.observe(slider);

    return () => observer.disconnect();
  }, [activeTab, filteredProducts.length, updatePagination]);

  // Arrow navigation
  const scrollCarousel = (direction: number) => {
    const slider = scrollRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth,
      behavior: "smooth",
    });
  };

  // Dot navigation
  const goToPage = (index: number) => {
    const slider = scrollRef.current;
    if (!slider) return;

    slider.scrollTo({
      left: index * slider.clientWidth,
      behavior: "smooth",
    });
  };

  // Mouse drag
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.button !== 0) return;

    const slider = scrollRef.current;
    if (!slider) return;

    isDragging.current = true;
    startX.current = e.pageX;
    startScrollLeft.current = slider.scrollLeft;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDragging.current || !scrollRef.current) return;

    e.preventDefault();

    const walk = (e.pageX - startX.current) * 1.5;

    scrollRef.current.scrollLeft =
      startScrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };


  return (
 <section className="w-full bg-white py-8 sm:py-10 lg:py-14 text-black overflow-hidden">
      <div className="container mx-auto px-3 sm:px-5 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between gap-3 mb-6 sm:mb-8">

          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 mb-2">
              The Latest Trends In Athletic Footwear
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">
              Sneakers & Kicks
            </h2>
          </div>

          {/* Desktop / Mobile Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              aria-label="Previous products"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel(1)}
              aria-label="Next products"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-5 sm:gap-8 mb-7 border-b border-neutral-200">

          {[
            { id: "featured", label: "Featured" },
            { id: "new", label: "New Arrivals" },
            { id: "best", label: "Best Seller" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id as TabCategory)
              }
              className={`relative pb-3 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === tab.id
                  ? "text-black"
                  : "text-neutral-400 hover:text-black"
              }`}
            >
              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-amber-500" />
              )}
            </button>
          ))}

        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onScroll={updatePagination}
          onDragStart={(e) => e.preventDefault()}
          className="
            flex items-stretch
            gap-3 sm:gap-4 lg:gap-5
            overflow-x-auto overflow-y-hidden
            pb-5 pt-2
            snap-x snap-mandatory
            no-scrollbar
            cursor-grab active:cursor-grabbing
            select-none
            touch-pan-x
          "
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="
                shrink-0 snap-start min-w-0
                basis-[calc((100%-12px)/2)]
                sm:basis-[calc((100%-16px)/2)]
                md:basis-[calc((100%-32px)/3)]
                lg:basis-[calc((100%-60px)/4)]
                xl:basis-[calc((100%-80px)/5)]
                transition-transform duration-300
                hover:-translate-y-1
              "
            >
              <TabShoeCard
                product={product}
                onAddToCart={(details) =>
                  console.log("Added to cart:", details)
                }
              />
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="w-full py-12 text-center text-sm text-neutral-500">
              No products available.
            </div>
          )}

        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-3">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToPage(index)}
              aria-label={`Go to page ${index + 1}`}
              aria-current={activeDot === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeDot === index
                  ? "w-8 bg-amber-500"
                  : "w-2 bg-neutral-300 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}