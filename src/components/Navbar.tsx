"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Holidays", href: "/holidays" },
  { name: "Hotels", href: "/hotels" },
  { name: "Cruise", href: "/cruise" },
  { name: "Rentals", href: "/rentals" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 sm:px-10 md:px-16 py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50">
          <Image
            src="/images/alps-logo.png"
            alt="Alps Hotel & Travels"
            width={140}
            height={100}
            className="object-contain w-28 md:w-32 lg:w-36 h-auto"
          />
        </Link>

        {/* Desktop Menu Links - ab lg (1024px) se dikhega, tablet par hamburger hi rahega */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-[#FBFBFB] font-body 2xl:text-lg text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-primary whitespace-nowrap ${
                    isActive ? "font-semibold" : "font-normal"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
  <Button variant="primary" href="/contact">Enquire Now</Button>
</div>
        </ul>

        {/* Hamburger Button - ab tablet (md) tak bhi dikhega, sirf lg se upar hidden hoga */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile/Tablet Menu Overlay - ab lg se neeche (mobile + tablet) dono ke liye */}
      <div
        className={`lg:hidden fixed inset-0 bg-slate-900/98 flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 font-body text-white text-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors hover:text-primary ${
                    isActive ? "font-semibold" : "font-normal"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <Button variant="primary" href="/contact" >
          Enquire Now
        </Button>
      </div>
    </header>
  );
}