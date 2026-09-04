"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { H2, P } from "@/components/ui/Typography";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  date: string;
  destination: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "I have quite high standards when it comes to holiday destinations, hotels and personalised service and have travelled a lot, but you exceeded my expectations across the board. Thank you for a truly amazing family holiday!",
    name: "EBF",
    date: "May 2026",
    destination: "Travelled to South Korea",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "From the moment we landed to the moment we left, everything was seamless. The itinerary was perfectly paced and every hotel recommendation was spot on. We'll definitely be booking with Alps again.",
    name: "R. Sharma",
    date: "March 2026",
    destination: "Travelled to Bali",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Our honeymoon was absolutely magical thanks to the Alps team. They took care of every little detail so we could just relax and enjoy our time together. Highly recommend.",
    name: "A. & K. Mehta",
    date: "January 2026",
    destination: "Travelled to Switzerland",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section className="relative w-full min-h-150 flex flex-col items-center justify-start pt-16 pb-12 px-6 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/testimonial.png"
        alt="Mountain landscape"
        fill
        className="object-cover -z-10"
      />

      {/* Light overlay - taaki text readable rahe halke background pe */}
      <div className="absolute inset-0 bg-white/40 -z-10" />

      {/* Content */}
      <div className="max-w-3xl text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <H2 className="mb-4 font-body text-[#0B0B0B] ">Probably the best trip we have ever had</H2>

            <P className="font-body  italic  mx-auto mb-4 ">
              &ldquo;{current.quote}&rdquo;
            </P>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: current.rating }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            <p className="font-heading text-[#555555] font-normal text-xl mb-1">
              {current.name} - {current.date}
            </p>
            <p className="font-body text-sm text-[#555555]">{current.destination}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Navigation */}
      <div className="flex items-center gap-2 mt-6 relative z-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index ? "w-2.5 h-2.5 bg-[#353535]" : "w-2 h-2 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}