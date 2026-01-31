import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { MapPin, Clock3, Phone, Globe } from "lucide-react";

export default function LocationHours() {
  return (
    <section id="location" className="scroll-mt-20">
      <ScrollReveal dir="up">
        <div className="card p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">오시는 길</h2>

              {/* Address */}
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5" size={18} />
                <div>
                  <div>서울 송파구 가락로 183 2층 9호</div>
                  <div className="opacity-70">상가 좌측 전용계단 이용</div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 text-sm">
                <Clock3 className="mt-0.5 shrink-0" size={18} />
                <dl className="grid grid-cols-[auto,1fr] items-baseline gap-x-3 gap-y-1.5">
                  <dt>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-pink-200/70 dark:bg-pink-300/30 font-semibold">
                      화요일 · 수요일 · 토요일 · 일요일 · 공휴일
                    </span>
                  </dt>
                  <dd>오전 10시 – 오후 5시</dd>

                  <dt>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-pink-200/70 dark:bg-pink-300/30 font-semibold">
                      월요일 · 금요일
                    </span>
                  </dt>
                  <dd>오후 7시까지 (야간 진료)</dd>

                  <dt>  
                    <span className="inline-block px-1.5 py-0.5 rounded bg-pink-200/70 dark:bg-pink-300/30 font-semibold">
                      목요일
                    </span>
                  </dt>
                  <dd>휴무</dd>

                </dl>
              </div>


              {/* Phone */}
              <div className="flex items-start gap-3 text-sm">
                <Phone className="mt-0.5" size={18} />
                <a href="tel:0507-1333-6631" className="underline-offset-2 hover:underline">
                0507-1333-6631
                </a>
              </div>
            </div>

            {/* Right: Map */}
            <div className="rounded-xl overflow-hidden min-h-72">
              <iframe
                title="clinic-map"
                className="w-full h-72 sm:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=183%20Garak-ro%2C%20Songpa%20District%2C%20Seoul%2C%20South%20Korea&output=embed"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
