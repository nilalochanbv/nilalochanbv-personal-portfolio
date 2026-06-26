import { motion } from "framer-motion";
import { useThemeTransition } from "../../hooks/useThemeTransition";

const COVER_PATHS = [
  "M 100 0 L 100 0 C 100 0, 100 100, 100 100 L 100 100 Z", // Initial
  "M 100 0 L 70 0 C 80 30, 90 60, 100 80 L 100 100 Z",   // Wave 1
  "M 100 0 L 30 0 C 50 40, 70 80, 100 95 L 100 100 Z",   // Wave 2
  "M 100 0 L 0 0 C 0 50, 0 100, 0 100 L 100 100 Z"       // Covered
];

const REVEAL_PATHS = [
  "M 0 100 L 0 0 C 50 0, 100 50, 100 100 L 0 100 Z",     // Covered
  "M 0 100 L 0 20 C 35 30, 70 70, 80 100 L 0 100 Z",     // Wave 1
  "M 0 100 L 0 60 C 20 70, 40 85, 45 100 L 0 100 Z",     // Wave 2
  "M 0 100 L 0 100 C 0 100, 0 100, 0 100 L 0 100 Z"      // Cleared
];

export default function LiquidOverlay() {
  const { transitionState, isLightTheme } = useThemeTransition();

  if (transitionState === "idle") return null;

  // Determine wave fill color based on the target theme
  const isTargetLight = transitionState === "covering" ? !isLightTheme : isLightTheme;
  const overlayColor = isTargetLight ? "#ffffff" : "#060713";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={transitionState === "covering" ? COVER_PATHS[0] : REVEAL_PATHS[0]}
          animate={{
            d: transitionState === "covering" ? COVER_PATHS : REVEAL_PATHS
          }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1]
          }}
          fill={overlayColor}
        />
      </svg>
    </div>
  );
}
