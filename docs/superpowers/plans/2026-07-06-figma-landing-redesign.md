# Figma Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `app/page.tsx`'s landing sections to match the Figma design at `https://www.figma.com/design/SDeTQ6ctGasvZRpSVgG6GE/Al-Bistro-Prototype?node-id=3259-36` (node `3259:36`, frame name "Landing Page"), pivoting the copy from a "bookmark/save organizer" pitch to a "brainstorming creative partner" pitch, while reusing existing animation infrastructure (GSAP, mascot, orbit) wherever the visual pattern already matches.

**Architecture:** No structural rewrite — five existing landing sections (`HeroSection`, `FeaturesSection`, `MotionSection`, `AISection`, `CTASection`) are edited or removed in place. `HeroSection` gets a text-only pass (per explicit instruction: layout, animation, and DOM structure stay untouched). `FeaturesSection`, `AISection`, and `CTASection` get copy + color + asset refactors. `MotionSection` is deleted — Figma has no scroll-drawing equivalent, and keeping it would duplicate the 3 feature cards on the page.

**Tech Stack:** Next.js 16 (App Router, breaking changes vs. training data — see `node_modules/next/dist/docs/` before touching routing/config), React 19, Tailwind CSS v4 (`@theme inline` in `app/globals.css`, no `tailwind.config.*` file), GSAP 3 for animation, TypeScript. No test runner is installed (no Jest/Vitest/Playwright in `package.json`) — verification in this plan is `tsc --noEmit`, `eslint`, and manual visual checks against the Figma screenshot via `npm run dev`, not automated tests.

## Global Constraints

