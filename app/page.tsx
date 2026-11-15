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


export default function Home() {
  return (
<>
<Navbar/>
{/* <Navbar2/> */}
<HeroSection/>
<PremiumCategories/>
<CatalogPage/>
<SneakersSection/>
<FashionSneakersGrid/>
<ComfortMeetsFashion/>
<BootsSection/>
<RecentPosts/>
<NewsletterFooter/>

</>
  );
}
