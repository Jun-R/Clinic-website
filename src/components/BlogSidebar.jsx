import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const EVENTS_DATA = [
  {
    id: 1,
    title: "싱그러운 봄을 담은 화사함",
    //date: "2024. 12. 01 ~ 2025. 02. 28",
    description: "미톡스에서 여름 준비하자!", // Add description
    // IMPORTANT: Use forward slashes (/) for web paths. Replace placeholders with real files under public/img/.
    imageUrls: [
      "/img/spring1.jpg",
      "/img/spring2.jpg",
      "/img/spring3.jpg",
      "/img/spring4.jpg",
    ],
  },
];

const slideTransition = { type: "tween", duration: 0.38, ease: [0.32, 0.72, 0, 1] };

function EventImageCarousel({ images, title }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const stepPct = 100 / count;

  const goPrev = () => setIndex((i) => (i - 1 + count) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  if (!count) return null;

  if (count === 1) {
    return (
      <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-black/5">
        <img src={images[0]} alt={title} className="w-full h-auto object-cover block" />
      </div>
    );
  }

  const navBtnClass =
    "shrink-0 self-center rounded-full border border-black/10 bg-black/[0.04] p-1.5 text-black/55 shadow-sm transition hover:bg-black/[0.08] hover:text-black dark:border-white/15 dark:bg-white/[0.06] dark:text-white/65 dark:hover:bg-white/[0.12] dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--mint-600)]";

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button type="button" onClick={goPrev} aria-label="이전 이미지" className={navBtnClass}>
        <ChevronLeft size={22} strokeWidth={2.25} aria-hidden />
      </button>

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-black/5">
        <motion.div
          className="flex"
          style={{ width: `${count * 100}%` }}
          initial={false}
          animate={{ x: `${-index * stepPct}%` }}
          transition={slideTransition}
        >
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="shrink-0" style={{ flex: `0 0 ${stepPct}%` }}>
              <img
                src={src}
                alt={i === index ? `${title} — ${i + 1}번째 이미지` : ""}
                aria-hidden={i !== index}
                draggable={false}
                className="w-full h-auto select-none object-cover block"
              />
            </div>
          ))}
        </motion.div>

        <div
          className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium tabular-nums text-white backdrop-blur-sm sm:text-[11px]"
          aria-hidden
        >
          {index + 1} / {count}
        </div>
      </div>

      <button type="button" onClick={goNext} aria-label="다음 이미지" className={navBtnClass}>
        <ChevronRight size={22} strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}

export default function BlogSidebar() {
  return (
    <ScrollReveal dir="left">
      <div className="card p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar size={20} className="opacity-70" />
            이벤트 & 소식
          </h3>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {EVENTS_DATA.map((event) => {
            const images = event.imageUrls ?? (event.imageUrl ? [event.imageUrl] : []);
            return (
              <article key={event.id} className="flex flex-col gap-3">
                <EventImageCarousel images={images} title={event.title} />

                <div>
                  <h4 className="font-semibold leading-tight text-[color:var(--mint-600)]">{event.title}</h4>

                  {event.date && (
                    <div className="text-xs font-medium opacity-60 mt-1 mb-2">{event.date}</div>
                  )}

                  {event.description && (
                    <p className="text-sm opacity-80 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                  )}
                </div>
              </article>
            );
          })}

          {EVENTS_DATA.length === 0 && (
            <div className="text-sm opacity-70 py-6 text-center">진행 중인 이벤트가 없습니다.</div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
