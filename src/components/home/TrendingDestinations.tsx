"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { H2, P } from "@/components/ui/Typography";

type Destination = {
  id: string;
  image: string;
  title: string;
  location: string;
};

const destinations: Destination[] = [
  { id: "1", image: "/images/eclips-1.png", title: "Heaven on Earth", location: "Kashmir, India" },
  { id: "2", image: "/images/eclips-2.png", title: "God's Own Country", location: "Kerela, India" },
  { id: "3", image: "/images/eclips-3.png", title: "Beachside Escape", location: "Goa, India" },
  { id: "4", image: "/images/eclips-4.png", title: "Royal India", location: "Rajasthan, India" },
  { id: "5", image: "/images/eclips-5.png", title: "Island Escape", location: "Andaman, India" },
  { id: "6", image: "/images/eclips-6.png", title: "Land of High Passes", location: "Ladakh, India" },
  { id: "7", image: "/images/eclips-7.png", title: "Himalayan Retreat", location: "Sikkim, India" },
  { id: "8", image: "/images/eclips-8.png", title: "Royal Heritage", location: "Mysore, India" },
];

export default function TrendingDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const [dragging, setDragging] = useState(false);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    setDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const onMouseLeaveOrUp = () => {
    isDragging.current = false;
    setDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const onCardClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
    }
  };

  return (
    <section className="px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div className="2xl:max-w-3xl max-w-2xl">
          <H2 className="mb-3 relative text-[#0B0B0B] inline-block">
            Trending Destinations
            <span className="block w-full max-w-55 sm:w-75 h-0.5 bg-slate-900 mt-2" />
          </H2>
          <P className="mt-2 text-[#555555]">
            Explore the places travellers are dreaming about right now — from mountain escapes and tropical islands to vibrant cities and unforgettable cultural experiences.
          </P>
        </div>

        {/* Nav Arrows */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 mt-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Cards - draggable */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeaveOrUp}
        onMouseUp={onMouseLeaveOrUp}
        onMouseMove={onMouseMove}
        className={`flex gap-4 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 select-none ${
          dragging ? "cursor-grabbing scroll-auto" : "cursor-grab"
        }`}
      >
        {destinations.map((dest) => (
          <Link
            key={dest.id}
            href="/listing"
            onClick={onCardClick}
            className="group relative shrink-0 w-44 h-60 sm:w-56 sm:h-72 md:w-60 md:h-72 rounded-[50%] overflow-hidden snap-start"
          >
            <Image
              src={dest.image}
              alt={dest.title}
              fill
              draggable={false}
              className="object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
            />

            {/* Bottom-only gradient overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              style={{
                background: "linear-gradient(to bottom, rgba(23,36,50,0) 0%, #2C2C2C 100%)",
              }}
            />

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-center">
              <p className="font-body text-[#FFFFFF] text-sm sm:text-base font-normal mb-1">
                {dest.title}
              </p>
              <div className="flex items-center justify-center gap-1 text-[#FFFFFF] text-[10px] sm:text-xs">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-body">{dest.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}