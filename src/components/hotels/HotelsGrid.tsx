"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiWifi } from "react-icons/fi";
import { FaBed, FaBath, FaExpand, FaSmoking, FaParking, FaStar } from "react-icons/fa";
import Button from "../ui/Button";
import { IoBed, IoLocationOutline } from "react-icons/io5";
import { BiSolidBath } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

type ListingItem = {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  description: string;
  images: string[];
  rating: number;
};

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={i} className="w-3.5 h-3.5" />
      ))}
    </div>
  );
}

function ListingCard({ listing, onView }: { listing: ListingItem; onView: () => void }) {
  return (
    <div className="relative rounded-[20px] overflow-hidden flex flex-col justify-end p-5 md:min-h-110 2xl:min-h-140">
      <Image
        src={listing.images[0] || "/images/placeholder.jpg"}
        alt={listing.title}
        fill
        className="object-cover -z-10"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, #000000 100%)" }}
      />

      <div className="relative z-10">
        <h3 className="font-body text-white text-lg font-medium mb-1">{listing.title}</h3>
        <p className="font-body text-white text-sm font-light mb-3">{listing.location}</p>

        <div className="flex items-center gap-3 text-white mb-4 text-base">
          <span className="flex items-center gap-1">
            <IoBed className="w-7 h-7" /> 2 Beds
          </span>
          <span className="flex items-center gap-1">
            <BiSolidBath className="w-7 h-7" /> 2 Bath
          </span>
          <span className="flex items-center gap-1">
            <FaExpand className="w-6 h-6" /> 300sqm
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="font-body text-white text-sm">
            From <span className="font-semibold text-base">₹{listing.pricePerNight.toLocaleString("en-IN")}</span>
            <span className="text-white/60 text-xs"> / Night</span>
          </p>
          <Button variant="outline" onClick={onView} type="button">
            VIEW DETAILS
          </Button>
        </div>
      </div>
    </div>
  );
}

function ListingModal({ listing, onClose }: { listing: ListingItem; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  const activeImage = listing.images[activeIndex] || "/images/placeholder.jpg";

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6">
      <div className="relative bg-white rounded-xl max-w-5xl w-full max-h-[85vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
        >
          <FiX className="w-4 h-4 text-slate-900" />
        </button>

        <div className="p-8">
          <div className="relative w-full aspect-4/4 rounded-xl overflow-hidden mb-3">
            <Image src={activeImage} alt={listing.title} fill className="object-cover" />
          </div>

          <div
            ref={thumbRef}
            className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {listing.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveIndex(i)}
                className={`relative shrink-0 w-18 h-18 rounded-lg overflow-hidden border-2 snap-start ${
                  activeIndex === i ? "border-slate-900" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 pt-10 md:pt-5">
          <StarRating count={listing.rating} />
          <h2 className="font-body text-2xl text-slate-900 mt-2 mb-1">{listing.title}</h2>
          <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
            <IoLocationOutline className="w-4 h-4" /> {listing.location}
          </p>
          <p className="text-slate-900 mb-5">
            From <span className="font-semibold text-xl">₹{listing.pricePerNight.toLocaleString("en-IN")}</span>
            <span className="text-slate-500 text-sm"> / Night</span>
          </p>

          <h3 className="text-sm font-medium text-slate-900 mb-2">Description</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">{listing.description}</p>

          <h3 className="text-sm font-medium text-slate-900 mb-3">Key Features</h3>
          <div className="grid grid-cols-4 gap-y-3 gap-x-4 text-xs text-black mb-6">
            <span className="flex items-center gap-1.5"><FaBed className="w-4 h-4" /> 2 Beds</span>
            <span className="flex items-center gap-1.5"><FaBath className="w-4 h-4" /> 2 Bath</span>
            <span className="flex items-center gap-1.5"><FaExpand className="w-4 h-4" /> 300sqm</span>
            <span className="flex items-center gap-1.5"><FiWifi className="w-4 h-4" /> Wifi</span>
            <span className="flex items-center gap-1.5"><FaSmoking className="w-4 h-4" /> Smoking Area</span>
            <span className="flex items-center gap-1.5"><FaParking className="w-4 h-4" /> Parking Area</span>
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              href={`/contact?listingId=${listing.id}&packageTitle=${encodeURIComponent(listing.title)}`}
            >
              Enquire Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default function ListingsGrid({ listings = [] }: { listings?: ListingItem[] }) {
  const [selected, setSelected] = useState<ListingItem | null>(null);
  const [sortOption, setSortOption] = useState("default");
  const [visibleCount, setVisibleCount] = useState(9);

  const sortedListings = useMemo(() => {
    const list = [...listings];
    if (sortOption === "low-to-high") list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sortOption === "high-to-low") list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    return list;
  }, [listings, sortOption]);

  const visibleListings = sortedListings.slice(0, visibleCount);
  const hasMore = visibleCount < sortedListings.length;

  return (
    <section className="px-6 sm:px-10 md:px-16 py-8 sm:py-10">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <span>›</span>
        <span className="text-primary font-medium">Hotels</span>
      </div>

      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="font-heading text-2xl text-slate-900">Popular Listings</h2>

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

      {sortedListings.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-lg py-20 text-center">
          <p className="text-slate-500">Abhi koi listing nahi hai.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onView={() => setSelected(listing)} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => hasMore && setVisibleCount((c) => c + 9)}
              disabled={!hasMore}
              className="flex items-center gap-2 border border-primary text-primary px-6 py-2.5 rounded-md text-sm hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
            >
              Load More
              <FiChevronDown className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {selected && <ListingModal listing={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}