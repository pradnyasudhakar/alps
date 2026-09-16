"use client";

import { useState } from "react";
import Image from "next/image";
import { H2, H3, P } from "@/components/ui/Typography";
import { FiChevronRight } from "react-icons/fi";

type Theme = {
  id: string;
  image: string;
  label: string;
  description?: string;
};

const themes: Theme[] = [
  {
    id: "1",
    image: "/images/insp-1.jpg",
    label: "Spiritual",
    description: "Discover sacred destinations that calm the soul.",
  },
  {
    id: "2",
    image: "/images/insp-2.jpg",
    label: "Honeymoon",
    description: "Celebrate love with dreamy honeymoon getaways.",
  },
  {
    id: "3",
    image: "/images/insp-3.jpg",
    label: "Leisure",
    description: "Slow down and unwind at the world's most relaxing spots.",
  },
  {
    id: "4",
    image: "/images/insp-4.jpg",
    label: "Adventure",
    description: "Chase adrenaline across land, sea, and sky.",
  },
  {
    id: "5",
    image: "/images/insp-5.jpg",
    label: "Wildlife",
    description: "Get closer to nature's most magnificent creatures.",
  },
];

export default function ExploreThemes() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-24">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <H2 className="mb-3 relative text-[#0B0B0B] inline-block">
          Explore Themes that Inspire Travel
          <span className="block w-full max-w-55 sm:w-75 h-0.5 bg-slate-900 mt-2" />
        </H2>
      </div>

      {/* Accordion Cards - onMouseLeave poore row par, taaki mouse hatte hi card 1 par reset ho */}
     <div
  className="flex gap-2 sm:gap-3 h-100 sm:h-125 md:h-100 2xl:h-120"
  onMouseLeave={() => setActiveIndex(0)}
>
  {themes.map((theme, index) => {
    const isActive = index === activeIndex;
    return (
      <div
        key={theme.id}
        onMouseEnter={() => setActiveIndex(index)}
        className={`relative transition-[flex-grow] duration-500 ease-in-out rounded-[20px] overflow-hidden cursor-pointer min-w-0 ${
          isActive ? "flex-[2.30]" : "flex-1"
        }`}
      >
              {/* Background Image */}
              <Image
                src={theme.image}
                alt={theme.label}
                fill
                className="object-cover"
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Collapsed state: vertical rotated label */}
              <div
                className={`absolute inset-0 flex items-end p-6 transition-opacity duration-300 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              >
                <span
                  className="text-white font-body text-2xl sm:text-3xl font-semibold whitespace-nowrap"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {theme.label}
                </span>
              </div>

              {/* Expanded state: horizontal content */}
              <div
                className={`absolute inset-0 flex flex-col justify-end p-6 sm:p-8 transition-opacity duration-300 ${
                  isActive ? "opacity-100 delay-150" : "opacity-0"
                }`}
              >
                <H3 className="text-white font-light leading-normal tracking-wider mb-2 whitespace-nowrap">{theme.label}</H3>
                {theme.description && (
                  <P className="text-white/85 font-body text-sm mb-4 max-w-xs">
                    {theme.description}
                  </P>
                )}
                <button className="inline-flex items-center gap-1.5 border border-white text-white text-sm font-body px-4 py-2 rounded-xl hover:bg-white hover:text-slate-900 transition-colors w-fit">
                  Know More
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}