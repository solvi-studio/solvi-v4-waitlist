"use client"

import gsap from "gsap"
import { useEffect, useRef } from "react"
import { useUiStore } from "@/hooks/useUiStore"

const EDGE_THRESHOLD = 120; // px from edge to flip
const TEXT_OFFSET = 16;     // px gap from cursor center

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const hasMovedRef = useRef(false);
    const cursorText = useUiStore((s) => s.cursorText);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const textEl = textRef.current;
        if (!cursor || !follower || !textEl) return;

        gsap.set([cursor, follower, textEl], { opacity: 0 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent): void => {
            const { clientX: x, clientY: y } = e;
            const nearRight = x > window.innerWidth - EDGE_THRESHOLD;
            const nearBottom = y > window.innerHeight - EDGE_THRESHOLD;

            if (!hasMovedRef.current) {
                hasMovedRef.current = true;
                gsap.set(cursor, { x, y });
                gsap.set(follower, { x, y });
                gsap.to([cursor, follower, textEl], { opacity: 1, duration: 0.3 });
            }

            gsap.to(follower, { x, y, duration: 0.5, ease: "sine.out" });
            gsap.to(cursor, { x, y, duration: 0.2 });

            // Position text: flip horizontally near right edge, vertically near bottom
            const textX = nearRight ? x - TEXT_OFFSET : x + TEXT_OFFSET;
            const textY = nearBottom ? y - TEXT_OFFSET : y + TEXT_OFFSET;
            const xAnchor = nearRight ? "-100%" : "0%";
            const yAnchor = nearBottom ? "-100%" : "0%";

            gsap.to(textEl, {
                x: textX,
                y: textY,
                xPercent: parseFloat(xAnchor),
                yPercent: parseFloat(yAnchor),
                duration: 0.2,
            });
        };

        const onEnterInteractive = () => {
            gsap.to(follower, { scale: 2.5, opacity: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(cursor, { scale: 0, duration: 0.2 });
        };

        const onLeaveInteractive = () => {
            gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        };

        const addInteractiveListeners = () => {
            const interactives = document.querySelectorAll("a, button, [data-cursor]");
            interactives.forEach((el) => {
                el.addEventListener("mouseenter", onEnterInteractive);
                el.addEventListener("mouseleave", onLeaveInteractive);
            });
        };

        addInteractiveListeners();

        const observer = new MutationObserver(addInteractiveListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();
            document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
                el.removeEventListener("mouseenter", onEnterInteractive);
                el.removeEventListener("mouseleave", onLeaveInteractive);
            });
        };
    }, []);

    // Fade text in/out when cursorText changes
    useEffect(() => {
        const textEl = textRef.current;
        if (!textEl || !hasMovedRef.current) return;
        if (cursorText) {
            gsap.to(textEl, { opacity: 1, y: "-=4", duration: 0.2 });
        } else {
            gsap.to(textEl, { opacity: 0, duration: 0.15 });
        }
    }, [cursorText]);

    return (
        <div className="sm-md:hidden z-10">
            <div
                ref={followerRef}
                className="w-[50px] h-[50px] rounded-full bg-transparent border-black border-2 border-solid fixed z-50 mix-blend-difference pointer-events-none"
            />
            <div
                ref={cursorRef}
                className="w-[10px] h-[10px] rounded-full bg-black fixed z-50 mix-blend-difference pointer-events-none"
            />
            <div
                ref={textRef}
                className={`opacity-0 fixed z-50 pointer-events-none text-xs font-medium tracking-wide text-black mix-blend-difference whitespace-nowrap ${cursorText ? "p-1 bg-amber-500" : ""}`}
            >
                {cursorText}
            </div>
        </div>
    );
}

export default CustomCursor;
