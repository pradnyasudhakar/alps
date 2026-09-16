import Image from "next/image";
import { H2, P } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Overlay from "../ui/Overlay";

type NeedHelpCTAProps = {
  image?: string;
  heading?: string;
  subtext?: string;
  buttonText?: string;
  onRequestCallback?: () => void;
};

export default function NeedHelpCTA({
  image = "/images/callback-hero.png",
  heading = "Need help choosing your destination?",
  subtext = "Speak to our travel expert for a trip tailored just for you.",
  buttonText = "Request a Callback",
  onRequestCallback,
}: NeedHelpCTAProps) {
  return (
    <section className="relative w-full h-64 sm:h-80 2xl:h-100 md:h-80 flex items-center  justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt=""
        fill
        className="object-cover -z-10"
      />

      {/* Dark Overlay */}
      <Overlay variant="flat" className="bg-[#0B0B0B]/20" />

      {/* Content */}
      <div className="relative z-10 text-center  max-w-2xl">
        <H2 className="text-white mb-4 leading-tight">
          {heading}
        </H2>

        <span className="block w-24 sm:w-60 h-0.5 bg-white mx-auto mb-4" />

        <P className="text-white font-light mb-4 max-w-md mx-auto">
          {subtext}
        </P>

        <Button variant="primary" href="/contact"  onClick={onRequestCallback}>
          {buttonText}
        </Button>
      </div>
    </section>
  );
}