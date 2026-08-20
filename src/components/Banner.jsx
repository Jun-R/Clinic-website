import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Put gallery images in public/img/ and list them here.
// Optional: { src, position } — position is a Tailwind object-* class (e.g. object-[center_35%]).
const galleryImages = [
  { src: "/img/내부핑크1.jpg", position: "object-[center_50%]" },
  { src: "/img/줄기메타셀LONG.png", position: "object-[47%_50%]" },
  "img/타임라인LONG.png",
  "/img/내부2.jpg",
  { src: "/img/cutebearmask.jpg", position: "object-[center_40%]" },
  { src: "/img/내부1.jpg", position: "object-[center_60%]" },
  { src: "/img/cutebearsethoscope.jpg", position: "object-[center_10%]" },
  { src: "/img/내부램프.jpg", position: "object-[center_55%]" },
  { src: "/img/좌측입구.jpg", position: "object-[center_30%]" },
  { src: "/img/클스방석.jpg", position: "object-[center_60%]" },

];

export default function Banner() {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef(null);
  const slideRefs = useRef([]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || galleryImages.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (!best) return;
        const index = Number(best.target.dataset.index);
        if (!Number.isNaN(index)) setActive(index);
      },
      {
        root,
        threshold: [0.55, 0.75, 0.9],
      }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, []);

  function goTo(index) {
    const slide = slideRefs.current[index];
    if (!slide) return;
    slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(index);
  }

  if (galleryImages.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-20 w-full">
      <div className="relative w-full overflow-hidden bg-black/5 dark:bg-white/5 aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2.2/1]">
        <div
          ref={scrollerRef}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          aria-label="클리닉 인테리어 갤러리"
        >
          {galleryImages.map((item, i) => {
            const src = typeof item === "string" ? item : item.src;
            const position =
              typeof item === "string" ? "object-center" : item.position || "object-center";

            return (
              <img
                key={src}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                data-index={i}
                src={src}
                alt={`클리닉 인테리어 ${i + 1}`}
                className={
                  "h-full w-full min-w-full basis-full shrink-0 grow-0 snap-start snap-always object-cover brightness-[0.82] contrast-[0.95] " +
                  position
                }
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden="true" />

        <AnimatePresence>
          {active === 0 && (
            <motion.div
              key="mitox-brand"
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
            >
              <h2 className="font-tenor text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.2em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
                Mitox
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {galleryImages.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center sm:bottom-5">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur-sm">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${i + 1}번째 사진`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className={
                    "h-2 w-2 rounded-full transition-all duration-200 " +
                    (i === active
                      ? "bg-white scale-110"
                      : "bg-white/45 hover:bg-white/70")
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
