"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { mernSlides } from "../data/mernSlides";

export default function HeroSlider({ onScrollTo, mounted = true }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % mernSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + mernSlides.length) % mernSlides.length);
  }, []);

  useEffect(() => {
    if (!mounted || isPaused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [isPaused, next, mounted]);

  const slide = mernSlides[current];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-12 xl:gap-16 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs tracking-[3px] uppercase text-zinc-500">
            AVAILABLE FOR FREELANCE &amp; COLLABS
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] font-semibold tracking-tighter leading-none mb-6 text-zinc-900 dark:text-zinc-100">
            Hi, I&apos;m{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-indigo-500 to-zinc-900 dark:from-white dark:via-indigo-200 dark:to-white">
              MuDasssR
            </span>
          </h1>

          <div className="min-h-[5.5rem] md:min-h-[6.5rem] mb-8">
            {mounted ? (
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  className="text-xl md:text-2xl lg:text-[1.65rem] text-zinc-600 dark:text-zinc-400 tracking-tight leading-snug max-w-xl mx-auto lg:mx-0"
                >
                  {slide.heroTagline}
                </motion.p>
              </AnimatePresence>
            ) : (
              <p className="text-xl md:text-2xl lg:text-[1.65rem] text-zinc-600 dark:text-zinc-400 tracking-tight leading-snug max-w-xl mx-auto lg:mx-0">
                {slide.heroTagline}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <button
              type="button"
              onClick={() => onScrollTo("projects")}
              className="btn-primary group flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-medium"
            >
              View my work
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>
            <button
              type="button"
              onClick={() => onScrollTo("contact")}
              className="btn-secondary flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-medium"
            >
              Let&apos;s talk
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-8 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <MapPin size={15} /> Remote / Global
            </div>
            <div>5+ years building</div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-8">
            {mernSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`slider-dot ${index === current ? "slider-dot-active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        <div className="hero-slider-panel relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-2xl lg:scale-[1.02] lg:origin-center">
          <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/10] lg:min-h-[400px] xl:min-h-[460px] overflow-hidden">
            {mounted ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            )}

            <button
              type="button"
              onClick={prev}
              className="slider-nav-btn absolute left-3 top-1/2 -translate-y-1/2 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              className="slider-nav-btn absolute right-3 top-1/2 -translate-y-1/2 z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 z-10">
              {mounted ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-indigo-300 text-xs font-medium tracking-wider uppercase mb-1">
                      {slide.subtitle}
                    </p>
                    <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                      {slide.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {slide.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-white/90 border border-white/20 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div>
                  <p className="text-indigo-300 text-xs font-medium tracking-wider uppercase mb-1">
                    {slide.subtitle}
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                    {slide.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {slide.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-white/90 border border-white/20 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}