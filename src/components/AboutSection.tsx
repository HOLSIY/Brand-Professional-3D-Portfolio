import React from "react";
import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import senafProfile from "../assets/images/regenerated_image_1783182542165.webp";
import moonIcon from "../assets/images/moon_icon.webp";
import shapeIcon from "../assets/images/shape_icon.webp";
import legoIcon from "../assets/images/lego_icon.webp";
import groupIcon from "../assets/images/group_icon.webp";
import { motion } from "motion/react";

interface AboutSectionProps {
  onContactClick: () => void;
}

const AboutSection = React.memo(function AboutSection({ onContactClick }: AboutSectionProps) {
  const bioText = "I'm Senaf Wondimu, a professional developer and creator passionate about crafting high-quality digital solutions. I specialize in modern web design, full-stack web development, and Kotlin Android applications. With a strong foundation in scalable architecture and polished UI/UX principles, I build clean, high-performance products that bring creative visions to life.";

  return (
    <section id="about" className="relative min-h-screen bg-transparent px-5 sm:px-8 md:px-10 py-24 sm:py-32 flex flex-col justify-center items-center overflow-hidden">
      
      {/* Absolute Decorative 3D Images in Corners */}
      {/* Top-Left: Moon icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[2%] left-[2%] sm:top-[4%] sm:left-[2%] md:left-[4%] z-0 select-none pointer-events-none"
      >
        <img
          src={moonIcon}
          alt="Decorative Moon"
          loading="lazy"
          className="w-[50px] sm:w-[80px] md:w-[120px] lg:w-[150px] xl:w-[180px] h-auto object-contain opacity-30 sm:opacity-50 md:opacity-70 xl:opacity-80"
        />
      </FadeIn>

      {/* Bottom-Left: 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[2%] left-[2%] sm:bottom-[4%] sm:left-[2%] md:left-[4%] z-0 select-none pointer-events-none"
      >
        <img
          src={shapeIcon}
          alt="Decorative Shape"
          loading="lazy"
          className="w-[40px] sm:w-[70px] md:w-[100px] lg:w-[120px] xl:w-[140px] h-auto object-contain opacity-30 sm:opacity-50 md:opacity-70 xl:opacity-80"
        />
      </FadeIn>

      {/* Top-Right: Lego icon (Smile Emoji) */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[2%] right-[2%] sm:top-[4%] sm:right-[2%] md:right-[4%] z-0 select-none pointer-events-none"
      >
        <img
          src={legoIcon}
          alt="Decorative Lego"
          loading="lazy"
          className="w-[50px] sm:w-[80px] md:w-[120px] lg:w-[150px] xl:w-[180px] h-auto object-contain opacity-30 sm:opacity-50 md:opacity-70 xl:opacity-80"
        />
      </FadeIn>

      {/* Bottom-Right: 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[2%] right-[2%] sm:bottom-[4%] sm:right-[2%] md:right-[4%] z-0 select-none pointer-events-none"
      >
        <img
          src={groupIcon}
          alt="Decorative Composition"
          loading="lazy"
          className="w-[50px] sm:w-[80px] md:w-[110px] lg:w-[145px] xl:w-[175px] h-auto object-contain opacity-30 sm:opacity-50 md:opacity-70 xl:opacity-80"
        />
      </FadeIn>

      {/* Content Container */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl z-20">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl mb-12 sm:mb-16 md:mb-20">
            About me
          </h2>
        </FadeIn>

        {/* Split Grid for Profile Picture & Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center w-full">
          {/* Profile Picture Frame */}
          <div className="col-span-1 md:col-span-5 flex justify-center -mt-6 md:-mt-12 md:mb-0 mb-6">
            <FadeIn delay={0.15} x={-40} y={0} duration={0.8} className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[310px] lg:max-w-[330px]">
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group aspect-square rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 shadow-2xl bg-white/5 p-2 transition-all duration-300"
              >
                {/* Neon Glow Backlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B600A8]/20 to-[#7621B0]/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 rounded-3xl -z-10" />
                
                {/* Border effect overlay */}
                <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-all duration-500 rounded-[22px] pointer-events-none z-10" />

                {/* Profile Image */}
                <img
                  src={senafProfile}
                  alt="Senaf Wondimmu"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl filter brightness-95 group-hover:brightness-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </FadeIn>
          </div>

          {/* Bio Text & Action */}
          <div className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="max-w-xl md:max-w-none mb-10 md:mb-12">
              <AnimatedText
                text={bioText}
                className="text-[#D7E2EA] font-medium leading-relaxed font-sans text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left"
              />
            </div>

            {/* Hire Me Button */}
            <FadeIn delay={0.3} y={30} duration={0.8}>
              <ContactButton onClick={onContactClick} label="Hire Me" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
