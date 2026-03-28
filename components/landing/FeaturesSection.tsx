"use client";

import { CarouselDots } from "@/components/ui/CarouselDots";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-10">
        <div className="flex flex-col sm:flex-row items-start justify-center gap-10">

          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title="Organise your chaos creative space"
              roration={10}
              image={<Image src="/yellow.png" alt="" width={200} height={200} style={{ height: "auto" }} className="object-contain" priority />}
              caption="Get instant, actionable prompts for your own niche content plan"
              captionColor="#FBA400"
            />
          </div>

          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title="Analyse video for you"
              image={<Image src="/red.png" alt="" width={200} height={200} style={{ height: "auto" }} className="object-contain" />}
              caption="Automatically group your saved videos into creative patterns"
              bgColor="#A7F3D0"
              captionColor="#EF524E"
            />
          </div>

          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title="Turn your inspo to post-ready ideas"
              roration={-3}
              image={<Image src="/blue.png" alt="" width={200} height={200} style={{ height: "auto" }} className="object-contain" />}
              caption="Break down every save DNA so you can learn the strategy"
              captionColor="#3377FF"
            />
          </div>

        </div>
        <CarouselDots count={3} active={active} onChange={setActive} />
      </div>
    </section>
  );
}
