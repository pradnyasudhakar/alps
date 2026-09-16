"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Label, H2, Small, P, H4 } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import { FaMapMarkerAlt, FaHotel, FaUtensils, FaCamera } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Destination = {
  image: string;
  location: string;
  title: string;
  details1: string;
  details2: string;
  price: string;
};

const destinations: Destination[] = [
  {
    image: "/images/img-1.jpg",
    location: "Kashmir, India",
    title: "Kashmir With Vaishno Devi Heli Yatra",
    details1: "2N Katra · 2N Pahalgam · 1N Gulmarg · 2N Srinagar",
    details2: "7 Nights / 8 Days In 5 Star Hotel, Breakfast and Lunch Included",
    price: "₹46,600",
  },
  {
    image: "/images/img-2.jpg",
    location: "Kerela, India",
    title: "Explore Kerela With Taj Hotels",
    details1: "1N Kochi · 2N Munnar · 1N Kumarakom · 1N Varkala · 2N Kovalam",
    details2: "7 Nights / 8 Days In 5 Star Hotel, Breakfast and Lunch Included",
    price: "₹56,300",
  },
  {
    image: "/images/img-3.png",
    location: "Japan",
    title: "Japan Autumn Special",
    details1: "2N Tokyo · 2N Kyoto · 1N Osaka · 2N Hakone",
    details2: "7 Nights / 8 Days In 4 Star Hotel, Breakfast Included",
    price: "₹1,25,000",
  },
  {
    image: "/images/img-3.png",
    location: "Tokiyo",
    title: "Tokiyo Special",
    details1: "2N Tokyo · 2N Kyoto · 1N Osaka · 2N Hakone",
    details2: "7 Nights / 8 Days In 4 Star Hotel, Breakfast Included",
    price: "₹1,25,000",
  },
];

export default function TrendingSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = destinations.length;
  const current = destinations[index];

  const sideCards = [1, 2, 3].map(
    (offset) => destinations[(index + offset) % total]
  );

  const goNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const cardVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: dir > 0 ? 0.85 : 1.3,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: dir > 0 ? 0.7 : 1.1,
    }),
  };

  return (
    <section className="relative w-full min-h-140 md:min-h-140 2xl:min-h-180 overflow-hidden bg-slate-900">
      {/* Background Image - crossfade, faster now */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image src={current.image} alt={current.title} fill className="object-cover object-center" priority />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{ background: "rgba(6,12,20,0.42)" }}
      />

      <div
        className="absolute inset-y-0 left-0 z-2 pointer-events-none w-full lg:w-100 2xl:w-110 "
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-40 z-1 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(2,6,23,0.6) 0%, rgba(2,6,23,0) 100%)",
        }}
      />

      <div className="relative z-10 px-6 sm:px-10 md:px-16 pt-16 sm:pt-24 pb-10 flex flex-col lg:flex-row gap-8 md:gap-8 lg:gap-0 items-center lg:items-end">
        {/* Left: Details - fixed min-height to prevent layout jump */}
        <div className="flex-1 flex flex-col justify-center text-white max-w-full lg:max-w-md 2xl:max-w-md w-full">
          <div className="relative min-h-110 sm:min-h-105">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.title}
                custom={direction}
                initial={{ opacity: 0, y: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="flex items-center gap-1.5 mb-3 text-sm text-white/80">
                  <FaMapMarkerAlt className="w-4 h-4" />
                  <Label>{current.location}</Label>
                </div>

                <H2 className="max-w-full lg:max-w-60 font-light 2xl:max-w-80 tracking-wider 2xl:leading-snug text-2xl sm:text-3xl mb-4">
                  {current.title}
                </H2>

                <div className="w-full max-w-70 h-0.5 bg-white/60 mb-5" />

                <P className="font-body max-w-full lg:max-w-70 font-light text-sm text-[#FBFBFB] leading-relaxed mb-4">
                  {current.details1}
                </P>
                <P className="font-body max-w-full lg:max-w-70 font-light text-sm text-[#FBFBFB] leading-relaxed mb-6">
                  {current.details2}
                </P>

                {/* Icons - bigger now */}
                <div className="flex items-center gap-4 mb-6 text-[#FBFBFB]">
                  <MdFlight className="w-6 h-6 sm:w-6 sm:h-6 rotate-35" />
                  <FaHotel className="w-6 h-6 sm:w-6 sm:h-6" />
                  <FaUtensils className="w-6 h-6 sm:w-6 sm:h-6" />
                  <FaCamera className="w-6 h-6 sm:w-6 sm:h-6" />
                </div>

                {/* Price - bigger now */}
                <Small className="text-[#FBFBFB] font-light mb-3 block text-base sm:text-lg">
                  From <span className="font-semibold text-lg sm:text-xl">{current.price}</span> / person
                </Small>
                <div>
                  <Button variant="outline" href="/contact" >Enquire Now</Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Side Cards + Navigation */}
        <div className="flex-1 w-full flex flex-col">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-8">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              {sideCards.map((card, i) => (
                <motion.div
                  key={`${card.title}-${i}-${index}`}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.08 }}
                  className="relative rounded-[26px] overflow-hidden h-36 sm:h-48 2xl:h-86! md:h-64"
                >
                  <Image src={card.image} alt={card.title} fill className="object-cover object-center" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 65%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-4 2xl:p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <FaMapMarkerAlt className="w-4 h-4 sm:w-4 sm:h-4 text-white shrink-0" />
                      <span className="font-body text-base font-light text-white/80 truncate">
                        {card.location}
                      </span>
                    </div>
                    <H4 className="font-body max-w-55 text-white leading-snug line-clamp-2">
                      {card.title}
                    </H4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation - counter bigger now */}
          <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-6">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next slide"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 border-t border-0.5 border-[#FFFFFF]" />

            <span className="font-heading text-white text-2xl sm:text-3xl shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}