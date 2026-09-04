import { cn } from "@/lib/utils";

type OverlayProps = {
  variant?: "gradient" | "flat";
  intensity?: "light" | "medium" | "dark";
  direction?: "to-b" | "to-t" | "to-r" | "to-l";
  className?: string;
};

export default function Overlay({
  variant = "gradient",
  intensity = "medium",
  direction = "to-b",
  className,
}: OverlayProps) {
  const gradientMap = {
    "to-b": "bg-gradient-to-b",
    "to-t": "bg-gradient-to-t",
    "to-r": "bg-gradient-to-r",
    "to-l": "bg-gradient-to-l",
  };

  const gradientIntensityMap = {
    light: "from-[#0B0B0B]/10 via-[#0B0B0B]/25 to-[#0B0B0B]/50",
    medium: "from-[#0B0B0B]/20 via-[#0B0B0B]/40 to-[#0B0B0B]/70",
    dark: "from-[#0B0B0B]/30 via-[#0B0B0B]/55 to-[#0B0B0B]/85",
  };

  const flatIntensityMap = {
    light: "bg-[#0B0B0B]/30",
    medium: "bg-[#0B0B0B]/50",
    dark: "bg-[#0B0B0B]/70",
  };

  if (variant === "flat") {
    return (
      <div
        className={cn("absolute inset-0 -z-10", flatIntensityMap[intensity], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 -z-10",
        gradientMap[direction],
        gradientIntensityMap[intensity],
        className
      )}
    />
  );
}