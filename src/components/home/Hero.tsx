"use client";

import Image from "next/image";
import { Display, P } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Overlay from "@/components/ui/Overlay";

export default function Hero() {
  return (
    <section className="relative w-full  md:min-h-150 min-h-screen md:h-screen flex items-center sm:items-center lg:items-end md:items-center 2xl:items-end pb-10 sm:pb-20 md:pb-32">
      {/* Background Image */}
      <Image
        src="/images/hero-img.png"
        alt="Alps Hotel & Travels - Scenic mountain view"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Dark Overlay */}
      <Overlay />

      {/* Content */}
      <div className="px-6 sm:px-10 md:px-16 w-full 2xl:max-w-3xl md:max-w-2xl">
        <Display className="mb-4 sm:mb-6">
          Start your unforgettable 
journey with us.
        </Display>

        <P className="text-[#FBFBFB] font-light mb-6 sm:mb-8 md:mb-10 max-w-xl text-sm sm:text-base">
          Discover breathtaking destinations, thoughtfully planned holidays and experiences made around the way you love to travel.
        </P>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <div className="relative w-full sm:flex-1 sm:max-w-sm">
            <select
              className="w-full appearance-none bg-white/95 text-slate-700 font-body px-5 sm:px-5 py-2 sm:py-2 rounded-[10px] outline-none cursor-pointer text-sm sm:text-base"
              defaultValue=""
            >
              <option value="" disabled>
                Search Destinations
              </option>
              <option value="kashmir">Kashmir, India</option>
              <option value="bali">Bali, Indonesia</option>
              <option value="switzerland">Switzerland</option>
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <Button variant="primary">
            Explore Trips
          </Button>
        </div>
      </div>
    </section>
  );
}