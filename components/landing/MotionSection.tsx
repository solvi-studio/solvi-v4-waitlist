"use client";

import { FeatureCard } from "@/components/ui/FeatureCard";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useUiStore } from "@/hooks/useUiStore";

// ─── constants ───────────────────────────────────────────────────────────────

const SVG_W = 1297;
const SVG_H = 2803;

const PATH_D =
  "M642.076 0.379562C1113.68 404.78 122.576 912.38 122.576 617.88C122.576 323.38 1266.58 912.88 1266.58 1165.38C1266.58 1417.88 24.0764 1425.38 24.0764 1663.88C24.0764 1902.38 452.076 2056.88 1105.08 2120.38C1758.08 2183.88 522.576 2621.38 122.576 2537.38C-277.423 2453.38 451.576 2219.38 642.076 2221.38C832.576 2223.38 732.576 2472.39 642.076 2794.38";

const STAR_SIZE = 128;
const STARS = [
  { src: "/stars/07.svg", threshold: 0 },
  { src: "/stars/08.svg", threshold: 0.33 },
  { src: "/stars/23.svg", threshold: 0.66 },
];

// ─── card stops ──────────────────────────────────────────────────────────────
// pathAt: 0‒1 — when the drawing reaches this point the card pops in
// side:   which side of the path point to offset the card toward
interface CardStop {
  pathAt: number;
  side: "left" | "right";
  card: React.ReactNode;
}

const CARD_STOPS: CardStop[] = [
  {
    pathAt: 0.15,
    side: "right",
    card: (
      <FeatureCard
        title={<>Organise your <strong>chaos</strong> creative space</>}
        rotation={-5}
        image={<Image src="/yellow.png" alt="" width={200} height={200} style={{ width: "auto", height: "auto" }} className="object-contain" priority />}
        caption={<>Automatically group your saved videos into creative patterns</>}
        captionColor="#FBA400"
      />
    ),
  },
  {
    pathAt: 0.37,
    side: "right",
    card: (
      <FeatureCard
      title={<><strong>Analyse</strong> video for you</>}
        rotation={-5}
        image={<Image src="/red.png" alt="" width={200} height={200}  style={{ width: "auto", height: "auto" }} className="object-contain" />}
        caption="Break down every save DNA so you can learn the strategy"
        bgColor="#A7F3D0"
        captionColor="#EF524E"

      />
    ),
  },
  {
    pathAt: 0.93,
    side: "left",
    card: (
      <FeatureCard
        title={<>Turn your inspo to <strong>post-ready ideas</strong></>}
        rotation={-3}
        image={<Image src="/blue.png" alt="" width={200} height={200} style={{ width: "auto", height: "auto" }} className="object-contain" />}
        caption="Get instant, actionable prompts for your own niche content plan"
        captionColor="#3377FF"
      />
    ),
  },
];

// ─── speed map ───────────────────────────────────────────────────────────────
// Wider scroll range for a path segment = slower drawing
const SPEED_MAP = [
  { scroll: 0,    path: 0    },
  { scroll: 0.25, path: 0.3  },
  { scroll: 0.55, path: 0.4  },
  { scroll: 0.75, path: 0.6  },
  { scroll: 0.92, path: 0.87  },
  { scroll: 1,    path: 1    },
];

