import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { AISection } from "@/components/landing/AISection";
import { CTASection } from "@/components/landing/CTASection";
import {MotionSection} from "@/components/landing/MotionSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      {/* <FeaturesSection /> */}
      <MotionSection />
      <AISection />
      <CTASection />
    </main>
  );
}
