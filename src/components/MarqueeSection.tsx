import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";

const IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const ROW1_IMAGES = IMAGES.slice(0, 11);
const ROW2_IMAGES = IMAGES.slice(11);

// Tripled lists for seamless visual loop scrolling
const ROW1_TRIPLED = [...ROW1_IMAGES, ...ROW1_IMAGES, ...ROW1_IMAGES];
const ROW2_TRIPLED = [...ROW2_IMAGES, ...ROW2_IMAGES, ...ROW2_IMAGES];

const MarqueeSection = React.memo(function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Initialize a high-performance motion value for tracking normalized X cursor position
  const mouseX = useMotionValue(0.5); // Defaults to center (0.5)

  // Track cursor movement on screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // clientX normalized between 0 and 1
      const normalizedX = e.clientX / window.innerWidth;
      mouseX.set(normalizedX);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // Track scroll position of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Calculate base scrolling translations
  const row1Scroll = useTransform(scrollYProgress, [0, 1], [-150, 250]);
  const row2Scroll = useTransform(scrollYProgress, [0, 1], [150, -250]);

  // Transform normalized mouse X into a horizontal pixel offset (one goes right, one goes left)
  const row1MouseOffset = useTransform(mouseX, [0, 1], [-200, 200]);
  const row2MouseOffset = useTransform(mouseX, [0, 1], [200, -200]);

  // Apply responsive spring settings so it reacts instantly and moves cleanly with zero cuts/jumps
  const row1ScrollSpring = useSpring(row1Scroll, { stiffness: 60, damping: 22, mass: 0.3 });
  const row2ScrollSpring = useSpring(row2Scroll, { stiffness: 60, damping: 22, mass: 0.3 });

  const row1MouseSpring = useSpring(row1MouseOffset, { stiffness: 180, damping: 30, mass: 0.1 });
  const row2MouseSpring = useSpring(row2MouseOffset, { stiffness: 180, damping: 30, mass: 0.1 });

  // Map spring values to the CSS calc templates
  const row1X = useTransform([row1ScrollSpring, row1MouseSpring], ([scrollVal, mouseVal]) => {
    const s = typeof scrollVal === "number" ? scrollVal : 0;
    const m = typeof mouseVal === "number" ? mouseVal : 0;
    return `calc(-33.33% + ${s + m}px)`;
  });

  const row2X = useTransform([row2ScrollSpring, row2MouseSpring], ([scrollVal, mouseVal]) => {
    const s = typeof scrollVal === "number" ? scrollVal : 0;
    const m = typeof mouseVal === "number" ? mouseVal : 0;
    return `calc(-33.33% + ${s + m}px)`;
  });

  return (
    <section
      ref={sectionRef}
      className="bg-transparent pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-4 w-full">
        {/* ROW 1: Moves RIGHT */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-3 w-max"
            style={{
              x: row1X,
            }}
          >
            {ROW1_TRIPLED.map((src, index) => (
              <div
                key={`row1-${index}`}
                className="w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/5"
              >
                <img
                  src={src}
                  alt={`Marquee 3D Visual ${index}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Moves LEFT */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-3 w-max"
            style={{
              x: row2X,
            }}
          >
            {ROW2_TRIPLED.map((src, index) => (
              <div
                key={`row2-${index}`}
                className="w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/5"
              >
                <img
                  src={src}
                  alt={`Marquee 3D Visual ${index}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default MarqueeSection;