function remapProgress(scroll: number): number {
  for (let i = 1; i < SPEED_MAP.length; i++) {
    const prev = SPEED_MAP[i - 1];
    const next = SPEED_MAP[i];
    if (scroll <= next.scroll) {
      const t = (scroll - prev.scroll) / (next.scroll - prev.scroll);
      return prev.path + t * (next.path - prev.path);
    }
  }
  return 1;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function toScreen(svgX: number, svgY: number, svgEl: SVGSVGElement) {
  const { width, height } = svgEl.getBoundingClientRect();
  return { x: (svgX / SVG_W) * width, y: (svgY / SVG_H) * height };
}

// ─── component ───────────────────────────────────────────────────────────────

export function MotionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);

  const curtainDone = useUiStore((s) => s.curtainDone);
  const starRefs    = STARS.map(() => useRef<HTMLDivElement>(null));

  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    
    if (curtainDone) {
    const section = sectionRef.current;
    const svg     = svgRef.current;
    const path    = pathRef.current;
    if (!section || !svg || !path) return;

    const totalLength = path.getTotalLength();

    // ── init path ──
    gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: totalLength });


    // ── init stars ──
    const startPt     = path.getPointAtLength(0);
    const startScreen = toScreen(startPt.x, startPt.y, svg);
    starRefs.forEach((ref, i) => {
      gsap.set(ref.current, {
        x: startScreen.x, y: startScreen.y,
        visibility: "visible", opacity: 0,
        scale: i === 0 ? 1 : 0.6,
      });
    });
    // Fade first star in slowly
    gsap.to(starRefs[0].current, { opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 });

    // ── init cards: position + hide ──
    const { width: svgW } = svg.getBoundingClientRect();
    const CARD_OFFSET_PX  = svgW * 0.01; // how far to push card off the path point

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const stop   = CARD_STOPS[i];
      const pt     = path.getPointAtLength(stop.pathAt * totalLength);
      const screen = toScreen(pt.x, pt.y, svg);
      const dx     = stop.side === "right" ? CARD_OFFSET_PX : -100;

      gsap.set(el, {
        x: screen.x + dx,
        y: screen.y,
        xPercent: stop.side === "right" ? 0 : -100,
        yPercent: -50,
        opacity: 0,
        scale: 0.8,
        visibility: "visible",
      });
    });

    const cardRevealed = CARD_STOPS.map(() => false);
    let activeStarIdx  = 0;

    let targetDrawn  = 0;
    let currentDrawn = 0;
    const LERP_FACTOR = 0.08;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      onUpdate(self) {
        targetDrawn = remapProgress(self.progress) * totalLength;

        const progress = self.progress;

        // Crossfade star when crossing each threshold
        const targetStarIdx = STARS.reduce((acc, star, i) => progress >= star.threshold ? i : acc, 0);
        if (targetStarIdx !== activeStarIdx) {
          const out = starRefs[activeStarIdx].current;
          const inn = starRefs[targetStarIdx].current;
          if (out) gsap.to(out, { opacity: 0, scale: 0.6, duration: 0.4, ease: "power2.in" });
          if (inn) gsap.to(inn, { opacity: 1, scale: 1,   duration: 0.4, ease: "back.out(1.5)" });
          activeStarIdx = targetStarIdx;
        }

        CARD_STOPS.forEach((stop, i) => {
          const el      = cardRefs.current[i];
          if (!el) return;
          const reached = remapProgress(progress) >= stop.pathAt;
          if (reached && !cardRevealed[i]) {
            cardRevealed[i] = true;
            gsap.to(el, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" });
          } else if (!reached && cardRevealed[i]) {
            cardRevealed[i] = false;
            gsap.to(el, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
          }
        });
      },
    });

    const tick = () => {
      currentDrawn += (targetDrawn - currentDrawn) * LERP_FACTOR;

      path.style.strokeDashoffset = String(totalLength - currentDrawn);

      const tip       = path.getPointAtLength(currentDrawn);
      const tipBehind = path.getPointAtLength(Math.max(0, currentDrawn - 2));
      const angle     = Math.atan2(tip.y - tipBehind.y, tip.x - tipBehind.x) * (180 / Math.PI);
      const { x, y }  = toScreen(tip.x, tip.y, svg);
      starRefs.forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { x, y, rotation: angle + 90 });
      });
    };

    gsap.ticker.add(tick);

    
    return () => {
        st.kill();
        gsap.ticker.remove(tick);
    };

    }

  }, [curtainDone]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pb-64"
      style={{ aspectRatio: `${SVG_W} / ${SVG_H}` }}
    >
      {/* Path */}
      {curtainDone && (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          fill="none"
        >
          <path ref={pathRef} d={PATH_D} stroke="indigo" strokeWidth="5" />
        </svg>
      )}

      {/* Leading stars */}
      {STARS.map((star, i) => (
        <div
          key={star.src}
          ref={starRefs[i]}
          className="absolute pointer-events-none"
          style={{ width: STAR_SIZE, height: STAR_SIZE, marginLeft: -STAR_SIZE / 2, marginTop: -STAR_SIZE / 2, top: 0, left: 0, opacity: 0, visibility: "hidden" }}
        >
          <Image src={star.src} alt="" fill className="object-contain" />
        </div>
      ))}

      {/* Feature cards */}
      {CARD_STOPS.map((_, i) => (
        <div
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="absolute pointer-events-none"
          style={{ top: 0, left: 0, opacity: 0, visibility: "hidden" }}
        >
          {CARD_STOPS[i].card}
        </div>
      ))}
    </section>
  );
}
