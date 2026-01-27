import React, { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle.jsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 transition-shadow " +
        (scrolled ? "shadow-lg" : "shadow-none")
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Logo (clickable to initial section) */}
        <a
          href="#about"
          className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--mint-600)] rounded-xl"
          aria-label="미톡스 외과의원 홈으로 이동"
        >
          <img
            src="/img/mitoxLOGO.jpg"
            alt="미톡스 외과의원 로고"
            className="h-9 w-auto object-contain"
            width="180"
            height="36"
            loading="eager"
            decoding="async"
          />
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-tight group-hover:opacity-90">
              미톡스 외과의원
            </div>
            <div className="text-xs opacity-70">피부 • 레이저 • 관리</div>
          </div>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-3">
          <a
            href="#about"
            className="px-3 py-2 text-sm opacity-80 hover:opacity-100"
          >
            About
          </a>
          <a
            href="#gallery"
            className="px-3 py-2 text-sm opacity-80 hover:opacity-100"
          >
            Gallery
          </a>
          <a
            href="#location"
            className="px-3 py-2 text-sm opacity-80 hover:opacity-100"
          >
            Visit
          </a>
          <a
            href="#blog"
            className="px-3 py-2 text-sm opacity-80 hover:opacity-100"
          >
            Blog
          </a>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}