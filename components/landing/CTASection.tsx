"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="w-full py-20 px-6 bg-[#F5F0E8]">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-12">

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 w-full">

          {/* Extension mockup */}
          <ScrollReveal direction="up" className="flex-shrink-0">
            <div className="relative w-[300px] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-[#F5F0E8]">
              {/* Puzzle piece */}
              <div className="absolute -top-3 left-20 z-10 text-4xl select-none">🧩</div>

              {/* Photo */}
              <div className="relative w-full h-44 bg-gray-800 overflow-hidden rounded-xl m-2" style={{ width: "calc(100% - 16px)" }}>
                <Image src="/yellow.png" alt="" fill sizes="300px" className="object-cover opacity-80" />
                <span className="absolute bottom-2 left-2 text-white text-[10px] opacity-60">TikTok</span>
              </div>

              {/* Extension popup */}
              <div className="bg-white rounded-xl mx-2 mb-2 p-3 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#5DB075] flex items-center justify-center overflow-hidden">
                    <Image src="/face.png" alt="" width={20} height={20} style={{ height: "auto" }} className="object-contain scale-150" />
                  </div>
                  <span className="font-semibold text-sm text-gray-800">Solvi Extension</span>
                </div>

                <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">+</div>
                  <span className="text-sm text-blue-600 font-medium">Add to bookmark</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5">
                  <span className="text-base">⚙️</span>
                  <span className="text-sm text-gray-600">View My Library</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal direction="right" delay={0.15} className="flex-1 max-w-[260px]">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              Ready to stop hoarding and start scrolling for hits?
            </h2>
          </ScrollReveal>

        </div>

        {/* CTA button */}
        <ScrollReveal direction="up" delay={0.3}>
          <Button variant="coral" href="#download" className="px-10 py-4 text-base">
            Download Solvi
          </Button>
        </ScrollReveal>

      </div>
    </section>
  );
}
