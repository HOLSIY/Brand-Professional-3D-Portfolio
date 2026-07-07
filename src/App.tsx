/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import videoPoster from "./assets/images/video_poster_1783428837587.webp";
import bgVideoWebm from "./assets/videos/bg_video.webm";
import bgVideoMp4 from "./assets/videos/bg_video.mp4";

// Dynamic import for the heavy admin dashboard to split it from the initial bundle
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("portfolio_theme");
    return saved === "light" ? "light" : "dark";
  });

  // Handle document class and body style on theme change
  useEffect(() => {
    localStorage.setItem("portfolio_theme", theme);
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  // Real-Time Visitor Analytics Tracking
  useEffect(() => {
    const trackVisit = async () => {
      try {
        let visitorId = localStorage.getItem("visitor_id");
        if (!visitorId) {
          visitorId = "vis_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          localStorage.setItem("visitor_id", visitorId);
        }

        await fetch("/api/visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            visitorId,
            path: window.location.pathname + (window.location.hash || ""),
            userAgent: navigator.userAgent,
            language: navigator.language,
            referrer: document.referrer || "Direct / Bookmark"
          })
        });
      } catch (err) {
        console.warn("Failed to log visit for analytics:", err);
      }
    };

    // Track on initial page load
    trackVisit();

    // Track on hash changes to log specific section interactions
    const handleHashTrack = () => {
      trackVisit();
    };
    window.addEventListener("hashchange", handleHashTrack);
    return () => window.removeEventListener("hashchange", handleHashTrack);
  }, []);

  // Clean up any leftover hash on initial mount to keep address bar pristine
  useEffect(() => {
    if (window.location.hash === "#mulu-private-dashboard-72x9") {
      try {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } catch (e) {
        window.location.hash = "";
      }
    }
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    handleNavClick("contact");
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  if (isAdminOpen) {
    return (
      <React.Suspense fallback={
        <div className="fixed inset-0 min-h-screen w-full bg-[#0C0C0C] flex flex-col items-center justify-center text-white z-50">
          <div className="w-10 h-10 border-4 border-[#B600A8]/30 border-t-[#B600A8] rounded-full animate-spin mb-4" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/50 animate-pulse">
            Decrypting Dashboard...
          </span>
        </div>
      }>
        <AdminDashboard
          onClose={() => {
            setIsAdminOpen(false);
            window.location.hash = "";
          }}
        />
      </React.Suspense>
    );
  }

  return (
    <div className={`relative min-h-screen font-sans selection:bg-[#B600A8]/30 selection:text-white overflow-x-clip transition-colors duration-700 ${
      theme === "light" ? "light bg-[#F8F9FA] text-[#0C0C0C]" : "bg-[#0C0C0C] text-[#D7E2EA]"
    }`}>
      {/* Floating Theme Switcher Circle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-[#0C0C0C]/10 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 hover:border-[#B600A8]/80 text-[#0C0C0C] dark:text-[#D7E2EA] hover:text-[#B600A8] dark:hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(182,0,168,0.25)] transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
          aria-label="Toggle Theme"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? (
            <Moon className="w-6 h-6 text-slate-800 group-hover:rotate-12 transition-transform duration-300" />
          ) : (
            <Sun className="w-6 h-6 text-yellow-400 group-hover:rotate-90 transition-transform duration-500" />
          )}
        </button>
      </div>

      {/* Full-Page Premium Fixed 3D Motion Background Video */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#0C0C0C]">
        {/* Poster image that displays instantly, fading out when the video is active */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            isVideoPlaying ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${videoPoster})` }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlay={() => setIsVideoPlaying(true)}
          onPlaying={() => setIsVideoPlaying(true)}
          onLoadedData={() => setIsVideoPlaying(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={bgVideoWebm} type="video/webm" />
          <source src={bgVideoMp4} type="video/mp4" />
        </video>
        {/* Soft dynamic overlay: in Light mode, acts like beautiful translucent white glass; in Dark mode, keeps standard depth */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          theme === "light" 
            ? "bg-white/65 backdrop-blur-[1px]" 
            : "bg-black/10"
        }`} />
      </div>

      {/* Main Content Layout Container */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <div id="hero">
          <HeroSection onContactClick={handleContactClick} onNavClick={handleNavClick} />
        </div>

        {/* Marquee Row Scrolling Animations Section */}
        <MarqueeSection />

        {/* About Me Character Reveal Section */}
        <AboutSection onContactClick={handleContactClick} />

        {/* Services List & Developer Capabilities Bento Grid */}
        <ServicesSection />

        {/* Interactive Stacking Cards Projects Section */}
        <ProjectsSection />

        {/* Form, WhatsApp, and Links Contact Section */}
        <ContactSection onAdminClick={() => setIsAdminOpen(true)} />
      </div>
    </div>
  );
}

