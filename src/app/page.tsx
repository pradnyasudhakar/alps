import Hero from "@/components/home/Hero";
import TrendingSlider from "@/components/home/TrendingSlider";
import TrendingDestinations from "@/components/home/TrendingDestinations";
import NotSureWhereToGo from "@/components/home/NotSureWhereToGo";
import AlpsSpecial from "@/components/home/AlpsSpecial";
import WhyBookWithAlps from "@/components/home/WhyBookWithAlps";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
     
       <TrendingDestinations />
       <TrendingSlider />
       <NotSureWhereToGo />
       <AlpsSpecial />
       <WhyBookWithAlps />
       <Testimonials />
       <FAQ />
      
    </>
  );
}