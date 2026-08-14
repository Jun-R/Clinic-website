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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative gap-3">
        {/* Left: logo + 예약하기 */}
        <div className="flex items-center gap-3 min-w-0">
          <a
            href="#about"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--pink-600)] rounded-xl shrink-0"
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
            <div className="leading-tight hidden sm:block">
              <div className="text-base font-semibold tracking-tight group-hover:opacity-90">
                미톡스 외과의원
              </div>
              <div className="text-xs opacity-70">피부 • 레이저 • 관리</div>
            </div>
          </a>

          <a
            href="https://map.naver.com/p/entry/place/1225820706?lng=127.1145353&lat=37.5051720&placePath=%2Fbooking%3FbookingRedirectUrl%3Dhttps%3A%2F%2Fm.booking.naver.com%2Fbooking%2F13%2Fbizes%2F1053453%3Ftheme%3Dplace%26entry%3Dpll%26lang%3Dko%26entry%3Dpll&area=pll&c=15.00,0,0,0,dh"
            target="_blank"
            rel="noopener noreferrer"
            className="diag-hover inline-flex items-center justify-center shrink-0 rounded-none px-5 py-2.5 text-sm font-semibold text-white bg-[color:var(--pink-600)] hover:bg-[color:var(--pink-400)]"
          >
            예약하기
          </a>
        </div>

        {/* Right: section links + dark mode */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <a
              href="#about"
              className="px-3 py-2 text-sm opacity-80 hover:opacity-100"
            >
              소개
            </a>

            <a
              href="#blog"
              className="px-3 py-2 text-sm opacity-80 hover:opacity-100"
            >
              이벤트
            </a>

            <a
              href="#reviews"
              className="px-3 py-2 text-sm opacity-80 hover:opacity-100"
            >
              미톡스 후기
            </a>

            <a
              href="#location"
              className="px-3 py-2 text-sm opacity-80 hover:opacity-100"
            >
              오시는 길
            </a>
          </nav>

          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
