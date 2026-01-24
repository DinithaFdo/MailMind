// import { Marquee } from "@/components/magicui/marquee";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import FAQSection from "@/components/shared/Sections/FAQSection";
import HeroSection from "@/components/shared/Sections/HeroSection";
import HowItWork from "@/components/shared/Sections/HowItWork";
import KeyFeatures from "@/components/shared/Sections/KeyFeatures";
import Testimonials from "@/components/shared/Sections/Testimonials";

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <div className=" sticky top-0 z-50">
        <NavBar />
      </div>
      <HeroSection />
      <KeyFeatures />
      <HowItWork />
      <Testimonials />
      <FAQSection />
      <div>
        <Footer />
      </div>
    </div>
  );
}
