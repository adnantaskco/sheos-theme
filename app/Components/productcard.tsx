"use client"
import React, { useRef, useState } from 'react';
import { ShoppingBag, Check, Star } from 'lucide-react';

export type TabCategory = "featured" | "new" | "best";

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
  tabCategory?: TabCategory;
}

interface ShoeCardProps {
  product: ShoeProduct;
  onAddToCart?: (details: { product: ShoeProduct; colorway: Colorway; size: string }) => void;
  className?: string;
}

// ইউনিক ডেলিভারি বক্স প্যাকিং + ফ্লাই-টু-কার্ট অ্যানিমেশন
const packAndFlyToCart = (
  cardElement: HTMLElement | null,
  productImage: string | undefined,
  onComplete?: () => void
) => {
  const cartIcon = document.getElementById("header-cart-icon");
  if (!cardElement || !cartIcon) {
    window.dispatchEvent(new Event("cart-item-added"));
    onComplete?.();
    return;
  }

  const cardRect = cardElement.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  // মিডিয়াম সাইজ বক্স (86px x 86px) কার্ডের মাঝখান থেকে শুরু হবে
  const boxSize = 86;
  const startX = cardRect.left + cardRect.width / 2 - boxSize / 2;
  const startY = cardRect.top + cardRect.height / 2 - boxSize / 2;

  const endX = cartRect.left + cartRect.width / 2 - boxSize / 2;
  const endY = cartRect.top + cartRect.height / 2 - boxSize / 2;

  // মেইন প্যাকিং বক্স কন্টেইনার
  const boxContainer = document.createElement("div");
  boxContainer.style.position = "fixed";
  boxContainer.style.left = `${startX}px`;
  boxContainer.style.top = `${startY}px`;
  boxContainer.style.width = `${boxSize}px`;
  boxContainer.style.height = `${boxSize}px`;
  boxContainer.style.zIndex = "9999";
  boxContainer.style.pointerEvents = "none";
  boxContainer.style.perspective = "500px";

  // ভেতরের ডিজাইন: বক্স + জুতার ছবি + দুই পাশের ফ্ল্যাপ + সিলিং টেপ
  boxContainer.innerHTML = `
    <div style="
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(145deg, #d9a066, #b87b42);
      border: 2px solid #8c5828;
      border-radius: 12px;
      box-shadow: 0 18px 30px rgba(0,0,0,0.28);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    ">
      <!-- বক্সের ভেতরের ডার্ক শেড -->
      <div style="
        position: absolute;
        inset: 4px;
        background: #5c3a1a;
        border-radius: 8px;
      "></div>

      <!-- প্রোডাক্টের জুতা (যা বক্সের ভেতরে ঢুকবে) -->
      ${
        productImage
          ? `<img class="pack-shoe" src="${productImage}" style="
              position: relative;
              z-index: 2;
              width: 64px;
              height: 64px;
              object-fit: contain;
              filter: drop-shadow(0 6px 8px rgba(0,0,0,0.4));
            " />`
          : `<div class="pack-shoe" style="position:relative;z-index:2;width:44px;height:44px;background:#fff;border-radius:8px;"></div>`
      }

      <!-- বাম পাশের বক্সের ঢাকনা (Left Flap) -->
      <div class="flap-left" style="
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 51%;
        background: linear-gradient(90deg, #c98e55, #dca670);
        border-right: 1.5px solid #8c5828;
        z-index: 3;
        transform-origin: left center;
        transform: rotateY(-105deg);
      "></div>

      <!-- ডান পাশের বক্সের ঢাকনা (Right Flap) -->
      <div class="flap-right" style="
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 51%;
        background: linear-gradient(270deg, #c98e55, #dca670);
        border-left: 1.5px solid #8c5828;
        z-index: 3;
        transform-origin: right center;
        transform: rotateY(105deg);
      "></div>

      <!-- মাঝখানের সিলিং টেপ (Sealing Tape) -->
      <div class="box-tape" style="
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 16px;
        transform: translateX(-50%) scaleY(0);
        transform-origin: top center;
        background: rgba(245, 158, 11, 0.92);
        border-left: 1px dashed rgba(255,255,255,0.6);
        border-right: 1px dashed rgba(255,255,255,0.6);
        z-index: 4;
      "></div>

      <!-- ছোট ডেলিভারি লেবেল স্টিকার -->
      <div class="box-label" style="
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 22px;
        height: 14px;
        background: #ffffff;
        border-radius: 2px;
        opacity: 0;
        z-index: 5;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
      "></div>
    </div>
  `;

  document.body.appendChild(boxContainer);

  const shoeEl = boxContainer.querySelector(".pack-shoe") as HTMLElement;
  const flapLeft = boxContainer.querySelector(".flap-left") as HTMLElement;
  const flapRight = boxContainer.querySelector(".flap-right") as HTMLElement;
  const tapeEl = boxContainer.querySelector(".box-tape") as HTMLElement;
  const labelEl = boxContainer.querySelector(".box-label") as HTMLElement;

  // ধাপ ১: বক্সটি পপ-আপ হয়ে আসবে ও জুতা ভেতরে বসবে (0ms - 350ms)
  boxContainer.animate(
    [
      { transform: "scale(0.3)", opacity: 0 },
      { transform: "scale(1.06)", opacity: 1, offset: 0.7 },
      { transform: "scale(1)", opacity: 1 },
    ],
    { duration: 350, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" }
  );

  shoeEl?.animate(
    [
      { transform: "translateY(-28px) scale(1.2)", opacity: 0.4 },
      { transform: "translateY(0px) scale(0.85)", opacity: 1 },
    ],
    { duration: 350, easing: "ease-out", fill: "forwards" }
  );

  // ধাপ ২: ৩৫০ms পর বক্সের দুই পাশের ঢাকনা বন্ধ হবে ও টেপ লাগবে
  setTimeout(() => {
    flapLeft?.animate(
      [{ transform: "rotateY(-105deg)" }, { transform: "rotateY(0deg)" }],
      { duration: 280, easing: "ease-in-out", fill: "forwards" }
    );
    flapRight?.animate(
      [{ transform: "rotateY(105deg)" }, { transform: "rotateY(0deg)" }],
      { duration: 280, easing: "ease-in-out", fill: "forwards" }
    );

    // ঢাকনা বন্ধ হওয়ার পর সিলিং টেপ ও লেবেল বসবে
    setTimeout(() => {
      tapeEl?.animate(
        [
          { transform: "translateX(-50%) scaleY(0)" },
          { transform: "translateX(-50%) scaleY(1)" },
        ],
        { duration: 220, easing: "ease-out", fill: "forwards" }
      );
      labelEl?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
      });
    }, 240);
  }, 350);

  // ধাপ ৩: ৮৫০ms পর প্যাক করা বক্সটি ধীরে ধীরে উড়ে কার্ট আইকনে যাবে
  setTimeout(() => {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const flyAnim = boxContainer.animate(
      [
        {
          transform: "translate(0px, 0px) scale(1) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translate(${deltaX * 0.45}px, ${deltaY * 0.45 - 35}px) scale(0.75) rotate(-8deg)`,
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(0.22) rotate(10deg)`,
          opacity: 0.25,
        },
      ],
      {
        duration: 850,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );

    flyAnim.onfinish = () => {
      boxContainer.remove();

      // Navbar-এর কার্ট সংখ্যা আপডেট
      window.dispatchEvent(new Event("cart-item-added"));

      // Cart Icon-এ বাউন্স ইফেক্ট
      cartIcon.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.38)" },
          { transform: "scale(0.9)" },
          { transform: "scale(1)" },
        ],
        { duration: 350, easing: "ease-out" }
      );

      onComplete?.();
    };
  }, 850);
};

export default function ShoeCard({ product, onAddToCart, className = '' }: ShoeCardProps) {
  const cardRef = useRef<HTMLElement>(null);

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

    // বক্সে প্যাকিং হয়ে উড়ে কার্টে যাওয়ার অ্যানিমেশন
    packAndFlyToCart(cardRef.current, activeColorway?.image, () => {
      if (typeof onAddToCart === 'function') {
        onAddToCart({
          product,
          colorway: activeColorway,
          size: selectedSize,
        });
      }
    });

    setTimeout(() => setIsAdded(false), 1800);
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
        ref={cardRef}
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