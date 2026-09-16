"use client";

import { useRef } from "react";
import Image from "next/image";
import { H2, H4, P, Small } from "@/components/ui/Typography";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../ui/Button";
import Overlay from "../ui/Overlay";

type Package = {
  id: string;
  image: string;
  location: string;
  title: string;
  description: string;
  price: string;
};

const packages: Package[] = [
  {
    id: "1",
    image: "/images/best-1.jpg",
    location: "Jaisalmer, India",
    title: "Kashmir — Paradise in the Mountains",
    description: "5 nights and 4 days in 5 star hotel, breakfast included.",
    price: "₹50,000",
  },
  {
    id: "2",
    image: "/images/best-2.jpg",
    location: "Kerala, India",
    title: "Kerala — God’s Own Country",
    description: "5 nights and 4 days in 5 star hotel, breakfast included.",
    price: "₹50,000",
  },
  {
    id: "3",
    image: "/images/best-3.jpg",
    location: "Atlantis, UAE",
    title: "Dubai — The Pearl of the Gulf",
    description: "5 nights and 4 days in 5 star hotel, breakfast included.",
    price: "₹50,000",
  },
  {
    id: "4",
    image: "/images/best-4.jpg",
    location: "Merlion, Singapore",
    title: "Singapore — Island at the End",
    description: "5 nights and 4 days in 5 star hotel, breakfast included.",
    price: "₹50,000",
  },
  {
    id: "5",
    image: "/images/best-5.jpg",
    location: "Ban Luang, Thailand",
    title: "Thailand — The Land of the Free",
    description: "5 nights and 4 days in 5 star hotel, breakfast included.5 nights and 4 days in 5 star hotel, breakfast included.",
    price: "₹50,000",
  },
  {
    id: "6",
    image: "/images/best-6.jpg",
    location: "Bangkok, Thailand",
    title: "Thailand — The Land of Smiles",
    description: "5 nights and 4 days in 5 star hotel, breakfast included.",
    price: "₹50,000",
  },
  {
    id: "7",
    image: "/images/best-6.jpg",
    location: "Bangkok, Thailand",
    title: "Thailand — The Land of Smiles",
    description: "6 nights and 7 days in 4 star hotel, breakfast included.",
    price: "₹50,000",
  },
  {
    id: "8",
    image: "/images/best-6.jpg",
    location: "Bangkok, Thailand",
    title: "Thailand — The Land of Smiles",
    description: "6 nights and 7 days in 4 star hotel, breakfast included.",
    price: "₹45,000",
  },
];

export default function BestSellingPackages() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20 md:py-24">
      {/* Header */}
      <div className="flex px-6 sm:px-10 md:px-16  items-start justify-between mb-8 sm:mb-12 gap-4">
        <H2 className="relative text-[#0B0B0B] inline-block">
          Best Selling Packages
          <span className="block w-full max-w-[220px] sm:w-75 h-0.5 bg-slate-900 mt-2" />
        </H2>

        {/* Nav Arrows */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 mt-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6 sm:mx-0 sm:px-0"
      >
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="group relative shrink-0 w-50 sm:w-55 md:w-74 h-96 sm:h-96 rounded-2xl overflow-hidden snap-start cursor-pointer"
          >
            {/* Background Image */}
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

           {/* Overlay - #0F0F0F linear gradient, 0% se opaque tak, hover pe aur strong */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to top, #0F0F0F 0%, rgba(15,15,15,0.75) 35%, rgba(15,15,15,0.15) 65%, rgba(15,15,15,0) 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to top, #0F0F0F 0%, rgba(15,15,15,0.9) 45%, rgba(15,15,15,0.3) 75%, rgba(15,15,15,0) 100%)",
              }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              {/* Location - hamesha dikhta hai */}
              <div className="flex items-center font-light gap-1.5 mb-2 text-white/90 text-sm">
                <FaMapMarkerAlt className="w-3.5 h-3.5" />
                <span className="font-body">{pkg.location}</span>
              </div>

              {/* Title - hamesha dikhta hai */}
              <H4 className="text-white text-lg! font-normal mb-0 group-hover:mb-3 transition-all duration-300">
                {pkg.title}
              </H4>

              {/* Extra details - sirf hover par reveal hote hain */}
<div className="max-h-0 opacity-0 group-hover:max-h-56 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
  <P className="text-white/80 text-sm mb-3 leading-relaxed line-clamp-2">
    {pkg.description}
  </P>

  <Small className="text-white/70 mb-3 block">
    From <span className="font-semibold text-white">{pkg.price}</span>
  </Small>

  <Button variant="white" href={`/contact?packageId=${pkg.id}&packageTitle=${encodeURIComponent(pkg.title)}`}>
    DETAILS
  </Button>
</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}