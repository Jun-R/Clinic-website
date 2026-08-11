import React, { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const EVENTS_DATA = [
  {
    id: 1,
    title: "내 몸에서 시작하는 자연스러운 변화",
    //date: "2024. 12. 01 ~ 2025. 02. 28",
    description: "자가혈을 활용한 재생 시술로 자연스럽고 조화로운 변화를 경험해보세요",
    imageUrls: [
      "/img/줄기메타셀.png",
      "/img/MCT.png",
      "/img/타임라인.png",
      "/img/프리미엄하이브리드.png",
      "/img/전신항산화.png",
      "/img/피부집중.png",
    ],
    videoUrl: "/img/26서머미톡스.mp4",
  },
];

const mediaClass =
  "h-64 sm:h-80 lg:h-[28rem] w-auto max-w-none shrink-0 snap-start rounded-xl border border-black/5 dark:border-white/5 bg-black/5 object-contain select-none";

function InViewVideo({ src, className, title }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const forceSilent = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    };

    forceSilent();

    const onVolumeChange = () => forceSilent();
    const onPlay = () => forceSilent();

    video.addEventListener("volumechange", onVolumeChange);
    video.addEventListener("play", onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          forceSilent();
          const playPromise = video.play();
          if (playPromise?.catch) playPromise.catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("volumechange", onVolumeChange);
      video.removeEventListener("play", onPlay);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      data-event-card
      src={src}
      className={className}
      muted
      defaultMuted
      playsInline
      loop
      controls
      controlsList="novolume noaudio"
      disablePictureInPicture
      preload="metadata"
      aria-label={title ? `${title} 영상` : "이벤트 영상"}
    />
  );
}

function EventImageCarousel({ images, videoUrl, title }) {
  const scrollerRef = useRef(null);
  const items = [
    ...(videoUrl ? [{ type: "video", src: videoUrl }] : []),
    ...images.map((src) => ({ type: "image", src })),
  ];

  if (!items.length) return null;

  function scrollByDir(dir) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-event-card]");
    const step = card ? card.getBoundingClientRect().width + 12 : el.clientWidth * 0.6;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  const navBtnClass =
    "shrink-0 self-center rounded-full border border-black/10 bg-black/[0.04] p-1.5 text-black/55 shadow-sm transition hover:bg-black/[0.08] hover:text-black dark:border-white/15 dark:bg-white/[0.06] dark:text-white/65 dark:hover:bg-white/[0.12] dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pink-600)] disabled:opacity-30";

  const showArrows = items.length > 1;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {showArrows && (
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          aria-label="이전 이미지"
          className={navBtnClass}
        >
          <ChevronLeft size={22} strokeWidth={2.25} aria-hidden />
        </button>
      )}

      <div
        ref={scrollerRef}
        className="flex min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label={`${title} 미디어`}
      >
        {items.map((item, i) =>
          item.type === "video" ? (
            <InViewVideo
              key={`video-${item.src}`}
              src={item.src}
              title={title}
              className={mediaClass}
            />
          ) : (
            <img
              key={`${item.src}-${i}`}
              data-event-card
              src={item.src}
              alt={`${title} — ${i + 1}번째 이미지`}
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={mediaClass}
            />
          )
        )}
      </div>

      {showArrows && (
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          aria-label="다음 이미지"
          className={navBtnClass}
        >
          <ChevronRight size={22} strokeWidth={2.25} aria-hidden />
        </button>
      )}
    </div>
  );
}

export default function BlogSidebar() {
  return (
    <ScrollReveal dir="up">
      <div className="card p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar size={20} className="opacity-70" />
            이벤트 & 소식
          </h3>
        </div>

        <div className="space-y-8">
          {EVENTS_DATA.map((event) => {
            const images = event.imageUrls ?? (event.imageUrl ? [event.imageUrl] : []);
            return (
              <article key={event.id} className="flex flex-col gap-3">
                <EventImageCarousel
                  images={images}
                  videoUrl={event.videoUrl}
                  title={event.title}
                />

                <div className="max-w-2xl">
                  <h4 className="font-semibold leading-tight text-[color:var(--pink-600)]">
                    {event.title}
                  </h4>

                  {event.date && (
                    <div className="text-xs font-medium opacity-60 mt-1 mb-2">{event.date}</div>
                  )}

                  {event.description && (
                    <p className="text-sm opacity-80 leading-relaxed whitespace-pre-wrap mt-1">
                      {event.description}
                    </p>
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
