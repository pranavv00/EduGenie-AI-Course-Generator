import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";
import HowItWorks from "./_components/HowItWorks";
import LivePreview from "./_components/LivePreview";

export default function Home() {
  return (
    <div className="bg-white dark:bg-zinc-950 transition-colors">
      <Header />
      <Hero />
      <LivePreview />
      <HowItWorks />
      <Pricing />
      <Footer/>
    </div>
  );
}
