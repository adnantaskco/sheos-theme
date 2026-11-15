"use client"
import React, { useState } from 'react';
import { ShoppingBag, Check, Star } from 'lucide-react';

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
  tabCategory?: string;
}

interface ShoeCardProps {
  product: ShoeProduct;
  onAddToCart?: (details: { product: ShoeProduct; colorway: Colorway; size: string }) => void;
  className?: string;
}

export default function ShoeCard({ product, onAddToCart, className = '' }: ShoeCardProps) {
  const {
    brand,
    badge,
    title,
    subtitle,
    rating,
    reviewCount,
    price,
    shippingNote,
    colorways = [],
    sizes = [],
    defaultColorwayId,
    defaultSize,
  } = product;

  const [selectedColorId, setSelectedColorId] = useState(
    defaultColorwayId || colorways[0]?.id
  );
  const [selectedSize, setSelectedSize] = useState(defaultSize || sizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const activeColorway =
    colorways.find((c) => c.id === selectedColorId) || colorways[0];

  const handleAddToCart = () => {
    setIsAdded(true);
    if (typeof onAddToCart === 'function') {
      onAddToCart({
        product,
        colorway: activeColorway,
        size: selectedSize,
      });
    }
    setTimeout(() => setIsAdded(false), 1600);
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }).map((_, idx) => {
      const starValue = idx + 1;
      const isFull = score >= starValue;
      const isHalf = !isFull && score >= starValue - 0.5;
      return (
        <span key={idx} className="relative inline-flex items-center justify-center w-2.5 h-2.5">
          <Star className="w-2.5 h-2.5 text-slate-300 fill-slate-200" />
          {(isFull || isHalf) && (
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: isFull ? '100%' : '52%' }}
            >
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Main card container optimized for compact height / aspect ratio */}
      <article
        className={`group relative w-full h-full rounded-[18px] p-3.5 bg-white border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${className}`}
      >
        <div className="flex flex-col h-full justify-between">
          
          {/* Top Section: Brand & Badge */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-bold tracking-[0.15em] text-neutral-500 uppercase truncate">
              {brand}
            </span>
            {badge && (
              <span className="shrink-0 px-1.5 py-0.2 rounded-full text-[8.5px] font-semibold tracking-wide text-neutral-800 bg-neutral-100 border border-neutral-200">
                {badge}
              </span>
            )}
          </div>

          {/* Shoe Image Box */}
          <div className="relative w-full aspect-[16/10] flex items-center justify-center overflow-hidden rounded-lg bg-neutral-50 my-1 border border-neutral-100">
            {activeColorway?.image ? (
              <img
                src={activeColorway.image}
                alt={title}
                className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="text-xs text-neutral-400">No Image</div>
            )}
          </div>

          {/* Title, Subtitle & Rating */}
          <div className="mt-0.5 text-left">
            <h3 className="text-xs sm:text-sm font-extrabold tracking-tight text-neutral-900 uppercase leading-tight line-clamp-1">
              {title}
            </h3>
            <p className="text-[10px] text-neutral-500 tracking-wide line-clamp-1 mt-0.5">
              {subtitle}
            </p>
            <div className="mt-1 flex items-center gap-1">
              <div className="flex items-center gap-0.5">{renderStars(rating)}</div>
              <span className="text-[9px] text-neutral-400 font-medium">
                ({reviewCount})
              </span>
            </div>
          </div>

          {/* Compact Divider */}
          <div className="my-2 h-[1px] w-full bg-neutral-100" />

          {/* Selectors: Colorways & Sizes */}
          <div className="space-y-1.5">
            {/* Colorways - Smaller Swatches */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[8.5px] font-bold tracking-widest text-neutral-400 uppercase shrink-0">
                Color
              </span>
              <div className="flex items-center gap-1 overflow-x-auto max-w-[150px] sm:max-w-[170px] hide-scrollbar py-0.2">
                {colorways.map((cw) => {
                  const isSelected = cw.id === selectedColorId;
                  return (
                    <button
                      key={cw.id}
                      type="button"
                      onClick={() => setSelectedColorId(cw.id)}
                      className={`relative w-4 h-4 rounded-full transition-all flex items-center justify-center shrink-0 ${
                        isSelected ? 'ring-1.5 ring-neutral-900 scale-110' : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full block border border-neutral-300 shadow-sm"
                        style={{ background: cw.swatchStyle }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[8.5px] font-bold tracking-widest text-neutral-400 uppercase shrink-0">
                Size
              </span>
              <div className="flex items-center gap-1 overflow-x-auto max-w-[150px] sm:max-w-[170px] hide-scrollbar py-0.2">
                {sizes.map((size) => {
                  const isSelected = size === selectedSize;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-5 min-w-[22px] px-1 rounded text-[9.5px] font-medium transition-all shrink-0 ${
                        isSelected
                          ? 'bg-neutral-900 text-white font-bold shadow-sm'
                          : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Compact Divider */}
          <div className="my-2 h-[1px] w-full bg-neutral-100" />

          {/* Bottom Section: Price & Cart Button */}
          <div className="flex items-center justify-between gap-2 mt-auto pt-0.5">
            <div className="text-sm sm:text-base font-black text-neutral-900 shrink-0 tracking-tight">
              ${price.toFixed(2)}
            </div>
            
            <button
              type="button"
              onClick={handleAddToCart}
              className={`inline-flex items-center justify-center gap-1 h-8 w-8 sm:w-auto sm:px-3 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all active:scale-95 shrink-0 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
              title="Add to Cart"
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 stroke-[2] shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">Add to Cart</span>
                </>
              )}
            </button>
          </div>

          {shippingNote && (
            <p className="mt-1.5 text-center text-[8.5px] text-neutral-400 tracking-wide truncate">
              {shippingNote}
            </p>
          )}

        </div>
      </article>
    </>
  );
}