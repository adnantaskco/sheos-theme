import React from 'react';

export default function RecentPosts() {
  const sidePosts = [
    {
      title: "Eco-Friendly Footwear: Sustainable Style",
      date: "Oct 28 2024",
      comments: "0 comments",
      image: "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-1.png?v=1731500921&width=360",
      href: "#"
    },
    {
      title: "The Ultimate Guide to Sneaker Care",
      date: "Oct 17 2024",
      comments: "0 comments",
      image: "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-6.png?v=1731500962&width=360",
      href: ""
    },
    {
      title: "How to Style Your Favorite Sneakers",
      date: "Oct 17 2024",
      comments: "0 comments",
      image: "https://qx-shooz.myshopify.com/cdn/shop/articles/blog-5.png?v=1731500994&width=360",
      href: "#"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-12 bg-white text-neutral-900">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-1">
            FROM THE BLOG
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900">
            Recently Our Posts
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 mt-2 max-w-xl">
            Sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Main Grid Layout: Left Large Featured Post & Right 3 Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Large Featured Post */}
          <div className="lg:col-span-7 group flex flex-col">
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] rounded-xl overflow-hidden bg-neutral-100 mb-5">
              <a href="#">
                <img 
                  src="https://qx-shooz.myshopify.com/cdn/shop/articles/blog-2.png?v=1731500928&width=900" 
                  alt="The Future Of Footwear" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </a>
              {/* Overlay metadata bar at bottom of image like the screenshot */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-transparent p-6 text-white  text-xs">
               <p className='flex items-center justify-between'><span>Oct 28 2024</span>
                <span>💬 0 comments</span></p> 
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#722f37] transition-colors">
              <a href="#">The Future Of Footwear: A Look Ahead</a>
            </h3>
              </div>
            </div>

            
          </div>

          {/* Right Side Posts List */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {sidePosts.map((post, idx) => (
              <div key={idx} className="group flex items-center gap-4 pb-6 border-b border-neutral-100 last:border-0 last:pb-0">
                {/* Thumbnail */}
                <a href={post.href} className="shrink-0 w-28 h-24 sm:w-32 sm:h-28 rounded-lg overflow-hidden bg-neutral-100 block">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </a>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 mb-1">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>💬 {post.comments}</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-neutral-900 tracking-tight leading-snug group-hover:text-[#722f37] transition-colors">
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