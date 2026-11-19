"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ShoeCard, { type ShoeProduct } from "@/app/Components/productcard";
import { NikeProductData } from "@/lib/DataNikeBrand";
import { FemaleProductData } from "@/lib/ladiesdata";
import { AllroductData } from "@/lib/AllProduct";

import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Plus,
  Minus,
  Check,
} from "lucide-react";

// সব ডাটা সোর্স একসাথে মার্জ করে ডুপ্লিকেট (same slug/id) রিমুভ করা হলো
const MERGED_PRODUCTS: ShoeProduct[] = (() => {
  const combined = [
    ...(AllroductData as ShoeProduct[]),
    ...(NikeProductData as ShoeProduct[]),
    ...(FemaleProductData as ShoeProduct[]),
  ];

  const uniqueMap = new Map<string, ShoeProduct>();
  combined.forEach((item) => {
    if (item) {
      const key = item.slug || item.id;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    }
  });

  return Array.from(uniqueMap.values());
})();

export default function ProductDetailsPage() {
  // Next.js App Router-এ Client Component থেকে URL-এর [slug] ধরার সবচেয়ে নিরাপদ উপায়
  const routeParams = useParams();
  const slugParam = useMemo(() => {
    const rawSlug = routeParams?.slug;
    if (Array.isArray(rawSlug)) return decodeURIComponent(rawSlug[0]);
    if (typeof rawSlug === "string") return decodeURIComponent(rawSlug);
    return "";
  }, [routeParams]);

  // স্লাগ বা আইডি অনুযায়ী প্রোডাক্ট খোঁজা
  const product = useMemo(() => {
    if (slugParam) {
      const found = MERGED_PRODUCTS.find(
        (p) =>
          p.slug?.toLowerCase() === slugParam.toLowerCase() ||
          p.id?.toLowerCase() === slugParam.toLowerCase()
      );
      if (found) return found;
    }
    return MERGED_PRODUCTS[0];
  }, [slugParam]);

  // States
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  // অন্য প্রোডাক্টে নেভিগেট করলে (যেমন নিচের কার্ডে ক্লিক করলে) স্টেটগুলো রিসেট হবে
  useEffect(() => {
    if (product) {
      setSelectedColorId(
        product.defaultColorwayId || product.colorways?.[0]?.id || ""
      );
      setSelectedSize(product.defaultSize || product.sizes?.[0] || "");
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  // বর্তমান সিলেক্টেড কালারওয়ে বের করা
  const activeColorway = useMemo(() => {
    return (
      product?.colorways?.find((c) => c.id === selectedColorId) ||
      product?.colorways?.[0]
    );
  }, [product, selectedColorId]);

  // কালারওয়ে থেকে গ্যালারি ইমেজ লিস্ট তৈরি
  const galleryImages = useMemo(() => {
    const mainImg =
      activeColorway?.image ||
      (activeColorway as any)?.images?.[0] ||
      "/placeholder-shoe.png";

    const extraImages = (activeColorway as any)?.images;
    if (Array.isArray(extraImages) && extraImages.length > 0) {
      return extraImages;
    }

    // অন্যান্য কালারওয়ের ছবিগুলো থাম্বনেইল হিসেবে দেখানো
    const allColorImages = product?.colorways
      ?.map((c) => c.image || (c as any)?.images?.[0])
      .filter(Boolean);

    return allColorImages?.length
      ? Array.from(new Set([mainImg, ...allColorImages]))
      : [mainImg];
  }, [activeColorway, product]);

  // ১. Same Brand Products (বর্তমান প্রোডাক্ট বাদে একই ব্র্যান্ডের প্রোডাক্ট)
  const sameBrandProducts = useMemo(() => {
    if (!product) return [];
    return MERGED_PRODUCTS.filter(
      (item) =>
        item.brand?.toLowerCase() === product.brand?.toLowerCase() &&
        item.id !== product.id &&
        item.slug !== product.slug
    ).slice(0, 4);
  }, [product]);

  // ২. Suggested Products (অন্যান্য ব্র্যান্ড বা ক্যাটাগরির প্রোডাক্ট)
  const suggestedProducts = useMemo(() => {
    if (!product) return [];
    const others = MERGED_PRODUCTS.filter(
      (item) =>
        item.id !== product.id &&
        item.slug !== product.slug &&
        item.brand?.toLowerCase() !== product.brand?.toLowerCase()
    );

    if (others.length < 4) {
      const remaining = MERGED_PRODUCTS.filter(
        (item) => item.id !== product.id && item.slug !== product.slug
      );
      return remaining.slice(0, 4);
    }
    return others.slice(0, 4);
  }, [product]);

  const handleColorChange = (colorId: string) => {
    setSelectedColorId(colorId);
    setActiveImageIndex(0);
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      product,
      colorway: activeColorway,
      size: selectedSize,
      quantity,
    };
    console.log("Added to Cart:", cartItem);

    // Navbar-এর কার্ট আইকন আপডেটের জন্য ইভেন্ট ফায়ার করা
    window.dispatchEvent(new Event("cart-item-added"));

    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-neutral-500">
        <p className="text-lg font-semibold">Product not found.</p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-black transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full bg-white text-neutral-900 pt-20 sm:pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100 bg-neutral-50/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 text-xs font-medium text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="uppercase tracking-wider text-neutral-400">
            {product.brand}
          </span>
          <span>/</span>
          <span className="text-neutral-900 font-semibold truncate">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Image Gallery (7 Columns on Desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[580px] no-scrollbar">
                {galleryImages.map((imgUrl: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-neutral-100 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-amber-500 ring-2 ring-amber-500/20"
                        : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Hero Image */}
            <div className="relative flex-1 bg-neutral-100 rounded-2xl overflow-hidden aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center group">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to wishlist"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-neutral-700"
                  }`}
                />
              </button>

              <img
                src={galleryImages[activeImageIndex] || galleryImages[0]}
                alt={product.title}
                className="w-full h-full object-contain p-6 sm:p-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right: Product Info & Actions (5 Columns on Desktop) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Brand & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
                {product.brand}
              </span>

              <div className="flex items-center gap-1.5 text-sm">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="font-bold">{product.rating}</span>
                <span className="text-neutral-400">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase mt-2">
              {product.title}
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base mt-1">
              {product.subtitle}
            </p>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-black text-neutral-900">
                ${product.price.toFixed(2)}
              </span>
              {product.shippingNote && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {product.shippingNote}
                </span>
              )}
            </div>

            <hr className="my-6 border-neutral-200" />

            {/* Colorway Selector (ShoeCard-এর swatchStyle অনুযায়ী আপডেট করা) */}
            {product.colorways && product.colorways.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="font-bold uppercase tracking-wider text-xs text-neutral-500">
                    Colorway
                  </span>
                  <span className="font-semibold text-neutral-900">
                    {activeColorway?.name || selectedColorId}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.colorways.map((color) => {
                    const isSelected = color.id === selectedColorId;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => handleColorChange(color.id)}
                        title={color.name}
                        className={`w-10 h-10 rounded-full p-0.5 border-2 transition-all ${
                          isSelected
                            ? "border-amber-500 scale-110"
                            : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <span
                          className="block w-full h-full rounded-full border border-black/10"
                          style={{
                            background:
                              color.swatchStyle ||
                              (color as any).hex ||
                              "#171717",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold uppercase tracking-wider text-xs text-neutral-500">
                    Select Size (US)
                  </span>
                  <button
                    type="button"
                    className="text-xs font-semibold underline text-neutral-600 hover:text-black"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${
                          isSelected
                            ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                            : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-900"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {/* Quantity Box */}
              <div className="flex items-center justify-between sm:justify-center border border-neutral-300 rounded-full px-4 py-3 sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-base px-4">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-8 rounded-full font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                  addedFeedback
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-900 text-white hover:bg-amber-500 hover:text-black"
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Bag — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-2 pt-5 border-t border-neutral-100 text-center">
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-neutral-50">
                <Truck className="w-4 h-4 text-amber-500" />
                <span className="text-[11px] font-semibold text-neutral-700">
                  Fast Delivery
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-neutral-50">
                <RotateCcw className="w-4 h-4 text-amber-500" />
                <span className="text-[11px] font-semibold text-neutral-700">
                  30-Day Returns
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-neutral-50">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span className="text-[11px] font-semibold text-neutral-700">
                  100% Authentic
                </span>
              </div>
            </div>

            {/* Product Accordions */}
            <div className="mt-6 divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {/* Description */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "details" ? null : "details"
                    )
                  }
                  className="w-full py-4 flex items-center justify-between text-left font-bold text-sm uppercase tracking-wider"
                >
                  <span>Product Details</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "details" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "details" && (
                  <p className="pb-4 text-sm text-neutral-600 leading-relaxed">
                    Engineered for all-day comfort and street-ready style. The{" "}
                    <strong className="text-neutral-900">{product.title}</strong>{" "}
                    features breathable upper mesh, responsive foam cushioning,
                    and a high-traction rubber outsole built to handle every step.
                  </p>
                )}
              </div>

              {/* Shipping & Returns */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "shipping" ? null : "shipping"
                    )
                  }
                  className="w-full py-4 flex items-center justify-between text-left font-bold text-sm uppercase tracking-wider"
                >
                  <span>Shipping & Free Returns</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <p className="pb-4 text-sm text-neutral-600 leading-relaxed">
                    Standard delivery takes 2–4 business days. Unworn items in
                    original packaging can be returned or exchanged within 30 days
                    of delivery at no extra cost.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: MORE FROM SAME BRAND
      ========================================================== */}
      {sameBrandProducts.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-14 border-t border-neutral-200">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Official Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                More From {product.brand}
              </h2>
            </div>
            <Link
              href={`/brands/${product.brand.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-wider underline hover:text-amber-500 transition-colors"
            >
              View All {product.brand}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sameBrandProducts.map((item) => (
              <div
                key={item.id}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <ShoeCard
                  product={item}
                  onAddToCart={(addedItem) =>
                    console.log("Added same-brand product:", addedItem)
                  }
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================
          SECTION 3: SUGGESTED PRODUCTS (YOU MAY ALSO LIKE)
      ========================================================== */}
      {suggestedProducts.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-14 border-t border-neutral-200">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Curated For You
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                You May Also Like
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {suggestedProducts.map((item) => (
              <div
                key={item.id}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <ShoeCard
                  product={item}
                  onAddToCart={(addedItem) =>
                    console.log("Added suggested product:", addedItem)
                  }
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}