"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface MascotProps {
  delay?: number;
}

export function Mascot({ delay = 0 }: MascotProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shared = { duration: 0.6, ease: "back.out(1.2)" };

      // Each part has its own `to` x value — change these independently
      gsap.fromTo(bodyRef.current,  { x: -120, y: 50, opacity: 0 }, { x: -10, y: -30, opacity: 1, ...shared, delay: delay });
      gsap.fromTo(frameRef.current, { x: -120, opacity: 0 }, { x: 0,  opacity: 1, ...shared, delay: delay + 0.1 });
      gsap.fromTo(faceRef.current,  { x: -120, opacity: 0 }, { x: 10, opacity: 1, ...shared, delay: delay + 0.2 });
      gsap.fromTo(handRef.current,  { x: -120, opacity: 0 }, { x: -10, opacity: 1, ...shared, delay: delay + 0.3 });
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <div className="absolute left-0 bottom-0 w-52 h-[340px] pointer-events-none select-none">
      {/* frame (yellow) — back layer */}
      <div ref={frameRef} className="absolute bottom-0 left-0" style={{ opacity: 0 }}>
        <Image src="/frame.png" alt="" width={130} height={204} style={{ height: "auto" }} className="object-contain" />
      </div>

      {/* body (green) — mid layer */}
      <div ref={bodyRef} className="absolute bottom-0 left-2" style={{ opacity: 0 }}>
        <Image src="/body.png" alt="" width={150} height={313} style={{ height: "auto" }} className="object-contain" />
      </div>

      {/* face — on upper body */}
      <div ref={faceRef} className="absolute top-16 left-8" style={{ opacity: 0 }}>
        <Image src="/face.png" alt="" width={80} height={68} style={{ height: "auto" }} className="object-contain" />
      </div>

      {/* hand — sticking out to the right */}
      <div ref={handRef} className="absolute bottom-24 right-0" style={{ opacity: 0 }}>
        <Image src="/hand.png" alt="" width={100} height={66} style={{ height: "auto" }} className="object-contain" />
      </div>
    </div>
  );
}
