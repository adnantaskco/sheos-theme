"use client"
import React, { useState } from 'react';

const HeroSection: React.FC = () => {
  const videoUrls = ["/hero.mp4"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideoUrl = videoUrls[currentVideoIndex];

  return (
    // Fixed navbar-er niche padding thik rakhe container toiri kora holo
    <section className="relative isolate w-full pt-[90px] sm:pt-[110px] bg-neutral-950 flex items-center justify-center overflow-hidden">
      
      {/* Video Wrapper with proper aspect ratio container to remove bottom blank space */}
      <div className="w-full relative overflow-hidden aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1]">
        <video
          key={currentVideoUrl}
          autoPlay
          loop={videoUrls.length === 1}
          muted
          playsInline
          // @ts-ignore - webkitPlaysInline is needed for older iOS Safari support
          webkit-playsinline="true"
          onEnded={() =>
            setCurrentVideoIndex((index) => (index + 1) % videoUrls.length)
          }
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src={currentVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none z-10" />
      </div>

    </section>
  );
};

export default HeroSection;