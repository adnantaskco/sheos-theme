import Image from "next/image";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/Herosection";
import PremiumCategories from "./Components/CategoryItem";
import SneakersSection from "./Components/Tabsetions";
import CatalogPage from "./Components/CatalogPage";
import ComfortMeetsFashion from "./Components/ComfortMeetsFashion";
import Navbar2 from "./Components/Navbar2";
import BootsSection from "./Components/BootsSection";
import RecentPosts from "./Components/RecentPosts";
import NewsletterFooter from "./Components/NewsletterFooter";
import FashionSneakersGrid from "./Components/FashionSneakersGrid";
import ExpandableShoeHero from "./Components/herosection2";
import BubbleCategories from "./Components/BubbleCategories";
import LadiesCatalogPage from "./Components/ladiesshoesection";
import NikeBrandProduct from "./Components/Nikecollection";



export default function Home() {
  return (
<>
<Navbar/>
{/* <Navbar2/> */}
<ExpandableShoeHero/>
<BubbleCategories/>

{/* <HeroSection/> */}
{/* <PremiumCategories/> */}
<CatalogPage/>
<LadiesCatalogPage/>
<FashionSneakersGrid/>
<SneakersSection/>
<ComfortMeetsFashion/>
<NikeBrandProduct/>
<BootsSection/>

<RecentPosts/>
<NewsletterFooter/>

</>
  );
}
