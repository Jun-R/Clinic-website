import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";

export default function About() {
  return (
    <section id="about" className="pt-10 sm:pt-14">
      <ScrollReveal>
        <div className="card p-6 sm:p-10">
          {/* min-w-0 prevents overflow from children at larger breakpoints */}
          <div className="grid items-center gap-8 md:grid-cols-2 min-w-0">
            <div className="space-y-4 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                빛나는 미톡스!
              </h1>
              <p className="text-sm/6 opacity-85">
                미톡스 클리닉은 고객의 미용과 건강 요구를 충족시키는데 최적화된 곳이며,
                모든 고객들에게 환상적인 경험을 선사합니다!
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="#blog"
                  className="diag-hover inline-flex items-center justify-center rounded-none px-5 py-2.5 text-sm font-semibold text-white bg-[color:var(--mint-600)] hover:brightness-110"
                >
                  블로그
                </a>
                <a
                  href="#gallery"
                  className="diag-hover inline-flex items-center justify-center rounded-none px-5 py-2.5 text-sm font-semibold border border-black/10 dark:border-white/10"
                >
                  갤러리
                </a>
              </div>
            </div>

            <div className="relative min-w-0">
              {/* glow backdrop */}
              <div className="absolute -inset-3 -z-10 rounded-2xl bg-[color:var(--mint-200)]/50 blur-xl" />

              {/* aspect-ratio lock + clipped corners */}
              <div className="rounded-2xl overflow-hidden w-full max-w-[600px] 2xl:max-w-[450px] mx-auto">
                <img
                  src="/img/info.jpg"
                  alt="Clinic interior"
                  className="w-full aspect-[1/1] object-cover"
                  width="1200"
                  height="800"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
