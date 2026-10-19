import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const WALK_SRC = "/img/chickWalk.gif";
const IDLE_SRC = "/img/chickIDLE.gif";

const LINES = ["갤러리 한번 보세요!", "후기도 꼼꼼히!"];

const SIZE = 144; // walk display size
const IDLE_SIZE = 72;
// Idle art sits lower in-frame than walk — lift to roughly match feet
const IDLE_Y_NUDGE = -((SIZE - IDLE_SIZE) / 2) * 1.0;
const SPEED_PX_PER_SEC = 55;
const IDLE_DWELL_MS_MIN = 3000;
const IDLE_DWELL_MS_MAX = 5000;

// Interactive UI the mascot must not cover (viewport space)
const AVOID_SELECTORS = [
  "header",
  'iframe[title="clinic-map"]',
  "a.diag-hover",
  'button:not([aria-label="mascot"])',
];
const AVOID_PAD = 16;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function getBounds() {
  const pad = 8;
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    minX: pad,
    maxX: Math.max(pad, w - SIZE - pad),
    minY: Math.max(pad, h * 0.62),
    maxY: Math.max(pad, h - SIZE - pad),
  };
}

function getAvoidRects() {
  const rects = [];
  for (const sel of AVOID_SELECTORS) {
    document.querySelectorAll(sel).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      if (r.bottom < 0 || r.top > window.innerHeight || r.right < 0 || r.left > window.innerWidth) {
        return;
      }
      rects.push({
        left: r.left - AVOID_PAD,
        top: r.top - AVOID_PAD,
        right: r.right + AVOID_PAD,
        bottom: r.bottom + AVOID_PAD,
      });
    });
  }
  return rects;
}

function overlapsAvoid(x, y, rects) {
  const left = x;
  const top = y;
  const right = x + SIZE;
  const bottom = y + SIZE;
  return rects.some(
    (r) => left < r.right && right > r.left && top < r.bottom && bottom > r.top
  );
}

function pathHitsAvoid(from, to, rects) {
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = from.x + (to.x - from.x) * t;
    const y = from.y + (to.y - from.y) * t;
    if (overlapsAvoid(x, y, rects)) return true;
  }
  return false;
}

function clampToBounds(x, y) {
  const b = getBounds();
  return {
    x: Math.min(b.maxX, Math.max(b.minX, x)),
    y: Math.min(b.maxY, Math.max(b.minY, y)),
  };
}

/** Push a point out of avoid rects within roam bounds (best-effort). */
function findSafePos(x, y, rects) {
  let pos = clampToBounds(x, y);
  if (!overlapsAvoid(pos.x, pos.y, rects)) return pos;

  const b = getBounds();
  const candidates = [
    { x: b.minX, y: b.maxY },
    { x: b.maxX, y: b.maxY },
    { x: b.minX, y: b.minY },
    { x: b.maxX, y: b.minY },
    { x: (b.minX + b.maxX) / 2, y: b.maxY },
    { x: b.minX, y: (b.minY + b.maxY) / 2 },
    { x: b.maxX, y: (b.minY + b.maxY) / 2 },
  ];
  for (const c of candidates) {
    if (!overlapsAvoid(c.x, c.y, rects)) return c;
  }

  // Last resort: sample the roam band
  for (let i = 0; i < 30; i++) {
    const sample = {
      x: randomInRange(b.minX, b.maxX),
      y: randomInRange(b.minY, b.maxY),
    };
    if (!overlapsAvoid(sample.x, sample.y, rects)) return sample;
  }
  return pos;
}

function clampPos(x, y) {
  return findSafePos(x, y, getAvoidRects());
}

function randomTarget(from) {
  const b = getBounds();
  const rects = getAvoidRects();
  const fromPos = typeof from === "number" ? { x: from, y: posFallbackY(b) } : from;

  for (let attempt = 0; attempt < 48; attempt++) {
    let x = randomInRange(b.minX, b.maxX);
    if (Math.abs(x - fromPos.x) < 80) {
      x =
        fromPos.x < (b.minX + b.maxX) / 2
          ? randomInRange((b.minX + b.maxX) / 2, b.maxX)
          : randomInRange(b.minX, (b.minX + b.maxX) / 2);
    }
    const y = randomInRange(b.minY, b.maxY);
    const to = { x, y };
    if (overlapsAvoid(to.x, to.y, rects)) continue;
    if (pathHitsAvoid(fromPos, to, rects)) continue;
    return to;
  }

  return findSafePos(fromPos.x, fromPos.y, rects);
}

