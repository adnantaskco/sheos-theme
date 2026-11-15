"use client";
import React from 'react';

export default function RecentPosts() {
  const sidePosts = [
    {
      title: "Eco-Friendly Footwear: Sustainable Style",
      date: "Oct 28 2024",
      comments: "0 comments",
      image: "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-1.png?v=1731500921&width=360",
      href: "http://localhost:3000/#"
    },
    {
      title: "The Ultimate Guide to Sneaker Care",
      date: "Oct 17 2024",
      comments: "0 comments",
      image: "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-6.png?v=1731500962&width=360",
      href: "http://localhost:3000/"
    },
    {
      title: "How to Style Your Favorite Sneakers",
      date: "Oct 17 2024",
      comments: "0 comments",
      image: "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-5.png?v=1731500994&width=360",
      href: "http://localhost:3000/#"
    }
  ];

  return (
    <section className="w-full py-12  bg-white text-neutral-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-amber-500 uppercase block mb-1">
            FROM THE BLOG
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-900 uppercase">
            Recently Our Posts
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 mt-2 max-w-xl">
            Sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Main Grid Layout: Left Large Featured Post & Right 3 Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Large Featured Post */}
          <div className="lg:col-span-7 group flex flex-col">
            <div className="relative w-full h-[280px] sm:h-[380px] md:h-[450px] rounded-xl overflow-hidden bg-neutral-100 shadow-sm">
              <a href="http://localhost:3000/#">
                <img 
                  src="https://qx-shooz.myshopify.com/cdn/shop/articles/blog-2.png?v=1731500928&width=900" 
                  alt="The Future Of Footwear" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </a>
              {/* Overlay metadata bar at bottom of image */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/60 to-transparent p-4 sm:p-6 text-white text-xs">
                <p className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-300 mb-1">
                  <span>Oct 28 2024</span>
                  <span>💬 0 comments</span>
                </p> 
                <h3 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors leading-snug">
                  <a href="http://localhost:3000/#">The Future Of Footwear: A Look Ahead</a>
                </h3>
              </div>
            </div>
          </div>

          {/* Right Side Posts List */}
          <div className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-5">
            {sidePosts.map((post, idx) => (
              <div key={idx} className="group flex items-center gap-3.5 sm:gap-4 pb-5 border-b border-neutral-100 last:border-0 last:pb-0">
                {/* Thumbnail */}
                <a href={post.href} className="shrink-0 w-24 h-20 sm:w-32 sm:h-28 rounded-lg overflow-hidden bg-neutral-100 block">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </a>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-neutral-400 mb-1">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>💬 {post.comments}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm md:text-base text-neutral-900 tracking-tight leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                    <a href={post.href}>{post.title}</a>
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}