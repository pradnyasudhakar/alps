import Link from "next/link";
import Image from "next/image";
import { Display, P, Small } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Overlay from "@/components/ui/Overlay";
import { FiFacebook, FiTwitter, FiSend, FiInstagram } from "react-icons/fi";

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
              {/* Social Icons */}
              <div className="flex items-center gap-6">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-white/70 transition-colors"
                >
                  <FiFacebook className="w-5 h-5" />
                </Link>

                <Link
                  href="#"
                  aria-label="Twitter"
                  className="hover:text-white/70 transition-colors"
                >
                  <FiTwitter className="w-5 h-5" />
                </Link>

                <Link
                  href="#"
                  aria-label="Telegram"
                  className="hover:text-white/70 transition-colors"
                >
                  <FiSend className="w-5 h-5" />
                </Link>

                <Link
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-white/70 transition-colors"
                >
                  <FiInstagram className="w-5 h-5" />
                </Link>
              </div>

            </div>

            {/* Divider */}
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