function posFallbackY(b) {
  return (b.minY + b.maxY) / 2;
}

export default function SiteMascot() {
  const controls = useAnimation();
  // walking | paused (hover) | talking (click) — IDLE gif only for paused/talking
  const [mode, setMode] = useState("walking");
  const [facingLeft, setFacingLeft] = useState(false);
  const [bubble, setBubble] = useState(null);

  const posRef = useRef({ x: 24, y: 0 });
  const modeRef = useRef("walking");
  const hoveringRef = useRef(false);
  const visibleRef = useRef(true);
  const lastLineRef = useRef(-1);
  const idleTimerRef = useRef(null);
  const idleDwellActiveRef = useRef(false);
  const roamGenRef = useRef(0);
  const reducedRef = useRef(false);

  const setModeSafe = useCallback((next) => {
    modeRef.current = next;
    setMode(next);
  }, []);

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    idleDwellActiveRef.current = false;
  }, []);

  const walkTo = useCallback(
    async (target, gen) => {
      const from = posRef.current;
      const dx = target.x - from.x;
      const dy = target.y - from.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) return;

      // Walk GIF faces left by default — flip when moving right
      setFacingLeft(dx < 0);
      const duration = Math.min(12, Math.max(1.2, dist / SPEED_PX_PER_SEC));

      try {
        await controls.start({
          x: target.x,
          y: target.y,
          transition: { duration, ease: "linear" },
        });
      } catch {
        return;
      }

      if (gen !== roamGenRef.current) return;
      posRef.current = target;
    },
    [controls]
  );

  const startRoam = useCallback(async () => {
    if (reducedRef.current) return;
    if (!visibleRef.current) return;
    if (hoveringRef.current) return;
    if (modeRef.current === "talking") return;

    const gen = ++roamGenRef.current;
    setModeSafe("walking");

    while (gen === roamGenRef.current) {
      if (!visibleRef.current || hoveringRef.current) break;
      if (modeRef.current === "talking" || modeRef.current === "paused") break;

      const target = randomTarget(posRef.current);
      await walkTo(target, gen);
      if (gen !== roamGenRef.current) break;
    }
  }, [setModeSafe, walkTo]);

  const pauseRoam = useCallback(() => {
    roamGenRef.current += 1;
    controls.stop();
  }, [controls]);

  const resumeWalking = useCallback(() => {
    if (reducedRef.current || !visibleRef.current) return;
    if (idleDwellActiveRef.current) return;
    if (hoveringRef.current) {
      setModeSafe("paused");
      return;
    }
    if (modeRef.current === "talking") return;
    startRoam();
  }, [setModeSafe, startRoam]);

  // Shared 3–5s IDLE dwell for hover and click
  const beginIdleDwell = useCallback(
    (nextMode = "paused") => {
      clearIdleTimer();
      setModeSafe(nextMode);
      idleDwellActiveRef.current = true;
      const ms = randomInRange(IDLE_DWELL_MS_MIN, IDLE_DWELL_MS_MAX);
      idleTimerRef.current = setTimeout(() => {
        idleTimerRef.current = null;
        idleDwellActiveRef.current = false;
        setBubble(null);

        if (hoveringRef.current) {
          // Still hovered — stay idle until pointer leaves
          setModeSafe("paused");
          return;
        }
        setModeSafe("walking");
        startRoam();
      }, ms);
    },
    [clearIdleTimer, setModeSafe, startRoam]
  );

  useEffect(() => {
    [WALK_SRC, IDLE_SRC].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();

    const b = getBounds();
    const start = findSafePos(
      randomInRange(b.minX, b.maxX),
      randomInRange(b.minY, b.maxY),
      getAvoidRects()
    );
    posRef.current = start;
    controls.set({ x: start.x, y: start.y });

    if (!reducedRef.current) {
      startRoam();
    } else {
      setModeSafe("paused");
    }

    return () => {
      roamGenRef.current += 1;
      clearIdleTimer();
      controls.stop();
    };
  }, [clearIdleTimer, controls, setModeSafe, startRoam]);

  useEffect(() => {
    const onVisibility = () => {
      const visible = document.visibilityState === "visible";
      visibleRef.current = visible;

      if (!visible) {
        hoveringRef.current = false;
        pauseRoam();
        clearIdleTimer();
        setBubble(null);
        setModeSafe("paused");
        return;
      }

      if (reducedRef.current) return;
      resumeWalking();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [clearIdleTimer, pauseRoam, resumeWalking, setModeSafe]);

  useEffect(() => {
    const relocateIfBlocked = () => {
      const rects = getAvoidRects();
      const cur = posRef.current;
      if (!overlapsAvoid(cur.x, cur.y, rects)) return;

      const next = findSafePos(cur.x, cur.y, rects);
      posRef.current = next;
      controls.set({ x: next.x, y: next.y });

      // Abort current leg and pick a new safe path
      if (
        modeRef.current === "walking" &&
        !idleDwellActiveRef.current &&
        !hoveringRef.current &&
        visibleRef.current &&
        !reducedRef.current
      ) {
        roamGenRef.current += 1;
        controls.stop();
        queueMicrotask(() => {
          if (
            modeRef.current === "walking" &&
            !idleDwellActiveRef.current &&
            !hoveringRef.current
          ) {
            startRoam();
          }
        });
      }
    };

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        relocateIfBlocked();
      });
    };
    const onResize = () => {
      const next = clampPos(posRef.current.x, posRef.current.y);
      posRef.current = next;
      controls.set({ x: next.x, y: next.y });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, [controls, startRoam]);

  const onPointerEnter = () => {
    if (reducedRef.current || !visibleRef.current) return;
    if (modeRef.current === "talking") return;
    hoveringRef.current = true;
    pauseRoam();
    beginIdleDwell("paused");
  };

  const onPointerLeave = () => {
    hoveringRef.current = false;
    if (reducedRef.current || !visibleRef.current) return;
    // Let shared idle dwell finish (hover or click); resume only after it ends
    if (idleDwellActiveRef.current) return;
    if (modeRef.current === "talking") return;
    resumeWalking();
  };

  const onClick = () => {
    if (reducedRef.current || !visibleRef.current) return;
    if (modeRef.current === "talking" && idleDwellActiveRef.current) return;

    pauseRoam();

    let idx = Math.floor(Math.random() * LINES.length);
    if (LINES.length > 1 && idx === lastLineRef.current) {
      idx = (idx + 1) % LINES.length;
    }
    lastLineRef.current = idx;

    setBubble(LINES[idx]);
    beginIdleDwell("talking");
  };

  const showIdle = mode === "paused" || mode === "talking" || reducedRef.current;
  const src = showIdle ? IDLE_SRC : WALK_SRC;
  const flipX = facingLeft ? 1 : -1;
  const idleNudge = showIdle ? IDLE_Y_NUDGE : 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden={false}>
      <motion.div
        className="pointer-events-auto absolute left-0 top-0 touch-manipulation select-none"
        style={{ width: SIZE, height: SIZE }}
        animate={controls}
        initial={false}
        onUpdate={(latest) => {
          if (typeof latest.x === "number" && typeof latest.y === "number") {
            posRef.current = { x: latest.x, y: latest.y };
          }
        }}
      >
        <button
          type="button"
          className="relative flex h-full w-full cursor-pointer items-end justify-center border-0 bg-transparent p-0"
          aria-label="mascot"
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onClick={onClick}
        >
          {bubble && (
            <div
              className="absolute bottom-[calc(100%+8px-1rem)] left-1/2 z-10 w-max max-w-[240px] -translate-x-1/2 rounded-2xl border border-[color:var(--pink-200)] bg-[color:var(--surface)] px-4 py-2.5 text-center text-sm leading-snug text-[color:var(--text)] shadow-md sm:text-base"
              role="status"
            >
              {bubble}
              <span
                className="absolute left-1/2 top-full -mt-px h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-[color:var(--surface)]"
                aria-hidden
              />
            </div>
          )}
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="object-contain"
            style={{
              width: showIdle ? IDLE_SIZE : SIZE,
              height: showIdle ? IDLE_SIZE : SIZE,
              transform: `translateY(${idleNudge}px) scaleX(${flipX})`,
            }}
          />
        </button>
      </motion.div>
    </div>
  );
}
