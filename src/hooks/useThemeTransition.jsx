import { createContext, useContext, useState, useEffect } from "react";

const ThemeTransitionContext = createContext(null);

export function ThemeTransitionProvider({ children }) {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "light";
    return document.documentElement.classList.contains("light") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches);
  });

  // transitionState: "idle" | "covering" | "revealing"
  const [transitionState, setTransitionState] = useState("idle");

  useEffect(() => {
    // Set initial class on documentElement
    if (isLightTheme) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  // Sync transitionState with class list for CSS hook animations
  useEffect(() => {
    if (transitionState !== "idle") {
      document.documentElement.classList.add("theme-transitioning");
    } else {
      document.documentElement.classList.remove("theme-transitioning");
    }
  }, [transitionState]);

  const toggleTheme = () => {
    if (transitionState !== "idle") return;

    // Phase 1: Start covering the screen with the wave
    setTransitionState("covering");

    // Phase 2: At the peak of covering (650ms), flip the theme and start revealing
    setTimeout(() => {
      setIsLightTheme((prev) => {
        const next = !prev;
        if (next) {
          document.documentElement.classList.add("light");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.classList.remove("light");
          localStorage.setItem("theme", "dark");
        }
        return next;
      });
      setTransitionState("revealing");

      // Phase 3: At the end of revealing (650ms later), reset to idle
      setTimeout(() => {
        setTransitionState("idle");
      }, 650);
    }, 650);
  };

  return (
    <ThemeTransitionContext.Provider
      value={{
        isLightTheme,
        transitionState,
        toggleTheme,
      }}
    >
      {children}
    </ThemeTransitionContext.Provider>
  );
}

export function useThemeTransition() {
  const context = useContext(ThemeTransitionContext);
  if (!context) {
    throw new Error("useThemeTransition must be used within a ThemeTransitionProvider");
  }
  return context;
}
