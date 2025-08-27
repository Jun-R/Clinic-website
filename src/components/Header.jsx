import React, { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle.jsx";
import { LogIn, LogOut, Lock, LockOpen } from "lucide-react";

const AUTH_KEY = "clinic_owner_auth";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialize auth from session/local (fallback to local for older data)
  useEffect(() => {
    const hasAuth =
      sessionStorage.getItem(AUTH_KEY) === "1" ||
      localStorage.getItem(AUTH_KEY) === "1";
    setIsOwner(hasAuth);
  }, []);

  // Always log out on exit (tab close, refresh, navigate away)
  useEffect(() => {
    const handleExit = () => {
      try {
        sessionStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(AUTH_KEY);
        window.dispatchEvent(new Event("owner-auth-changed"));
      } catch {}
    };
    window.addEventListener("pagehide", handleExit);
    window.addEventListener("beforeunload", handleExit);
    return () => {
      window.removeEventListener("pagehide", handleExit);
      window.removeEventListener("beforeunload", handleExit);
    };
  }, []);

  const login = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = form.get("user");
    const pass = form.get("pass");

    if (user === "mimi" && pass === "miami141") {
      // store in session so it clears when tab closes
      sessionStorage.setItem(AUTH_KEY, "1");
      // remove any old local key
      localStorage.removeItem(AUTH_KEY);

      setIsOwner(true);
      setAuthOpen(false);
      alert("로그인!");
      window.dispatchEvent(new Event("owner-auth-changed"));
    } else {
      alert("아이디나 비번이 틀렸어용");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    setIsOwner(false);
    setAuthOpen(false);
    window.dispatchEvent(new Event("owner-auth-changed"));
  };

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
          <a href="#about" className="px-3 py-2 text-sm opacity-80 hover:opacity-100">About</a>
          <a href="#gallery" className="px-3 py-2 text-sm opacity-80 hover:opacity-100">Gallery</a>
          <a href="#location" className="px-3 py-2 text-sm opacity-80 hover:opacity-100">Visit</a>
          <a href="#blog" className="px-3 py-2 text-sm opacity-80 hover:opacity-100">Blog</a>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Owner auth */}
          <div className="relative">
            <button
              onClick={() => setAuthOpen((v) => !v)}
              className="diag-hover inline-flex items-center gap-2 rounded-none px-3 py-2 text-sm border border-black/10 dark:border-white/10"
              title={isOwner ? "Owner (logged in)" : "Owner login"}
            >
              {isOwner ? (
                <LockOpen size={18} strokeWidth={1.75} />
              ) : (
                <Lock size={18} strokeWidth={1.75} />
              )}
            </button>

            {authOpen && (
              <div className="absolute right-0 mt-2 w-64 card p-3 z-50">
                {isOwner ? (
                  <div className="space-y-3">
                    <div className="text-sm">Logged in as <b>Hesed</b></div>
                    <button
                      onClick={logout}
                      className="diag-hover inline-flex items-center gap-2 rounded-none px-3 py-2 text-sm border border-black/10 dark:border-white/10 w-full"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <form onSubmit={login} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium opacity-80">
                      <LogIn size={16} /> Owner Login
                    </div>
                    <input
                      name="user"
                      placeholder="username"
                      className="w-full rounded-lg px-3 py-2 bg-transparent border border-black/10 dark:border-white/10"
                    />
                    <input
                      name="pass"
                      type="password"
                      placeholder="password"
                      className="w-full rounded-lg px-3 py-2 bg-transparent border border-black/10 dark:border-white/10"
                    />
                    <button className="diag-hover rounded-none px-3 py-2 text-sm font-semibold text-white bg-[color:var(--pink-500)] w-full">
                      Login
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
