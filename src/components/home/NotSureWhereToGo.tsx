"use client";

import { useState } from "react";
import { H2, P } from "@/components/ui/Typography";
import DestinationCard from "@/components/ui/DestinationCard";

const filters = ["By Experience", "By Traveler"];

const cardsData = {
  "By Experience": [
    { title: "Beach Escapes", image: "/images/alps-1.png" },
    { title: "Mountain Retreats", image: "/images/alps-2.png" },
    { title: "Wildlife & Safari", image: "/images/alps-3.png" },
    { title: "Northern Lights", image: "/images/alps-4.png" },
    { title: "City Escapes", image: "/images/alps-5.png" },
    { title: "Snow & Ski", image: "/images/alps-6.png" },
  ],
  "By Traveler": [
    { title: "Solo Adventures", image: "/images/alps-1.png" },
    { title: "Family Getaways", image: "/images/alps-1.png" },
    { title: "Honeymoon Specials", image: "/images/alps-1.png" },
    { title: "Group Tours", image: "/images/alps-1.png" },
    { title: "Luxury Escapes", image: "/images/alps-1.png" },
    { title: "Budget Trips", image: "/images/alps-1.png" },
  ],
};

export default function NotSureWhereToGo() {
  const [activeFilter, setActiveFilter] = useState<keyof typeof cardsData>("By Experience");

  return (
    <section className="px-6 sm:px-10 md:px-16 py-24">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20  ">
        {/* Left: Text + Filters */}
        <div className="lg:w-90 2xl:w-120! shrink-0">
          <H2 className="mb-4 text-[#0B0B0B]  ">Not Sure Where To Go?
            <span className="block w-full h-0.5 bg-slate-900 mt-3" />
          </H2>
          <P className="mb-6 font-light ">
            An insight the incredible experience in the world. An insight the
            incredible experience in the world.
          </P>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as keyof typeof cardsData)}
                className={`font-body text-sm px-5 py-2 rounded-full border transition-colors ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-transparent text-slate-700 border-slate-300 hover:border-slate-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Cards Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cardsData[activeFilter].map((card) => (
            <DestinationCard key={card.title} image={card.image} title={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}