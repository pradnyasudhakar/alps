import Link from "next/link";
import Image from "next/image";
import { Display, P, Small } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Overlay from "@/components/ui/Overlay";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/packages" },
  { name: "Contact Us", href: "/contact" },
  { name: "Gallery", href: "/gallery" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms-of-use" },
  { name: "Disclaimer/Refund", href: "/disclaimer-refund" },
  { name: "Legal", href: "/legal" },
];

export default function Footer() {
  return (
    <footer className="relative w-full text-white py-16 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/footer-img.png"
        alt="Mountain landscape"
        fill
        className="object-cover -z-10"
      />

      <Overlay intensity="light" />

      {/* CTA Section */}
      <div className="px-10 md:px-16 pt-10 pb-16">
        <Display className=" 2xl:text-4xl leading-snug 2xl:max-w-sm md:max-w-sm mb-4">
          Ready To Plan Your Next Holiday?
        </Display>
        <P className="text-[#FBFBFB] font-light 2xl:max-w-lg max-w-md mb-8">
          Whatever you want your luxury holiday tour to safari itinerary to
          include, we&apos;ll create something truly bespoke for you...only you.
        </P>
        <Button variant="white">Enquire Now</Button>
      </div>

     {/* Navigation Row */}
<div className="px-10 md:px-20 pt-6 pb-4">
  <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16">
    {/* Logo */}
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <Image
        src="/images/alps-logo.png"
        alt="Alps Hotel & Travels"
        width={140}
        height={70}
        className="object-contain"
      />
    </Link>

    {/* Right Block: Nav + Social + Divider + Legal */}
    <div className="flex-1 w-full">
      {/* Nav Links + Social Icons */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <ul className="font-body flex flex-wrap items-center gap-8 text-sm text-white/90">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Facebook" className="hover:text-white/70 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
          </Link>
          <Link href="#" aria-label="Instagram" className="hover:text-white/70 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
            </svg>
          </Link>
          <Link href="#" aria-label="Twitter" className="hover:text-white/70 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Divider - sirf is right block ki width tak */}
      <div className="border-t border-[#FBFBFB] mt-6" />

      {/* Legal Links */}
      <div className="flex flex-wrap items-center gap-8 pt-4">
        {legalLinks.map((link) => (
          <Small key={link.name} className="text-white/60!">
            <Link href={link.href} className="hover:text-white transition-colors">
              {link.name}
            </Link>
          </Small>
        ))}
      </div>
    </div>
  </div>
</div>

    </footer>
  );
}