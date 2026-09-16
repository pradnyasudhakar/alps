"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdFlight } from "react-icons/md";
import { FaHotel, FaCamera, FaUtensils } from "react-icons/fa";
import Button from "../ui/Button";
import { FiChevronDown } from "react-icons/fi";
import { H4 } from "../ui/Typography";

type PackageItem = {
  id: string;
  image: string;
  duration: string;
  tourType: string;
  title: string;
  route: string;
  price: number;
  category: string;
};

function PackageCard({ pkg }: { pkg: PackageItem }) {
  return (
    <div className="relative rounded-[20px] overflow-hidden flex flex-col justify-end p-5 md:min-h-110 2xl:min-h-140">
      <Image
        src={pkg.image || "/images/placeholder.jpg"}
        alt={pkg.title}
        fill
        className="object-cover -z-10"
      />
     <div
  className="absolute inset-0 -z-10"
  style={{
    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%)",
  }}

      />

      <div className=" mb-3 flex items-center gap-2">
        <span className="bg-white backdrop-blur-sm border border-white/50 text-primary md:text-xs 2xl:text-sm font-body font-light px-3 py-1 rounded-full">
          {pkg.duration}
        </span>
        <span className="bg-white backdrop-blur-sm border border-white/50 text-primary  md:text-xs 2xl:text-sm font-body font-light px-3 py-1 rounded-full">
          {pkg.tourType}
        </span>
      </div>

      <div className="relative z-10">
        <H4 className="font-body text-white text-base font-normal mb-3 line-clamp-2">
          {pkg.title}
        </H4>
        <p className="font-body text-[#FBFBFB] font-light text-[16px] mb-3 max-w-75  ">{pkg.route}</p>

        {/* Static icons — sab cards pe hamesha same rahenge */}
        <div className="flex items-center gap-3 text-white/90 mb-4">
          <MdFlight className="w-7 h-7 rotate-45" />
          <FaHotel className="w-7 h-7" />
          <FaUtensils className="w-7 h-7" />
          <FaCamera className="w-7 h-7" />
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="font-body text-white font-light text-base">
            From <span className="font-medium text-xl">₹{pkg.price.toLocaleString("en-IN")}</span>
            <span className="text-white text-base"> / person</span>
          </p>

          <Button
            variant="outline"
            href={`/contact?packageId=${pkg.id}&packageTitle=${encodeURIComponent(pkg.title)}`}
          >
            CONTACT
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PackagesGrid({
  packages = [],
  category = "All Packages",
}: {
  packages?: PackageItem[];
  category?: string;
}) {
  const [sortOption, setSortOption] = useState("default");

  const sortedPackages = useMemo(() => {
    const list = [...packages];
    if (sortOption === "low-to-high") list.sort((a, b) => a.price - b.price);
    if (sortOption === "high-to-low") list.sort((a, b) => b.price - a.price);
    return list;
  }, [packages, sortOption]);

  return (
    <section className="px-6 sm:px-10 md:px-16 py-8 sm:py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <span>›</span>
        <span className="text-primary font-medium">{category}</span>
      </div>

      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <p className="font-body text-slate-900 text-2xl font-normal">
          {packages.length} {packages.length === 1 ? "Package" : "Packages"}
        </p>

        <div className="flex items-center gap-2 text-base text-primary">
          <span>Sort By :</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="font-body text-sm outline-none border-none bg-transparent cursor-pointer text-black/50 font-medium"
          >
            <option value="default">Select an option</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {sortedPackages.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-lg py-20 text-center">
          <p className="text-slate-500">Is category me abhi koi package nahi hai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </section>
  );
}