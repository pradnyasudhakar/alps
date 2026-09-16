
import BestSellingPackages from "@/components/holiday/BestSellingPackages";
import ExclusiveOffers from "@/components/holiday/ExclusiveOffers";
import ExploreThemes from "@/components/holiday/ExploreThemes";
import MomentsStory from "@/components/holiday/MomentsStory";
import NeedHelpCTA from "@/components/holiday/NeedHelpCTA";

import TrendingDestinations from "@/components/home/TrendingDestinations";
import ListingHero from "@/components/listing/ListingHero";


export default function AdventurePackagesPage() {
  return (
    <>
     
<ListingHero
  title="Perfect Holidays, Crafted Just for You"
  image="/images/holidays-hero.jpg"
  searchOptions={[
    { value: "kashmir", label: "Kashmir, India" },
    { value: "kerala", label: "Kerala, India" },
  ]}
  buttonText="Search"
/>

<TrendingDestinations/>
<BestSellingPackages/>
<NeedHelpCTA/>
<ExploreThemes/>
<ExclusiveOffers/>
<MomentsStory/>
     
      
    </>
  );
}