"use client";

import React from "react";

export default function ComfortMeetsFashion() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f4f0] py-20 md:py-32">
      {/* Subtle Giant Background Typography Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[110px] font-black uppercase tracking-tighter text-neutral-900/[0.080] sm:text-[170px] md:text-[230px]"
      >
        MOVEMENT
      </div>

      <div className="relative mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Side: Asymmetric Architectural Image Stage (7 Columns) */}
          <div className="relative lg:col-span-7">
            {/* Offset Decorative Frame */}
            <div className="absolute -bottom-4 -left-4 hidden h-full w-4/5 rounded-3xl sm:block" />

            {/* Main Editorial Image */}
            <div className="group relative h-[480px] w-full overflow-hidden rounded-3xl  sm:h-[520px] lg:w-[92%]">
              <img
                src="https://plain-apac-prod-public.komododecks.com/202611/16/ddwwIHsPwN1tNmb4ZM7O/image.png"
                alt="Comfort Meets Fashion Sneaker"
                className="h-full w-full "
              />
             

              {/* Top-Left Minimal Spec Tag */}
              {/* <div className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 backdrop-blur-md">
                Edition 04 / Ergonomic Series
              </div> */}
            </div>

            {/* Overlapping Floating Glass Spec Card */}
            {/* <div className="relative -mt-12 ml-auto mr-2 w-64 rounded-2xl border border-white/60 bg-white/85 p-5 shadow-xl backdrop-blur-xl sm:-mt-20 sm:mr-0 sm:w-72">
              <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                  Cushion Tech
                </span>
                <span className="h-2 w-2 rounded-full bg-[#722f37]" />
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-2xl font-black tracking-tight text-neutral-900">
                    240g
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Ultra-lightweight build
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black tracking-tight text-neutral-900">
                    24/7
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    All-day arch support
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Side: Uncommon Editorial Typography & Split CTA (5 Columns) */}
          <div className="flex flex-col justify-center lg:col-span-5 lg:pl-4">
            {/* Eyebrow with Line */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[1px] w-10 bg-[#722f37]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-500">
                Comfort Meets Fashion
              </span>
            </div>

            {/* Mixed Weight High-Contrast Headline */}
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl lg:leading-[1.1]">
              Designed to{" "}
              <span className="font-black italic text-neutral-900">
                turn heads,
              </span>{" "}
              built to feel{" "}
              <span className="underline decoration-[#722f37]/40 decoration-2 underline-offset-8">
                weightless.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Engineered with adaptive cloud-foam insoles and sculpted silhouettes—so you never have to choose between runway aesthetics and all-day comfort.
            </p>

            {/* Minimal Feature Pills */}
            <div className="mt-7 flex flex-wrap gap-2">
              {["Breathable Mesh", "Zero-Break-In", "Memory Sole"].map(
                (feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-neutral-300 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-neutral-700"
                  >
                    {feature}
                  </span>
                )
              )}
            </div>

            {/* Interactive Magnetic-Style Pill CTA */}
            <div className="mt-10 flex items-center gap-5">
              <a
                href="/"
                className="group inline-flex items-center gap-4 rounded-full bg-neutral-900 py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#722f37] hover:shadow-xl"
              >
                <span>Shop Collection</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm text-neutral-900 transition-transform duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}