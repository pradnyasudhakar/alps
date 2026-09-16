import Image from "next/image";
import Link from "next/link";
import { H2, H4, P } from "@/components/ui/Typography";
import Overlay from "@/components/ui/Overlay";
import Button from "../ui/Button";

type Package = {
  id: string;
  image: string;
  title: string;
  details?: string;
  price: string;
  span: string;
  featured?: boolean;
};

const packages: Package[] = [
  {
    id: "1",
    image: "/images/special-12.png",
    title: "Kashmir - Paradise in the Mountains",
    details: "6 Nights / 7 Days • Srinagar • Gulmarg • Pahalgam • Sonamarg",
    price: "₹39,999",
    span: "sm:col-span-2",
    featured: true,
  },
  {
    id: "2",
    image: "/images/special-1.png",
    title: "Enchanting Kerela",
    price: "₹23,700",
    span: "sm:col-span-1",
  },
  {
    id: "3",
    image: "/images/special-2.png",
    title: "Dubai Bliss",
    price: "₹49,999",
    span: "sm:col-span-1",
  },
  {
    id: "4",
    image: "/images/special-3.png",
    title: "Kenyan Safari",
    price: "₹1,29,999",
    span: "sm:col-span-1 ",
  },
  {
    id: "5",
    image: "/images/special-4.png",
    title: "Highlights Of Thailand",
    price: "₹72,800",
    span: "lg:col-span-2 md:col-span-1 ",
  },
];

export default function AlpsSpecial() {
  return (
    <section className="px-6 sm:px-10 md:px-16 py-24">
      {/* Header - centered */}
      <div className="max-w-xl mx-auto text-center mb-12">
        <H2 className="mb-3 text-[#0B0B0B]">
          Alps Special
          <span className="block w-full h-0.5 bg-slate-900 mt-3" />
        </H2>
        <P className="font-light">
          Most popular destinations around the world, from historical places to
          natural wonders. Most popular destinations around the world, from
          historical places to natural wonders.
        </P>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`group relative h-84 rounded-[26px] overflow-hidden cursor-pointer ${pkg.span}`}
          >
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <Overlay intensity="medium" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <H4 className="font-body text-[#FFFFFF]  mb-1">{pkg.title}</H4>

              {pkg.featured ? (
                <>
                  {/* Details - hover pe reveal */}
                  <P className="font-body text-white/80  mb-0 max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mb-2 overflow-hidden transition-all duration-300 ease-in-out">
                    {pkg.details}
                  </P>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <P className="text-[#FFFFFF]">From {pkg.price} / person</P>

                    {/* Button - hover pe reveal */}
                    <Link
                      href="/contact"
                      className="font-body text-sm bg-white text-slate-900 px-4 py-2 rounded-md whitespace-nowrap max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </>
              ) : (
                <P className="text-[#FFFFFF]">From {pkg.price} / person</P>
              )}
            </div>
          </div>
        ))}

        {/* CTA Card - "See More Packages" */}
        <div className="group relative lg:col-span-1 md:col-span-2 h-84 rounded-[26px] overflow-hidden flex flex-col justify-end text-left p-6">
          <Image
            src="/images/special-5.jpg"
            alt="See more packages"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Overlay intensity="dark" />

          <div className="relative z-10">
            <H4 className="font-body text-[#FFFFFF]  max-w-40 mb-2">
              See More Packages
            </H4>
            <P className="text-white font-light text-sm mb-4">
              1,200+ Handpicked Getaways waiting
            </P>
            <Button
              href="/listing" variant="white"
              
            >
              See More Packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}