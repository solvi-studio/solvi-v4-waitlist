"use client";

interface CarouselDotsProps {
  count: number;
  active: number;
  onChange: (index: number) => void;
}

export function CarouselDots({ count, active, onChange }: CarouselDotsProps) {
  return (
    <div className="flex gap-2 items-center justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="rounded-full transition-all duration-300 cursor-pointer"
          style={{
            width: i === active ? 28 : 10,
            height: 10,
            backgroundColor: i === active ? "#5DB075" : "#C8C8C8",
          }}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