- Do not add a test framework to satisfy this plan's verification steps — this project has none installed, and adding one is out of scope. Verify with `npx tsc --noEmit`, `npm run lint`, and visual inspection at `http://localhost:3000` instead.
- `HeroSection.tsx` changes are copy-only: no new/removed DOM nodes, no ref/animation/prop changes, no href change. Only string literals inside `<h1>`, the two `<span>`s, the sub-`<p>`, and the two `RunTextAnim` `text` props change.
- `MotionSection` is deleted entirely (confirmed with user — Figma has no scroll-drawing path effect; `FeaturesSection`'s static 3-card layout is the single source of truth for feature cards).
- Reuse existing illustrations (`/yellow.png`, `/red.png`, `/blue.png`, mascot PNGs) inside `FeatureCard` rather than building pixel-exact recreations of Figma's bespoke per-card doodles (folded-card icon, ink-marker, pin, shot-list table, calendar grid) — those are decorative micro-illustrations disproportionate to a copy/color refactor. Card **background colors** and **copy** must match Figma exactly; card **imagery** stays as the existing mascot-colored illustrations.
- New downloaded Figma assets already live in `public/redesign/` (fetched from short-lived `figma.com/api/mcp/asset/...` URLs before their 7-day expiry): `pancake.jpg`, `chrome.svg`, `tiktok-circle.svg`, `instagram-circle.svg`, `youtube-circle.svg`, `clock.svg`, `lightbulb.svg`, `play-icon.svg`. Do not re-fetch from Figma URLs — use these local paths.
- The 8 downloaded icon SVGs are monochrome glyphs using `fill="var(--fill-0, <color>)"` — rendered via `next/image` as external `<img>` sources, CSS variables from the page do NOT cascade into them. Each renders in its baked-in default color (white for tiktok/instagram/youtube, black for chrome). Wrap them in a colored circular `<div>` background exactly like the existing `AISection` `ICONS` pattern — do not expect the SVG itself to be recolorable.
- Exact copy strings (source: Figma `get_design_context` + screenshot for node `3259:36`) are given verbatim in each task below — do not paraphrase them.
- Color tokens to reuse verbatim from Figma: `#FBA400` (orange), `#EF524E` (red), `#3377FF`/`#37f` (blue), `#0C8F8F` (teal), `#FEECB8` (yellow bg), `#FFCDCF` (pink bg), `#BFF5F6` (cyan bg), `#E6EFFF` (light blue callout bg), `#FDE5E3` (light pink callout bg), `#F2F2F5` (page body / CTA section bg).

---

## File Structure

- Modify `app/page.tsx` — remove `MotionSection` import and usage.
- Delete `components/landing/MotionSection.tsx` — scroll-drawing effect has no Figma equivalent, dropped per user decision.
- Modify `components/landing/HeroSection.tsx` — copy-only text swap (h1, subhead spans, pill label, subtext, button label).
- Modify `components/landing/FeaturesSection.tsx` — new titles/captions/bg colors per card, matching Figma's mindmap/summarize/schedule narrative.
- Modify `components/landing/AISection.tsx` — heading text swap, `ICONS` array icon swap (Threads → Chrome, all icons now sourced from `public/redesign/*.svg` via `next/image`), add two callout cards (`Save your time...`, `Assist you to become more creative`).
- Modify `components/landing/CTASection.tsx` — replace extension-popup mockup with a `pancake.jpg` photo card, new headline/subtext copy, relabel button to "Let's go", change section background to `#F2F2F5`.
- No new component files — callout cards and photo mockup are simple enough to inline (two usages each, no shared logic beyond a `<div>` + icon + text, doesn't clear the bar for extraction per YAGNI).

---

### Task 1: Remove MotionSection

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/landing/MotionSection.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `app/page.tsx` renders `HeroSection`, `FeaturesSection`, `AISection`, `CTASection` in that order (no `MotionSection`).

- [ ] **Step 1: Remove the import and usage from `app/page.tsx`**

Current content:
```tsx
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { AISection } from "@/components/landing/AISection";
import { CTASection } from "@/components/landing/CTASection";
import {MotionSection} from "@/components/landing/MotionSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <MotionSection />
      <AISection />
      <CTASection />
    </main>
  );
}
```

New content:
```tsx
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { AISection } from "@/components/landing/AISection";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <AISection />
      <CTASection />
    </main>
  );
}
```

- [ ] **Step 2: Delete the now-unused section file**

```bash
git rm components/landing/MotionSection.tsx
```

- [ ] **Step 3: Verify no other file references MotionSection**

Run: `grep -rn "MotionSection" --include="*.tsx" --include="*.ts" .`
Expected: no output (empty).

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors related to `app/page.tsx` or missing `MotionSection` module.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "refactor: drop MotionSection, keep static FeaturesSection as sole feature-card section"
```

---

### Task 2: HeroSection — wording-only pass

**Files:**
- Modify: `components/landing/HeroSection.tsx:87-134`

**Interfaces:**
- Consumes: existing `BeaconWrap`, `Mascot`, `RunTextAnim`, all refs and handlers — unchanged.
- Produces: same DOM structure, same class names, same animation timeline — only text nodes differ.

- [ ] **Step 1: Change the h1 text**

At `components/landing/HeroSection.tsx:87-89`:
```tsx
<h1 className="hero-content text-7xl tracking-tight text-gray-900 font-editorial font-[800] italic">
  Welcome
</h1>
```
becomes:
```tsx
<h1 className="hero-content text-7xl tracking-tight text-gray-900 font-editorial font-[800] italic">
  Welcome to Solvi
</h1>
```

- [ ] **Step 2: Change the subhead spans and pill label**

At `components/landing/HeroSection.tsx:91-102`, the three text nodes change (structure, refs, and `BeaconWrap` props stay identical):
```tsx
<span ref={tonewRef} className="inline-block">to your new</span>
  <span ref={pillRef} className="inline-flex">
    <BeaconWrap color="#F5C842" rayCount={20} gap={10} speed={1.5} sideWeight={2} rotate={-7} hoverOnly onHoverChange={handleBeaconHover}>
      <span className="bg-[#F5C842] text-gray-900 font-bold px-4 py-1.5 rounded-full text-base -rotate-7">
        bookmark partner
      </span>
    </BeaconWrap>
  </span>

<span ref={organisedRef} className="inline-block">organised</span>
```
becomes:
```tsx
<span ref={tonewRef} className="inline-block">your new</span>
  <span ref={pillRef} className="inline-flex">
    <BeaconWrap color="#F5C842" rayCount={20} gap={10} speed={1.5} sideWeight={2} rotate={-7} hoverOnly onHoverChange={handleBeaconHover}>
      <span className="bg-[#F5C842] text-gray-900 font-bold px-4 py-1.5 rounded-full text-base -rotate-7">
        creative partner
      </span>
    </BeaconWrap>
  </span>

<span ref={organisedRef} className="inline-block">for brainstorming ideas</span>
```

- [ ] **Step 3: Change the subtext**

At `components/landing/HeroSection.tsx:105-107`:
```tsx
<p className="hero-content mt-5 text-sm text-gray-500 max-w-[350px] leading-relaxed font-inter font-[800]">
  Scroll less aimlessly, create more intentionally. Everything you save, finally in one place
</p>
```
becomes:
```tsx
<p className="hero-content mt-5 text-sm text-gray-500 max-w-[350px] leading-relaxed font-inter font-[800]">
  Stay you in the age of generated everything
</p>
```

- [ ] **Step 4: Change the button label**

At `components/landing/HeroSection.tsx:125-127`:
```tsx
<RunTextAnim text="Download" delay={0.03} len={2} total={0.21} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
<span aria-hidden="true" style={{ display: "inline-block", width: 12 }} />
<RunTextAnim text="Solvi" delay={0.03} len={3} total={0.41} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
```
becomes:
```tsx
<RunTextAnim text="Brainstorm" delay={0.03} len={2} total={0.21} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
<span aria-hidden="true" style={{ display: "inline-block", width: 12 }} />
<RunTextAnim text="your idea now" delay={0.03} len={3} total={0.41} hoverTargetRef={downloadButtonRef} style={{ height: "1.25em" }} />
```

Leave the `href`, `onMouseEnter`/`onMouseLeave` cursor-text handlers, and all animation timing props (`delay`, `len`, `total`) exactly as-is — this is a wording-only task.

- [ ] **Step 5: Visual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: hero reads "Welcome to Solvi" / "your new **creative partner** for brainstorming ideas" / "Stay you in the age of generated everything" / button "Brainstorm your idea now". Mascot wave-on-hover and beacon-pill dodge animation still work when hovering the pill.

- [ ] **Step 6: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/landing/HeroSection.tsx
git commit -m "content: update hero copy to brainstorming-partner positioning"
```

---

### Task 3: FeaturesSection — retheme copy and colors

**Files:**
- Modify: `components/landing/FeaturesSection.tsx:32-60`

**Interfaces:**
- Consumes: `FeatureCard` props unchanged (`title`, `rotation`, `image`, `caption`, `bgColor`, `captionColor`) — no changes to `components/ui/FeatureCard.tsx`.
- Produces: same 3-card layout and carousel dots, new copy/colors only.

- [ ] **Step 1: Replace all three `FeatureCard` usages**

At `components/landing/FeaturesSection.tsx:32-60`, replace:
```tsx
          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title={<>Organise your <strong>chaos</strong> creative space</>}
              rotation={10}
              image={<Image src="/yellow.png" alt="" width={200} height={200} style={{ width: "auto", height: "auto" }} className="object-contain" priority />}
              caption={<>Automatically group your saved videos into creative patterns</>}
              captionColor="#FBA400"
            />
          </div>

          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title={<><strong>Analyse</strong> video for you</>}
              image={<Image src="/red.png" alt="" width={200} height={200} style={{ width: "auto", height: "auto" }} className="object-contain" />}
              caption="Break down every save DNA so you can learn the strategy"
              bgColor="#A7F3D0"
              captionColor="#EF524E"
            />
          </div>

          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title={<>Turn your inspo to <strong>post-ready ideas</strong> </>}
              rotation={-3}
              image={<Image src="/blue.png" alt="" width={200} height={200} style={{ width: "auto", height: "auto" }} className="object-contain" />}
              caption="Get instant, actionable prompts for your own niche content plan"
              captionColor="#3377FF"
            />
          </div>
```
with:
```tsx
          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title="Brainstorm with mindmap"
              rotation={10}
              image={<Image src="/yellow.png" alt="" width={200} height={200} style={{ width: "auto", height: "auto" }} className="object-contain" priority />}
              caption="Dump everything in your head. Solvi structures it into your story — angles, hooks, tone, format — all in one canvas."
              bgColor="#FEECB8"
              captionColor="#FBA400"
            />
          </div>

          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title="Summarise your idea"
              image={<Image src="/red.png" alt="" width={200} height={200} style={{ width: "auto", height: "auto" }} className="object-contain" />}
              caption="Your messy whiteboard becomes a clean, clustered shot list. AI organises what you created — not what everyone else is making."
              bgColor="#FFCDCF"
              captionColor="#EF524E"
            />
          </div>

          <div className="feature-card" style={{ opacity: 0 }}>
            <FeatureCard
              title="Arrange your schedule"
              rotation={-3}
              image={<Image src="/blue.png" alt="" width={200} height={200} style={{ width: "auto", height: "auto" }} className="object-contain" />}
              caption="Tasks land on a real calendar. Pre-production, shoot day, post — your creative sprint is mapped out before you press record."
              bgColor="#BFF5F6"
              captionColor="#3377FF"
            />
          </div>
```

- [ ] **Step 2: Visual check**

Run: `npm run dev`, scroll to the features section.
Expected: three cards titled "Brainstorm with mindmap" (yellow `#FEECB8`), "Summarise your idea" (pink `#FFCDCF`), "Arrange your schedule" (cyan `#BFF5F6`), each with the new caption text in its matching accent color, carousel dots still under the row, scroll-in stagger animation still plays.

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors (removing `<strong>` wrapping means `title` is now a plain string — `FeatureCardProps.title` is already typed `React.ReactNode`, no type change needed).

- [ ] **Step 4: Commit**

```bash
git add components/landing/FeaturesSection.tsx
git commit -m "content: retheme feature cards to mindmap/summarize/schedule copy"
```

---

### Task 4: AISection → "Why Us?" section

**Files:**
- Modify: `components/landing/AISection.tsx`

**Interfaces:**
- Consumes: `public/redesign/{instagram-circle,tiktok-circle,youtube-circle,chrome,clock,lightbulb}.svg` (already downloaded).
- Produces: same orbit/ring GSAP mechanics (`orbitRef`, `ring1Ref`, `ring2Ref`, `iconRefs`, `mascotRef` untouched), new heading, new icon set, two new static callout cards.

- [ ] **Step 1: Replace the `ICONS` array's inline SVGs with image-based icons, and swap Threads for Chrome**

At `components/landing/AISection.tsx:1-57`, replace the whole `ICONS` block:
```tsx
const ICONS = [
  {
    label: "Instagram",
    startAngle: -Math.PI / 2,
    radius: 115,
    speed: gsap.utils.random(5, 15) * 0.001,
    bg: "#E1306C",
    svg: <Image src="/redesign/instagram-circle.svg" alt="" width={20} height={20} className="w-5 h-5" />,
  },
  {
    label: "TikTok",
    startAngle: Math.PI / 2,
    radius: 115,
    speed: gsap.utils.random(5, 15) * 0.001,
    bg: "#010101",
    svg: <Image src="/redesign/tiktok-circle.svg" alt="" width={20} height={20} className="w-5 h-5" />,
  },
  {
    label: "Chrome",
    startAngle: Math.PI,
    radius: 115,
    speed: gsap.utils.random(5, 15) * 0.001,
    bg: "#F2F2F5",
    svg: <Image src="/redesign/chrome.svg" alt="" width={20} height={20} className="w-5 h-5" />,
  },
  {
    label: "YouTube",
    startAngle: 0,
    radius: 115,
    speed: gsap.utils.random(5, 15) * 0.001,
    bg: "#FF0000",
    svg: <Image src="/redesign/youtube-circle.svg" alt="" width={20} height={20} className="w-5 h-5" />,
  },
];
```
This removes the four inline `<svg>` path blocks entirely (they are replaced, not kept alongside).

- [ ] **Step 2: Change the heading**

At `components/landing/AISection.tsx` (inside the `ScrollReveal direction="left"` block):
```tsx
<h2 className="text-5xl font-black text-[#3BA87A] leading-tight">
  All with our<br />Solvi AI
</h2>
```
becomes:
```tsx
<h2 className="text-5xl font-black text-[#3BA87A] leading-tight">
  Why Us?
</h2>
```

- [ ] **Step 3: Add two callout cards flanking the orbit**

Change the section's outer layout from `flex-row items-center justify-between` (2 children) to hold 2 extra children — one before the heading (on desktop, to its left is fine to keep as-is; place the two callouts as a 3-column-on-desktop / stacked-on-mobile layout). Replace the section's return block:
```tsx
  return (
    <section className="w-full py-24 px-6" style={{ background: "linear-gradient(180deg, #EFF7F3 0%, #E8F0F8 100%)" }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-12">

        <ScrollReveal direction="left" className="flex-1">
          <h2 className="text-5xl font-black text-[#3BA87A] leading-tight">
            Why Us?
          </h2>
        </ScrollReveal>

        {/* Orbit system */}
        <div ref={orbitRef} className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
```
to:
```tsx
  return (
    <section className="w-full py-24 px-6" style={{ background: "linear-gradient(180deg, #EFF7F3 0%, #E8F0F8 100%)" }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">

        <ScrollReveal direction="up">
          <h2 className="text-5xl font-black text-[#3BA87A] leading-tight text-center">
            Why Us?
          </h2>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">

          <ScrollReveal direction="right" className="flex items-center gap-3 bg-[#E6EFFF] rounded-2xl px-5 py-4 max-w-[220px]">
            <Image src="/redesign/clock.svg" alt="" width={32} height={32} className="w-8 h-8 shrink-0" />
            <span className="text-sm font-medium text-gray-900">Save your time planning your content</span>
          </ScrollReveal>

          {/* Orbit system */}
          <div ref={orbitRef} className="relative flex items-center justify-center shrink-0" style={{ width: 300, height: 300 }}>
```
and update the closing tags at the end of the same return (after the orbit `</div>` that currently closes right before the section's final `</div></section>`):
```tsx
        </div>

      </div>
    </section>
  );
}
```
becomes:
```tsx
          </div>

          <ScrollReveal direction="left" className="flex items-center gap-3 bg-[#FDE5E3] rounded-2xl px-5 py-4 max-w-[220px]">
            <Image src="/redesign/lightbulb.svg" alt="" width={32} height={32} className="w-8 h-8 shrink-0" />
            <span className="text-sm font-medium text-gray-900">Assist you to become more creative</span>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Visual check**

Run: `npm run dev`, scroll to the "Why Us?" section.
Expected: heading reads "Why Us?", centered above the row; orbit still spins with Instagram/TikTok/Chrome/YouTube icons circling the mascot inside the dashed rings; a light-blue callout ("Save your time planning your content") sits left of the orbit and a light-pink callout ("Assist you to become more creative") sits right of it on desktop, stacked below on mobile (`sm:` breakpoint).

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `svg` field in the `ICONS` array type is inferred as `React.ReactNode` in both the old and new code — no explicit type annotation needed.

- [ ] **Step 6: Commit**

```bash
git add components/landing/AISection.tsx
git commit -m "content: retheme AI orbit section to Why Us with new icon set and callouts"
```

---

### Task 5: CTASection → "Start with one idea"

**Files:**
- Modify: `components/landing/CTASection.tsx`

**Interfaces:**
- Consumes: `public/redesign/pancake.jpg`, existing `Button` component (`variant="coral"` unchanged), existing `ScrollReveal`.
- Produces: same reveal-on-scroll behavior, new mockup/copy/button label, new section background.

- [ ] **Step 1: Replace the extension-popup mockup with a photo card**

At `components/landing/CTASection.tsx:15-46`, replace:
```tsx
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
```
with:
```tsx
          {/* Photo mockup */}
          <ScrollReveal direction="up" className="flex-shrink-0">
            <div className="relative w-[260px] h-[314px] rounded-[30px] overflow-hidden shadow-xl bg-[#FEECB8]">
              <Image src="/redesign/pancake.jpg" alt="" fill sizes="260px" className="object-cover" />
            </div>
          </ScrollReveal>
```

- [ ] **Step 2: Change the headline**

At `components/landing/CTASection.tsx:49-53`:
```tsx
          {/* Headline */}
          <ScrollReveal direction="right" delay={0.15} className="flex-1 max-w-[260px]">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              Ready to stop hoarding and start scrolling for hits?
            </h2>
          </ScrollReveal>
```
becomes:
```tsx
          {/* Headline */}
          <ScrollReveal direction="right" delay={0.15} className="flex-1 max-w-[320px] flex flex-col gap-3">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C8F8F] leading-snug">
              Start with one idea.
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              No brief. No template. Just type what&apos;s in your head — Solvi does the rest.
            </p>
          </ScrollReveal>
```

- [ ] **Step 3: Relabel the button and change section background**

At `components/landing/CTASection.tsx:9`:
```tsx
    <section className="w-full py-20 px-6 bg-[#F5F0E8]">
```
becomes:
```tsx
    <section className="w-full py-20 px-6 bg-[#F2F2F5]">
```
At `components/landing/CTASection.tsx:58-62`:
```tsx
        <ScrollReveal direction="up" delay={0.3}>
          <Button variant="coral" href="#download" className="px-10 py-4 text-base">
            Download Solvi
          </Button>
        </ScrollReveal>
```
becomes:
```tsx
        <ScrollReveal direction="up" delay={0.3}>
          <Button variant="coral" href="#download" className="px-10 py-4 text-base">
            Let&apos;s go
          </Button>
        </ScrollReveal>
```

- [ ] **Step 4: Visual check**

Run: `npm run dev`, scroll to the bottom CTA section.
Expected: light-gray (`#F2F2F5`) section background, a rounded pancake photo card on one side, "Start with one idea." in teal + the new subtext on the other, and a coral "Let's go" pill button below, all still fading in on scroll via `ScrollReveal`.

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. Confirm no remaining reference to `/face.png` import needs adjusting — `Image` import stays since the photo mockup still uses `next/image`.

- [ ] **Step 6: Commit**

```bash
git add components/landing/CTASection.tsx
git commit -m "content: replace extension mockup with photo card, update CTA copy to Start with one idea"
```

---

### Task 6: Final full-page verification

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: build succeeds with no type or lint errors, no missing asset warnings for `public/redesign/*`.

- [ ] **Step 2: Full-page visual pass against Figma**

Run: `npm run dev`, open `http://localhost:3000` at a desktop width (≥1280px) and a mobile width (~390px).
Expected, top to bottom: Hero (new copy, unchanged mascot/pill animation) → Features (3 retitled/recolored cards + dots) → Why Us (new heading, 4-icon orbit incl. Chrome, 2 callout cards) → CTA (pancake photo, "Start with one idea.", "Let's go" button). No section duplicated (confirms `MotionSection` removal didn't leave an empty gap or duplicate feature cards), no layout overflow at either width.

- [ ] **Step 3: Commit (if any cleanup was needed)**

```bash
git status
```
If clean, no commit needed — this task is verification-only.
