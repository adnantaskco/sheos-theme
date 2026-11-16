
"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

interface Category {
  name: string;
  image: string;
  count: string;
}

interface BubbleCategoriesProps {
  onSelect?: (category: Category) => void;
}

const categories: Category[] = [
  {
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    count: "24 Products",
  },
  {
    name: "Running",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700",
    count: "18 Products",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700",
    count: "32 Products",
  },
  {
    name: "Casual",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700",
    count: "16 Products",
  },
  {
    name: "Formal",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=700",
    count: "12 Products",
  },
  {
    name: "Boots",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=700",
    count: "20 Products",
  },
  {
    name: "Loafers",
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=700",
    count: "14 Products",
  },
  {
    name: "Sandals",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=700",
    count: "10 Products",
  },
];

const total = categories.length;
const loopCategories = [...categories, ...categories, ...categories];

interface DragState {
  active: boolean;
  startX: number;
  scrollLeft: number;
}

export default function BubbleCategories({
  onSelect,
}: BubbleCategoriesProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });

  const draggedRef = useRef(false);
  const dragTimerRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const [active, setActive] = useState(total + 2);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate actual visual center of an item
  const centerItem = (
    index: number,
    behavior: ScrollBehavior = "smooth"
  ) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const item = slider.children[index] as HTMLElement | undefined;
    if (!item) return;

    const sliderRect = slider.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const sliderCenter = sliderRect.left + sliderRect.width / 2;
    const itemCenter = itemRect.left + itemRect.width / 2;

    const difference = itemCenter - sliderCenter;

    slider.scrollTo({
      left: slider.scrollLeft + difference,
      behavior,
    });

    setActive(index);
  };

  // Initial center position and resize correction
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const initialIndex = total + 2;

    const frame = requestAnimationFrame(() => {
      centerItem(initialIndex, "instant");
    });

    const observer = new ResizeObserver(() => {
      centerItem(active, "instant");
    });

    observer.observe(slider);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
    // Initial positioning and resize observation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect centered item and maintain infinite loop
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (scrollFrameRef.current !== null) {
      cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = requestAnimationFrame(() => {
      const sliderRect = slider.getBoundingClientRect();
      const sliderCenter = sliderRect.left + sliderRect.width / 2;

      let closest = 0;
      let minDistance = Infinity;

      Array.from(slider.children).forEach((child, index) => {
        const item = child as HTMLElement;
        const rect = item.getBoundingClientRect();

        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(sliderCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });

      let target = closest;

      // Reposition into middle copy for infinite scrolling
      if (closest < total) {
        target = closest + total;
      } else if (closest >= total * 2) {
        target = closest - total;
      }

      if (target !== closest) {
        const currentItem = slider.children[closest] as HTMLElement;
        const targetItem = slider.children[target] as HTMLElement;

        const currentRect = currentItem.getBoundingClientRect();
        const targetRect = targetItem.getBoundingClientRect();

        slider.scrollLeft += targetRect.left - currentRect.left;
      }

      setActive(target);
    });
  };

  // Pointer drag start
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;

    if (!slider || (e.pointerType === "mouse" && e.button !== 0)) {
      return;
    }

    if (dragTimerRef.current !== null) {
      window.clearTimeout(dragTimerRef.current);
      dragTimerRef.current = null;
    }

    dragRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: slider.scrollLeft,
    };

    draggedRef.current = false;
    setIsDragging(true);

    slider.setPointerCapture(e.pointerId);
  };

  // Pointer drag movement
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !sliderRef.current) return;

    const distance = e.clientX - dragRef.current.startX;

    if (Math.abs(distance) > 5) {
      draggedRef.current = true;
    }

    sliderRef.current.scrollLeft =
      dragRef.current.scrollLeft - distance;
  };

  // Pointer drag end
  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;

    if (slider?.hasPointerCapture(e.pointerId)) {
      slider.releasePointerCapture(e.pointerId);
    }

    dragRef.current.active = false;
    setIsDragging(false);

    if (dragTimerRef.current !== null) {
      window.clearTimeout(dragTimerRef.current);
    }

    dragTimerRef.current = window.setTimeout(() => {
      draggedRef.current = false;
      dragTimerRef.current = null;
    }, 180);
  };

  // Category selection
  const handleSelect = (category: Category, index: number) => {
    if (draggedRef.current) return;

    centerItem(index);
    onSelect?.(category);
  };

  const activeCategory = loopCategories[active] || categories[0];

  return (
    <section className="relative w-full overflow-hidden bg-[#F8F7F4] py-10 md:py-16">
      <div className="mx-auto w-full max-w-[1600px]">

        {/* Header */}
        <div className="mx-auto mb-6 max-w-xl px-4 text-center md:mb-14">
          <span className="inline-block text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-400 sm:text-[11px]">
            Curated Footwear
          </span>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:mt-3 sm:text-4xl md:text-5xl">
            Shop by Category
          </h2>

          <div className="mx-auto mt-3 h-px w-10 bg-neutral-300 sm:mt-5 sm:w-12" />
        </div>

        {/* Carousel */}
        <div className="relative w-full">

          {/* Side Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-gradient-to-r from-[#F8F7F4] to-transparent sm:w-16 md:w-24" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-3 bg-gradient-to-l from-[#F8F7F4] to-transparent sm:w-16 md:w-24" />

          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onLostPointerCapture={() => {
              dragRef.current.active = false;
              setIsDragging(false);
            }}
            className={`flex w-full items-center gap-2 overflow-x-auto py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-6 md:gap-10 md:py-8 ${
              isDragging
                ? "cursor-grabbing snap-none"
                : "cursor-grab snap-x snap-mandatory"
            }`}
            style={{
              paddingInline:
                "calc((100% - 62px) / 2)",
              touchAction: "pan-x",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {loopCategories.map((category, index) => {
              const distance = Math.abs(index - active);
              const isCenter = distance === 0;

              const scaleClass =
                distance >= 3
                  ? "z-[1] scale-[0.52] opacity-20 md:scale-[0.55]"
                  : distance === 2
                  ? "z-[2] scale-[0.72] opacity-60 md:scale-[0.68] md:opacity-40"
                  : distance === 1
                  ? "z-[5] scale-[0.88] opacity-85 md:scale-[0.86] md:opacity-75"
                  : "z-10 scale-[1.14] opacity-100 md:scale-[1.12]";

              return (
                <button
                  type="button"
                  key={`${category.name}-${index}`}
                  onClick={() => handleSelect(category, index)}
                  aria-label={`Explore ${category.name}`}
                  aria-pressed={isCenter}
                  className={`group flex flex-none snap-center flex-col items-center border-none bg-transparent outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${scaleClass}`}
                >
                  {/* Bubble */}
                  <div
                    className={`relative h-[62px] w-[62px] overflow-hidden rounded-full bg-white transition-shadow duration-500 sm:h-[140px] sm:w-[140px] md:h-[230px] md:w-[230px] ${
                      isCenter
                        ? "shadow-[0_12px_25px_-8px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.05)] md:shadow-[0_22px_45px_-12px_rgba(0,0,0,0.2)]"
                        : "shadow-[0_8px_16px_-6px_rgba(0,0,0,0.14)] md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)]"
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      draggable={false}
                      className={`h-full w-full object-cover transition-transform duration-700 ${
                        isCenter ? "group-hover:scale-105" : ""
                      }`}
                    />

                    <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_2px_6px_rgba(255,255,255,0.7),inset_0_-8px_20px_rgba(0,0,0,0.08)]" />
                  </div>

                  {/* Label */}
                  <div
                    className={`mt-2.5 text-center transition-all duration-300 sm:mt-4 md:mt-6 ${
                      isCenter
                        ? "translate-y-0 opacity-100"
                        : "translate-y-0.5 opacity-60 md:opacity-45"
                    }`}
                  >
                    <h3 className="text-[10px] font-medium tracking-wide text-neutral-900 sm:text-sm md:text-base">
                      {category.name}
                    </h3>

                    <p
                      className={`mt-0.5 hidden text-[9px] uppercase tracking-[0.15em] text-neutral-400 sm:block sm:text-[11px] ${
                        isCenter ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {category.count}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-5 flex flex-col items-center justify-center sm:mt-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => centerItem(active - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-xs text-neutral-600 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white sm:h-10 sm:w-10"
              aria-label="Previous Category"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => onSelect?.(activeCategory)}
              className="rounded-full bg-neutral-900 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-neutral-800 sm:px-7 sm:py-2.5 sm:text-xs"
            >
              Explore {activeCategory.name}
            </button>

            <button
              type="button"
              onClick={() => centerItem(active + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-xs text-neutral-600 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white sm:h-10 sm:w-10"
              aria-label="Next Category"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
