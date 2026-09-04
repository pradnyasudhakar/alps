import Image from "next/image";
import { H2, H4, P, Small } from "@/components/ui/Typography";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string; // image path ab
};

const features: Feature[] = [
  {
    id: "1",
    title: "Original experiences",
    description:
      "We'll plan your trip around your personal interests and preferences, so we can craft a luxury journey - that's uniquely yours.",
    icon: "/images/icon-1.png",
  },
  {
    id: "2",
    title: "24/7 customer support",
    description:
      "No matter the time zone, we're here to help. We offer flexibility if you plan changes so you can book with confidence.",
    icon: "/images/icon-2.png",
  },
  {
    id: "3",
    title: "The personal touch",
    description:
      "Our destination specialists, expert guides and brilliant concierges are hand-picked for their ability to bring your destination to life.",
    icon: "/images/icon-3.png",
  },
  {
    id: "4",
    title: "Responsible travel",
    description:
      "Guided by our Positive Impact Principles, we seek to ensure your trip can help preserve, support and regenerate culture and heritage.",
    icon: "/images/icon-4.png",
  },
];

export default function WhyBookWithAlps() {
  return (
    <section className="px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-24">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-16">
        <H2 className="relative text-[#0B0B0B] inline-block text-2xl sm:text-3xl">
          Why Book With Alps
          <span className="block w-full h-0.5 bg-slate-900 mt-3" />
        </H2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#272727] flex items-center justify-center mb-4 sm:mb-5 relative">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={40}
                height={40}
                className="object-contain w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <H4 className="mb-2 text-[#172432] ">{feature.title}</H4>
            <P className=" font-light max-w-full 2xl:max-w-75 ">
              {feature.description}
            </P>
          </div>
        ))}
      </div>
    </section>
  );
}