"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { H2, H4 } from "@/components/ui/Typography";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Moment = {
  id: string;
  image: string;
  location: string;
  title: string;
};

const moments: Moment[] = [
  { id: "1", image: "/images/mom-1.png", location: "Uttarakhand, India", title: "Family Group Tour" },
  { id: "2", image: "/images/mom-2.png", location: "Kashmir, India", title: "Students trip to Srinagar" },
  { id: "3", image: "/images/mom-3.png", location: "Gulmarg, India", title: "Kashmir Group Tour 2024" },
  { id: "4", image: "/images/mom-4.png", location: "Phuket, Thailand", title: "Thailand Group Tour 2026" },
  { id: "5", image: "/images/mom-5.png", location: "Kerela, India", title: "Pvt Family Trip to Kerela" },
];

const AUTO_SLIDE_INTERVAL = 3500;

export default function MomentsStory() {
  const [centerIndex, setCenterIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = moments.length;

  const goNext = useCallback(() => {
    setCenterIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = () => {
    setCenterIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  const half = Math.floor(total / 2);
  const orderedMoments = Array.from({ length: total }, (_, i) => {
    const offset = i - half;
    const actualIndex = (centerIndex + offset + total) % total;
    return { ...moments[actualIndex], distance: offset };
  });

  return (
    <section
      className="py-16 sm:py-20 md:py-24 overflow-hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-start px-6 sm:px-10 md:px-16 justify-between mb-8 sm:mb-12 gap-4">
        <H2 className="relative text-[#0B0B0B] inline-block">
          Moments that tell a Story
          <span className="block w-full max-w-[220px] sm:w-75 h-0.5 bg-slate-900 mt-2" />
        </H2>

        <div className="hidden sm:flex items-center gap-3 shrink-0 mt-2">
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel - ab poori width use karta hai, edges bleed ho sakti hain, justify-center ki jagah scrollable row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 sm:gap-6 w-full overflow-x-auto scrollbar-hide  "
      >
        {orderedMoments.map((moment) => {
          const isCenter = moment.distance === 0;
          const absDistance = Math.abs(moment.distance);

          return (
            <div
              key={moment.id}
              onClick={() => {
                const realIndex = moments.findIndex((m) => m.id === moment.id);
                setCenterIndex(realIndex);
              }}
              className={`relative shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
                isCenter
                  ? "w-56 sm:w-72 md:w-80 lg:w-94 h-72 sm:h-105 md:h-125 z-10"
                  : absDistance === 1
                  ? "w-40 sm:w-52 md:w-60 lg:w-80 h-60 sm:h-80 md:h-96 opacity-80"
                  : "w-28 sm:w-36 md:w-44 lg:w-64 h-48 sm:h-64 md:h-80 opacity-50"
              }`}
            >
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                className="object-cover"
              />

              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" /> */}

              {absDistance <= 1 && (
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 mb-1 text-white/90 text-xs sm:text-sm">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span className="font-body">{moment.location}</span>
                  </div>
                  <H4 className={`text-white ${isCenter ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}>
                    {moment.title}
                  </H4>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}