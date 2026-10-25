import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const WALK_SRC = "/img/chickWalk.gif";
const IDLE_SRC = "/img/chickIDLE.gif";

const LINES = ["갤러리 한번 보세요!", "후기도 꼼꼼히!"];

const WALK_SIZE_DESKTOP = 144;
const IDLE_SIZE_DESKTOP = 72;
const MOBILE_SCALE = 0.75;
const MOBILE_MQ = "(max-width: 639px)";
const SPEED_PX_PER_SEC = 55;
const IDLE_DWELL_MS_MIN = 2000;
const IDLE_DWELL_MS_MAX = 4000;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMascotSizes(mobile) {
  const scale = mobile ? MOBILE_SCALE : 1;
  const walk = WALK_SIZE_DESKTOP * scale;
  const idle = IDLE_SIZE_DESKTOP * scale;
  return {
    walk,
    idle,
    // Idle art sits lower in-frame than walk — lift to roughly match feet
    nudge: -((walk - idle) / 2) * 1.0,
  };
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function getBounds(walkSize) {
  const pad = 8;
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    minX: pad,
    maxX: Math.max(pad, w - walkSize - pad),
    minY: Math.max(pad, h * 0.62),
    maxY: Math.max(pad, h - walkSize - pad),
  };
}

function clampPos(x, y, walkSize) {
  const b = getBounds(walkSize);
  return {
    x: Math.min(b.maxX, Math.max(b.minX, x)),
    y: Math.min(b.maxY, Math.max(b.minY, y)),
  };
}

function randomTarget(fromX, walkSize) {
  const b = getBounds(walkSize);
  let x = randomInRange(b.minX, b.maxX);
  if (Math.abs(x - fromX) < 80) {
    x =
      fromX < (b.minX + b.maxX) / 2
        ? randomInRange((b.minX + b.maxX) / 2, b.maxX)
        : randomInRange(b.minX, (b.minX + b.maxX) / 2);
  }
  const y = randomInRange(b.minY, b.maxY);
  return { x, y };
}

export default function SiteMascot() {
  const controls = useAnimation();
  // walking | paused (hover) | talking (click) — IDLE gif only for paused/talking
  const [mode, setMode] = useState("walking");
  const [facingLeft, setFacingLeft] = useState(false);
  const [bubble, setBubble] = useState(null);
  const [sizes, setSizes] = useState(() =>
    getMascotSizes(typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches)
  );

  const posRef = useRef({ x: 24, y: 0 });
  const modeRef = useRef("walking");
  const hoveringRef = useRef(false);
  const visibleRef = useRef(true);
  const lastLineRef = useRef(-1);
  const idleTimerRef = useRef(null);
  const idleDwellActiveRef = useRef(false);
  const roamGenRef = useRef(0);
  const reducedRef = useRef(false);
  const walkSizeRef = useRef(WALK_SIZE_DESKTOP);

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

      const target = randomTarget(posRef.current.x, walkSizeRef.current);
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

  // Mobile: both GIFs at 0.75×
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => {
      const next = getMascotSizes(mq.matches);
      walkSizeRef.current = next.walk;
      setSizes(next);
      const clamped = clampPos(posRef.current.x, posRef.current.y, next.walk);
      posRef.current = clamped;
      controls.set({ x: clamped.x, y: clamped.y });
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [controls]);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();

    const b = getBounds(walkSizeRef.current);
    const start = {
      x: randomInRange(b.minX, b.maxX),
      y: randomInRange(b.minY, b.maxY),
    };
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
    const onResize = () => {
      const next = clampPos(posRef.current.x, posRef.current.y, walkSizeRef.current);
      posRef.current = next;
      controls.set({ x: next.x, y: next.y });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [controls]);

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
  const idleNudge = showIdle ? sizes.nudge : 0;
  const imgSize = showIdle ? sizes.idle : sizes.walk;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden={false}>
      <motion.div
        className="pointer-events-auto absolute left-0 top-0 touch-manipulation select-none"
        style={{ width: sizes.walk, height: sizes.walk }}
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
          className="relative flex h-full w-full cursor-pointer items-end justify-center border-0 bg-transparent p-0 select-none"
          style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
          aria-label="mascot"
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onClick={onClick}
          onContextMenu={(e) => e.preventDefault()}
        >
          {bubble && (
            <div
              className="pointer-events-none absolute bottom-[calc(100%+8px-1rem)] left-1/2 z-10 w-max max-w-[240px] -translate-x-1/2 rounded-2xl border border-[color:var(--pink-200)] bg-[color:var(--surface)] px-4 py-2.5 text-center text-sm leading-snug text-[color:var(--text)] shadow-md sm:text-base"
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
            className="pointer-events-none object-contain select-none"
            onContextMenu={(e) => e.preventDefault()}
            style={{
              width: imgSize,
              height: imgSize,
              transform: `translateY(${idleNudge}px) scaleX(${flipX})`,
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
          />
        </button>
      </motion.div>
    </div>
  );
}
