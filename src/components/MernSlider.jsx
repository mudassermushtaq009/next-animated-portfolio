"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mernSlides as slides } from "../data/mernSlides";

export default function MernSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section
      id="mern-slider"
      className="max-w-6xl mx-auto px-6 py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="uppercase tracking-[3px] text-xs mb-3 text-indigo-400 font-medium">
        FULL STACK
      </div>
      <h2 className="section-header text-5xl font-semibold tracking-tighter mb-4">
        MERN Stack
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-10 max-w-2xl">
        Technologies I use to build complete web applications — from UI to database.
      </p>

      <div className="mern-slider relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={prev}
            className="slider-nav-btn absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={next}
            className="slider-nav-btn absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="p-6 md:p-8 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
                <div>
                  <p className="text-indigo-500 dark:text-indigo-400 text-sm font-medium mb-1">
                    {slide.subtitle}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {slide.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-[15px] md:text-base leading-relaxed">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2.5 mt-6">
            {slides.map((_, index) => (
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
      </div>
    </section>
  );
}