"use client";

import Image from "next/image";
import { H4 } from "@/components/ui/Typography";

type DestinationCardProps = {
  image: string;
  title: string;
  href?: string;
};

export default function DestinationCard({
  image,
  title,
  href = "#",
}: DestinationCardProps) {
  return (
    <a href={href} className="group relative block w-full h-84 rounded-[26px] overflow-hidden">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/50" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-90 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <H4 className="text-white">{title}</H4>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-white/0 group-hover:ring-white/40 transition-all duration-300" />
    </a>
  );
}