"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Github, ExternalLink, Mail, MapPin, Calendar, Award, Code2, Sun, Moon } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import { projects, githubProfile } from '../data/projects';

const skills = [
  "JavaScript", "React", "Next.js", "Node.js", "Express.js",
  "MongoDB", "Mongoose", "MERN Stack", "REST APIs", "JWT Auth",
  "Tailwind CSS", "Framer Motion", "Git & GitHub", "Vercel Deploy"
];

const experiences = [
  { year: "2023 — Present", role: "Senior Full Stack Developer", company: "Independent", desc: "Building products for startups and agencies. Focus on delightful UX and scalable architecture." },
  { year: "2021 — 2023", role: "Frontend Engineer", company: "TechNova", desc: "Led design system development and built marketing sites + internal tooling used by 10k+ users." },
  { year: "2020 — 2021", role: "Software Engineer", company: "PixelForge", desc: "Full-stack development for SaaS products. Shipped 4 major product releases." },
];

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, loading: false });
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!selectedProject) {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen, selectedProject]);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    document.body.style.overflow = selectedProject ? 'hidden' : '';

    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;

      const offset = 80;
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  };

  // Track active section for nav highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Contact form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.");
      return;
    }

    setFormStatus({ submitted: false, loading: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 900));

    setFormStatus({ submitted: true, loading: false });
    
    // Reset form after success message
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormStatus({ submitted: false, loading: false });
    }, 2400);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Simple project card click opens modal
  const openProject = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-200">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-semibold text-xl tracking-tighter hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
          >
            <Code2 className="w-6 h-6 text-indigo-400" />
            <span>MuDasssR</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`nav-link transition-colors ${activeSection === link.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="hidden md:block btn-primary text-sm px-5 py-2 rounded-full font-medium"
            >
              Get in touch
            </a>

            {/* Theme toggle - always visible */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-zinc-400 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white active:text-zinc-900 dark:active:text-white transition-colors"
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : (
                <span className="inline-block w-[18px] h-[18px]" aria-hidden="true" />
              )}
            </button>
            
            {/* Mobile menu button */}
            <button 
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2.5 text-zinc-400 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden relative z-[60] border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mobile-menu shadow-lg"
            >
              <div className="px-6 py-6 flex flex-col gap-2 text-lg">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-left py-3 text-zinc-600 dark:text-zinc-300 active:text-zinc-900 dark:active:text-white touch-manipulation"
                  >
                    {link.label}
                  </button>
                ))}
                <button 
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary mt-3 w-full py-3 rounded-full font-medium touch-manipulation"
                >
                  Get in touch
                </button>

                {/* Theme toggle in mobile menu */}
                <div className="pt-3 mt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                    className="flex w-full items-center gap-3 py-3 text-left text-sm text-zinc-600 dark:text-zinc-300 active:text-zinc-900 dark:active:text-white touch-manipulation"
                  >
                    {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : null}
                    <span suppressHydrationWarning>{mounted ? (isDark ? 'Light mode' : 'Dark mode') : 'Theme'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="home" className="pt-24 md:pt-28 pb-16 min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <HeroSlider onScrollTo={scrollToSection} mounted={mounted} />
          </motion.div>
        </div>

        {/* Subtle background element */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_0.8px,transparent_1px)] dark:bg-[radial-gradient(#27272a_0.8px,transparent_1px)] bg-[length:5px_5px] pointer-events-none" />
        
        {/* Scroll hint */}
        <motion.div 
          animate={{ y: [0, 6, 0] }} 
          transition={{ duration: 1.8, repeat: Infinity }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-12 hidden md:block text-xs tracking-[2px] text-zinc-500 dark:text-zinc-600 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-400"
        >
          SCROLL TO EXPLORE ↓
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24 border-t border-zinc-200 dark:border-zinc-900">
        <div>
          <div className="uppercase tracking-[3px] text-xs mb-3 text-indigo-400 font-medium">INTRODUCTION</div>
          <h2 className="section-header text-5xl font-semibold tracking-tighter mb-8">About me</h2>
          
          <div className="grid md:grid-cols-12 gap-10 items-center">
            {/* Text Content */}
            <div className="md:col-span-7 space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I&apos;m a product-focused developer with a passion for clean interfaces and robust systems. 
                I bridge design and engineering to ship polished, user-centered software.
              </p>
              <p>
                My work ranges from marketing sites and design systems to complex web apps and AI-powered tools. 
                I love learning new technologies and collaborating with teams who care deeply about craft.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-sm border border-zinc-200 dark:border-zinc-800">
                  <Award className="w-4 h-4 text-indigo-400" /> 50+ Projects shipped
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-sm border border-zinc-200 dark:border-zinc-800">
                  <Calendar className="w-4 h-4 text-indigo-400" /> Based globally
                </div>
              </div>
            </div>

            {/* Your Photo */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full ring-4 ring-zinc-200 dark:ring-zinc-700 shadow-2xl">
                <img 
                  src="/profile.jpg" 
                  alt="MuDasssR" 
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                  width={320}
                  height={320}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="bg-zinc-100/60 dark:bg-zinc-900/60 py-20 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="uppercase tracking-[3px] text-xs mb-3 text-indigo-400 font-medium">WHAT I USE</div>
          <h2 className="section-header text-5xl font-semibold tracking-tighter mb-10">Skills &amp; Tools</h2>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="skill-pill px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-base bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-zinc-500 dark:text-zinc-500 text-sm max-w-lg">Always exploring new tools. Currently obsessed with AI agents and high-quality motion design.</p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-4xl mx-auto px-6 py-24">
        <div>
          <div className="uppercase tracking-[3px] text-xs mb-3 text-indigo-400 font-medium">CAREER</div>
          <h2 className="section-header text-5xl font-semibold tracking-tighter mb-12">Experience</h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col md:flex-row gap-6 md:gap-16 border-l-2 border-zinc-200 dark:border-zinc-800 pl-6 md:pl-8 relative"
            >
              <div className="w-40 shrink-0 font-mono text-sm text-zinc-500 pt-1">{exp.year}</div>
              <div>
                <div className="text-2xl font-medium tracking-tight mb-1">{exp.role}</div>
                <div className="text-indigo-500 dark:text-indigo-400 mb-4">{exp.company}</div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[17px]">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-zinc-100/50 dark:bg-zinc-900/50 py-20 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="uppercase tracking-[3px] text-xs mb-3 text-indigo-400 font-medium">SELECTED WORK</div>
              <h2 className="section-header text-5xl font-semibold tracking-tighter">Featured Projects</h2>
            </div>
            <a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact');}} className="hidden md:flex items-center gap-2 text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300">
              Want to collaborate? <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -4 }}
                onClick={() => openProject(project)}
                className="project-card group bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full"
              >
                {/* Project visual */}
                <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500" 
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/90" />

                  {project.live && (
                    <span className="absolute top-4 right-4 z-10 live-demo-badge">
                      Live Demo
                    </span>
                  )}
                  
                  <div className="relative z-10 flex flex-wrap gap-1.5 px-5">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-semibold text-2xl tracking-tighter mb-3 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 flex-1 text-[15px] leading-snug mb-6">{project.description}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-auto">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    <span className="inline-flex items-center gap-2 text-sm text-indigo-500 dark:text-indigo-400 group-hover:gap-3 transition-all">
                      View details <ArrowRight size={15} className="group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-zinc-500 dark:text-zinc-500 mt-10 text-sm">
            Click any project card to see details ·{' '}
            <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="text-indigo-500 dark:text-indigo-400 hover:underline">
              View all on GitHub
            </a>
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-5 gap-x-12 gap-y-12">
          {/* Left column */}
          <div className="md:col-span-2">
            <div className="uppercase tracking-[3px] text-xs mb-3 text-indigo-400 font-medium">NEXT STEP</div>
            <h2 className="section-header text-5xl font-semibold tracking-tighter mb-6">Let&apos;s build something together</h2>
            
            <div className="space-y-5 text-lg text-zinc-600 dark:text-zinc-400">
              <p>Have a project in mind or just want to say hi? I&apos;d love to hear from you.</p>
              <p>Currently open to freelance work, collaborations and interesting full-time opportunities.</p>
            </div>

            <div className="mt-10 space-y-3 text-sm">
              <a href="mailto:hello@mudasssr.dev" className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                <Mail size={18} className="text-indigo-400" /> hello@mudasssr.dev
              </a>
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <MapPin size={18} className="text-indigo-400" /> Remote / Worldwide
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              {formStatus.submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-emerald-300 dark:border-emerald-900 bg-emerald-100/50 dark:bg-emerald-950/50 p-10 text-center"
                >
                  <div className="mx-auto w-14 h-14 rounded-full bg-emerald-900 flex items-center justify-center mb-5">
                    <Mail className="text-emerald-400" />
                  </div>
                  <div className="text-2xl font-semibold tracking-tight mb-2">Thank you!</div>
                  <p className="text-emerald-700 dark:text-emerald-300/80">Your message has been sent. I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-widest mb-2 text-zinc-600 dark:text-zinc-500">YOUR NAME</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                        className="form-input w-full px-5 py-4 rounded-2xl text-lg" 
                        placeholder="Jane Appleseed" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest mb-2 text-zinc-600 dark:text-zinc-500">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className="form-input w-full px-5 py-4 rounded-2xl text-lg" 
                        placeholder="you@company.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest mb-2 text-zinc-600 dark:text-zinc-500">MESSAGE</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      required 
                      rows={6} 
                      className="form-input w-full px-5 py-4 rounded-3xl resize-y text-lg" 
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus.loading}
                    className="btn-primary disabled:opacity-70 disabled:cursor-wait w-full md:w-auto flex items-center justify-center gap-3 text-lg font-medium px-10 py-4 rounded-full mt-2"
                  >
                    {formStatus.loading ? "Sending..." : "Send message"}
                    {!formStatus.loading && <ArrowRight />}
                  </button>
                  <p className="text-[13px] text-zinc-500 dark:text-zinc-500 pt-1">I usually reply within 24 hours.</p>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 text-sm text-zinc-500 dark:text-zinc-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-y-4">
          <div>© {new Date().getFullYear()} MuDasssR. Crafted with care.</div>
          
          <div className="flex items-center gap-5">
            <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"><Github size={15} /> GitHub</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">X / Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4" 
            onClick={closeProject}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ ease: [0.23, 1, 0.32, 1] }}
              className="modal bg-zinc-950 max-w-3xl w-full rounded-3xl overflow-hidden border border-zinc-800 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeProject} className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 z-10">
                <X size={22} />
              </button>

              {/* Modal hero image / header */}
              <div className="h-56 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative">
                {selectedProject.image ? (
                  <img src={selectedProject.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="text-7xl font-bold tracking-tighter text-white/10">{selectedProject.title.split(' ')[0]}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-zinc-950" />
              </div>

              <div className="p-9">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1 pr-8">
                  <h3 className="text-4xl font-semibold tracking-tighter pr-3">{selectedProject.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-7">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="text-sm px-4 py-px rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">{tag}</span>
                  ))}
                </div>

                <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">{selectedProject.details}</p>

                <div className="flex flex-wrap gap-4 pt-1">
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} /> Watch Live Demo
                    </a>
                  )}
                  <a
                    href={selectedProject.github}
                    className="btn-secondary inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

