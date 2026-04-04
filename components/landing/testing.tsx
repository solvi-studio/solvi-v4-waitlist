"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef, ReactNode } from "react";

interface BeaconWrapProps {
  children: ReactNode;
  color?: string;
  rayCount?: number;
  rayLength?: number;
  speed?: number;
  gap?: number;
  sideWeight?: number; // >1 = more rays on ends, <1 = fewer. default 1 = even
}

function buildPillRays(
  g: SVGGElement,
  width: number,
  height: number,
  pad: number,
  gap: number,
  rayLength: number,
  rayStroke: number,
  count: number,
  color: string,
  sideWeight: number
): SVGLineElement[] {
  g.innerHTML = "";
  const lines: SVGLineElement[] = [];

  const r = height / 2;
  const straightW = Math.max(0, width - height);

  // Real perimeter segment lengths
  const topLen = straightW;
  const rightArcLen = Math.PI * r;
  const bottomLen = straightW;
  const leftArcLen = Math.PI * r;

  // Weighted lengths: arcs are multiplied by sideWeight so they attract more rays
  const wTop = topLen;
  const wRight = rightArcLen * sideWeight;
  const wBottom = bottomLen;
  const wLeft = leftArcLen * sideWeight;
  const wTotal = wTop + wRight + wBottom + wLeft;

  for (let i = 0; i < count; i++) {
    // Step evenly through the *weighted* perimeter
    const wt = (i / count) * wTotal;

    // Map weighted position back to a real perimeter position
    let t: number;
    if (wt < wTop) {
      t = wt;
    } else if (wt < wTop + wRight) {
      t = topLen + (wt - wTop) / sideWeight;
    } else if (wt < wTop + wRight + wBottom) {
      t = topLen + rightArcLen + (wt - wTop - wRight);
    } else {
      t = topLen + rightArcLen + bottomLen + (wt - wTop - wRight - wBottom) / sideWeight;
    }

    let px: number, py: number, nx: number, ny: number;

    if (t < topLen) {
      // Top edge — normal points up
      px = r + t;
      py = 0;
      nx = 0; ny = -1;
    } else if (t < topLen + rightArcLen) {
      // Right semicircle — normal is radial from right arc center
      const arcT = (t - topLen) / rightArcLen;
      const angle = -Math.PI / 2 + arcT * Math.PI;
      px = (width - r) + Math.cos(angle) * r;
      py = r + Math.sin(angle) * r;
      nx = Math.cos(angle);
      ny = Math.sin(angle);
    } else if (t < topLen + rightArcLen + bottomLen) {
      // Bottom edge — normal points down
      const d = t - topLen - rightArcLen;
      px = (width - r) - d;
      py = height;
      nx = 0; ny = 1;
    } else {
      // Left semicircle — normal is radial from left arc center
      const arcT = (t - topLen - rightArcLen - bottomLen) / leftArcLen;
      const angle = Math.PI / 2 + arcT * Math.PI;
      px = r + Math.cos(angle) * r;
      py = r + Math.sin(angle) * r;
      nx = Math.cos(angle);
      ny = Math.sin(angle);
    }

    const x1 = pad + px + nx * gap;
    const y1 = pad + py + ny * gap;
    const x2 = pad + px + nx * (gap + rayLength);
    const y2 = pad + py + ny * (gap + rayLength);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(x1));
    line.setAttribute("y1", String(y1));
    line.setAttribute("x2", String(x2));
    line.setAttribute("y2", String(y2));
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", String(rayStroke));
    line.setAttribute("stroke-linecap", "round");
    line.style.opacity = "0";

    g.appendChild(line);
    lines.push(line);
  }

  return lines;
}

export function BeaconWrap({
  children,
  color = "#4F46E5",
  rayCount = 20,
  rayLength = 14,
  speed = 1,
  gap = 8,
  sideWeight = 1,
}: BeaconWrapProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const g = gRef.current;
    if (!wrap || !svg || !g) return;

    const { width, height } = wrap.getBoundingClientRect();
    const pad = gap + rayLength + 4;
    const rayStroke = Math.max(2, height * 0.08);

    svg.setAttribute("width", String(width + pad * 2));
    svg.setAttribute("height", String(height + pad * 2));
    svg.style.left = `-${pad}px`;
    svg.style.top = `-${pad}px`;

    const lines = buildPillRays(g, width, height, pad, gap, rayLength, rayStroke, rayCount, color, sideWeight);

    const d = 1 / speed;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 * d });

    tl.to(lines, {
      opacity: 1,
      stagger: { each: 0.05 * d, from: "start" },
      duration: 0.12 * d,
      ease: "power2.out",
    })
      .to(lines, {
        opacity: 0,
        duration: 0.35 * d,
        ease: "power2.in",
        stagger: { each: 0.025 * d, from: "start" },
      }, "+=0.1")
      .to(wrap, { scaleX: 1.04, scaleY: 1.04, duration: 0.08 * d, ease: "power1.out", transformOrigin: "center" }, 0)
      .to(wrap, { scaleX: 1, scaleY: 1, duration: 0.22 * d, ease: "elastic.out(1, 0.4)" }, 0.08 * d);

    return () => { tl.kill(); };
  }, [color, rayCount, rayLength, speed, gap]);

  return (
    <span ref={wrapRef} className="relative inline-flex items-center justify-center">
      <svg
        ref={svgRef}
        className="absolute pointer-events-none overflow-visible"
        style={{ position: "absolute" }}
      >
        <g ref={gRef} />
      </svg>
      {children}
    </span>
  );
}
