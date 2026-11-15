"use client";
import React, { useState } from 'react';
import { ShoeProduct } from '@/app/Components/productcard';
import TabShoeCard from './TabProductcard';

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

export default function SneakersSection() {
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'best'>('featured');

  const filteredProducts = productsData.filter(
    (product) => product.tabCategory === activeTab
  );

  return (
    <section className="w-full py-6 px-4 md:px-6 bg-white text-black">
      {/* Section Header & Tabs */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-500 mb-2 font-semibold">
          The Latest Trends In Athletic Footwear
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black uppercase mb-4">
          Sneakers & Kicks
        </h2>

        {/* Tab Navigation Buttons */}
        <div className="flex justify-center items-center space-x-6 md:space-x-10 mt-6 border-b border-neutral-200 pb-2">
          <button
            onClick={() => setActiveTab('featured')}
            className={`text-sm font-bold tracking-wider uppercase transition-colors relative pb-2 ${
              activeTab === 'featured' ? 'text-black border-b-2 border-black' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`text-sm font-bold tracking-wider uppercase transition-colors relative pb-2 ${
              activeTab === 'new' ? 'text-black border-b-2 border-black' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            New Arrivals
          </button>
          <button
            onClick={() => setActiveTab('best')}
            className={`text-sm font-bold tracking-wider uppercase transition-colors relative pb-2 ${
              activeTab === 'best' ? 'text-black border-b-2 border-black' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Best Seller
          </button>
        </div>
      </div>

      {/* Product Display Grid - Mobile horizontal scroll, Desktop clean grid */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 flex md:grid gap-4 overflow-x-auto snap-x md:overflow-visible md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 pb-4 no-scrollbar">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="shrink-0 snap-start w-[calc(50%-8px)] sm:w-[280px] md:w-auto transition-transform duration-300 hover:-translate-y-1"
          >
            <TabShoeCard 
              product={product} 
              onAddToCart={(details) => console.log('Added to cart:', details)} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}