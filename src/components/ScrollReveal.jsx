import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function ScrollReveal({ children, delay = 0, dir = "up" }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.25, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const offset = 24;
  const directions = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, ...directions[dir] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
