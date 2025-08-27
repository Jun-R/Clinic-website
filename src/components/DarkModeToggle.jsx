import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  // Initialize from localStorage or system
  useEffect(() => {
    const pref = localStorage.getItem("theme") || "";
    const isDark = pref
      ? pref === "dark"
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      aria-pressed={dark}
      onClick={() => setDark((d) => !d)}
      className="diag-hover inline-flex items-center justify-center rounded-none px-3 py-2 border border-black/10 dark:border-white/10 text-sm"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
