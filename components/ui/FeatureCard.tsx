interface FeatureCardProps {
  title: React.ReactNode;
  image: React.ReactNode;
  caption: React.ReactNode;
  captionColor?: string;
  badge?: string;
  bgColor?: string;
  roration?: number;
}

export function FeatureCard({ title, image, caption, captionColor = "#F4756A", badge, bgColor = "#FFF9E6" , roration = 0}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 max-w-[220px]">
      <h3 className="text-center text-[15px] text-gray-800 leading-snug font-inter font-[500]">{title}</h3>

      <div className="relative w-[200px] h-[260px] rounded-2xl overflow-hidden flex items-center justify-center rotate-(--rotation)" style={{ backgroundColor: bgColor, "--rotation": `${roration}deg` } as React.CSSProperties }>
        {badge && <span className="absolute top-3 right-3 text-xs text-gray-400">{badge}</span>}
        {image}
      </div>

      <p className="text-center text-xs font-medium leading-relaxed" style={{ color: captionColor }}>{caption}</p>
    </div>
  );
}
