"use client";

import Image from "next/image";
import { Display } from "@/components/ui/Typography";
import Overlay from "@/components/ui/Overlay";
import Button from "../ui/Button";

type SearchOption = {
  value: string;
  label: string;
};

type ListingHeroProps = {
  title: string;
  image?: string;
  // Search bar - ab sab kuch reusable/configurable hai
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchOptions?: SearchOption[];
  buttonText?: string;
  onSearch?: (value: string) => void;
};

export default function ListingHero({
  title,
  image = "/images/listing-hero.jpg",
  showSearch = true,
  searchPlaceholder = "Search Destinations",
  searchOptions = [
    { value: "kashmir", label: "Kashmir, India" },
    { value: "bali", label: "Bali, Indonesia" },
    { value: "switzerland", label: "Switzerland" },
  ],
  buttonText = "Explore Trips",
  onSearch,
}: ListingHeroProps) {
  return (
    <section className="relative w-full h-64 sm:h-80 md:h-96 2xl:h-120 flex items-end pb-8 sm:pb-12">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Dark Overlay */}
      <Overlay variant="flat" className="bg-[#0B0B0B]/50" />

      {/* Content */}
      <div className="px-6 sm:px-10 md:px-16 w-full">
        <Display className=" md:max-w-lg 2xl:max-w-2xl leading-normal ">
          {title}
        </Display>

        {/* Search Bar - sirf tab dikhega jab showSearch true ho */}
        {showSearch && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mt-6">
            <div className="relative w-full sm:flex-1 sm:max-w-sm">
              <select
                className="w-full appearance-none bg-white/95 text-slate-700 font-body px-5 sm:px-5 py-2 sm:py-2 rounded-[10px] outline-none cursor-pointer text-sm sm:text-base"
                defaultValue=""
                onChange={(e) => onSearch?.(e.target.value)}
              >
                <option value="" disabled>
                  {searchPlaceholder}
                </option>
                {searchOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
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

            <Button variant="primary">{buttonText}</Button>
          </div>
        )}
      </div>
    </section>
  );
}