import Image from "next/image";
import Link from "next/link";
import { H2, P, H4 } from "@/components/ui/Typography";
import { FiArrowUpRight } from "react-icons/fi";

type Offer = {
  id: string;
  image: string;
  title: string;
  details?: string;
  price: string;
  span: string;
  featured?: boolean;
};

const offers: Offer[] = [
  {
    id: "1",
    image: "/images/ex-1.png",
    title: "Kashmir – Paradise in the Mountains",
    details: "6 Nights / 7 Days • Srinagar • Gulmarg • Pahalgam • Sonamarg",
    price: "₹39,999",
    span: "sm:col-span-2",
    featured: true,
  },
  {
    id: "2",
    image: "/images/ex-2.png",
    title: "Enchanting Kerela",
    price: "₹23,700",
    span: "sm:col-span-1",
  },
  {
    id: "3",
    image: "/images/ex-3.png",
    title: "Dubai Bliss",
    price: "₹49,999",
    span: "sm:col-span-1",
  },
  {
    id: "4",
    image: "/images/ex-4.png",
    title: "Kenyan Safari",
    price: "₹1,29,999",
    span: "sm:col-span-2",
  },
  {
    id: "5",
    image: "/images/ex-5.png",
    title: "Highlights Of Thailand",
    price: "₹72,800",
    span: "sm:col-span-2",
  },
];

export default function ExclusiveOffers() {
  return (
    <section className="px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-24">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 sm:mb-12">
        <H2 className="relative text-[#0B0B0B] inline-block">
          Exclusive Holiday Offers
          <span className="block w-full max-w-[220px] h-0.5 bg-slate-900 mt-2" />
        </H2>

        <Link
          href="/holidays"
          aria-label="See all offers"
          className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 transition-colors shrink-0"
        >
          <FiArrowUpRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`group relative h-80 rounded-[20px] overflow-hidden cursor-pointer ${offer.span}`}
          >
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0) 65%)",
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <H4 className="text-white mb-1">{offer.title}</H4>

              {offer.featured ? (
                <>
                  {/* Details - hover pe reveal */}
                  <p className="font-body text-white/80 text-xs mb-0 max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mb-2 overflow-hidden transition-all duration-300 ease-in-out">
                    {offer.details}
                  </p>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <P className="!text-white">
                      From {offer.price} / person
                    </P>

                    {/* Button - hover pe reveal */}
                    <Link
                      href={`/contact?packageTitle=${encodeURIComponent(offer.title)}`}
                      className="font-body text-sm bg-white text-slate-900 px-4 py-2 rounded-md whitespace-nowrap max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </>
              ) : (
                <P className="!text-white">From {offer.price} / person</P>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}