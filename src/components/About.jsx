import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";

export default function About() {
  return (
    <section id="about" className="pt-10 sm:pt-14">
      <ScrollReveal>
        <div className="card p-6 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2 min-w-0">
            <div className="space-y-4 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                자연스러운 변화, 미톡스
              </h1>
              <p className="text-sm/6 opacity-85">
                1인 원장이 진료하는 미톡스 클리닉은 고객의 청춘과 건강을 위한 체계적이고 합리적인 접근으로 가시적인 결과를 가져오는 환상적인 경험을 선사합니다!
              </p>
            </div>

            <div className="relative min-w-0">
              <div className="absolute -inset-3 -z-10 rounded-2xl bg-[color:var(--pink-200)]/50 blur-xl" />
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
