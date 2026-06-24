"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { industries } from "@/data/industries";
import { portfolioProjects } from "@/data/portfolio";
import { services } from "@/data/services";
import { processSteps } from "@/data/process";

const HERO_IMAGES = [
  { src: "/images/hero-private-chefs.png", alt: "Private chef preparing elegant dish" },
  { src: "/images/hero-restaurants.png", alt: "Warm atmospheric restaurant interior" },
  { src: "/images/hero-retreats.png", alt: "Serene wellness retreat sunset view" },
  { src: "/images/hero-yoga-wellness.png", alt: "Yoga instructor in calm studio" },
];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [openProcessIndex, setOpenProcessIndex] = useState<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) return;

    const timer = window.setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, []);

  const featuredWork = portfolioProjects.filter((p) => p.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal-950">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {HERO_IMAGES.map((image, index) => (
            <motion.div
              key={image.src}
              initial={false}
              animate={{ opacity: currentHeroIndex === index ? 0.4 : 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          ))}
          {/* Editorial overlay */}
          <div className="image-overlay" />
        </div>

        {/* Hero Content */}
        <div className="container-wide relative z-10 w-full pt-20">
          <div className="max-w-4xl">
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-caption uppercase tracking-[0.2em] text-terracotta mb-4 font-sans font-medium"
            >
              Cabij_studio — Global Production
            </motion.p>
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-display-xl font-serif text-cream mb-6"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Make your experience visible.
            </motion.h1>
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-body-lg text-cream-300 mb-10 max-w-2xl"
            >
              Premium content production for private chefs, restaurants, retreats and wellness brands. We create visual assets built around your spaces, people and brand identity.
            </motion.p>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button href="/work" variant="primary" size="lg">
                View Our Work
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Book a Creative Call
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Core Value Proposition */}
      <AnimatedSection className="bg-cream-200 text-charcoal-900 section-padding">
        <div className="container-narrow text-center">
          <span className="text-caption uppercase tracking-[0.15em] text-terracotta mb-6 block font-sans font-medium">
            Our Core Thesis
          </span>
          <h2 className="text-display-lg font-serif text-charcoal-950 mb-8" style={{ textWrap: "balance" } as React.CSSProperties}>
            Your business is experienced in person. We help people feel it before they arrive.
          </h2>
          <div className="editorial-divider mx-auto mb-8" />
          <p className="text-body-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            In hospitality and wellness, your value is rooted in sensory experience — the taste of a dish, the tranquility of a space, the expertise of your guides. We translate these physical realities into atmospheric short-form content designed to drive commercial conversion.
          </p>
        </div>
      </AnimatedSection>

      {/* 3. Industry Pathways */}
      <AnimatedSection className="bg-charcoal-900 text-cream section-padding">
        <div className="container-content">
          <SectionHeading
            title="Tailored for Experience Brands"
            subtitle="Explore our custom production services designed specifically for each sector of the hospitality and wellness industries."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.slug}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="group relative h-[450px] overflow-hidden flex flex-col justify-end p-8 md:p-12 border border-charcoal-800 bg-charcoal-950"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105 opacity-60">
                  <Image
                    src={ind.imageSrc}
                    alt={ind.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-caption uppercase tracking-[0.1em] text-terracotta mb-3 block font-sans">
                    0{i + 1} {"//"} {ind.name}
                  </span>
                  <h3 className="text-display-sm font-serif text-cream mb-4">
                    {ind.name}
                  </h3>
                  <p className="text-body-sm text-cream-300 mb-6 max-w-md line-clamp-2">
                    {ind.headline}
                  </p>
                  <Link
                    href={`/${ind.slug}`}
                    className="inline-flex items-center text-caption uppercase tracking-[0.1em] text-cream hover:text-terracotta transition-colors duration-300 font-sans font-medium"
                  >
                    Explore Industry Suite <span className="ml-2">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Featured Work */}
      <AnimatedSection className="bg-cream text-charcoal section-padding">
        <div className="container-content">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              title="Featured Works"
              subtitle="Original Concepts and Studio Projects capturing the essence of our partner brands."
              light
            />
            <div className="mb-8 md:mb-0">
              <Button href="/work" variant="ghost" className="text-charcoal-900 hover:text-terracotta">
                View All Projects
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            {featuredWork.map((project) => (
              <motion.div
                key={project.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col group"
              >
                <Link href={`/work/${project.slug}`} className="relative h-[380px] w-full overflow-hidden block bg-charcoal-100">
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute top-4 right-4 bg-charcoal-900 text-cream px-3 py-1.5 text-caption uppercase tracking-[0.05em] font-sans">
                    {project.label}
                  </div>
                </Link>
                <div className="mt-6 flex flex-col">
                  <span className="text-caption uppercase tracking-[0.1em] text-terracotta mb-2 font-sans font-medium">
                    {project.industry.replace("-", " ")}
                  </span>
                  <Link href={`/work/${project.slug}`} className="hover:text-terracotta transition-colors">
                    <h3 className="text-display-sm font-serif text-charcoal-950 mb-3">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-body-sm text-charcoal-600 mb-4 line-clamp-2">
                    <strong className="text-charcoal-800">Objective:</strong> {project.objective}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.slice(0, 3).map((d) => (
                      <span key={d} className="text-caption text-charcoal-500 bg-charcoal-50 px-2.5 py-1 font-sans border border-charcoal-100">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Services Overview */}
      <AnimatedSection className="bg-charcoal-950 text-cream section-padding border-t border-charcoal-900">
        <div className="container-content">
          <SectionHeading
            title="Our Capabilities"
            subtitle="We provide direct creative oversight combined with modern production pipelines."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className="p-8 md:p-10 border border-charcoal-800 bg-charcoal-900 flex flex-col justify-between"
              >
                <div>
                  <span className="text-caption text-terracotta font-sans font-semibold mb-6 block">
                    0{i + 1} {"//"} CAPACITY
                  </span>
                  <h3 className="text-display-sm font-serif text-cream mb-4">
                    {svc.title}
                  </h3>
                  <p className="text-body-sm text-cream-300 mb-8 leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                <ul className="space-y-3 pt-6 border-t border-charcoal-800">
                  {svc.items.map((item) => (
                    <li key={item} className="text-body-sm text-[rgba(245,240,232,0.6)] flex items-start">
                      <span className="text-terracotta mr-2">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6. Production Process */}
      <AnimatedSection className="bg-cream-200 text-charcoal-900 section-padding">
        <div className="container-content">
          <SectionHeading
            title="Our Process"
            subtitle="A clear, four-stage workflow built for precision, transparency and speed."
            light
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Left side process steps */}
            <div className="flex flex-col gap-4">
              {processSteps.map((step, idx) => (
                <div
                  key={step.number}
                  className={`p-6 border transition-all duration-300 cursor-pointer ${
                    openProcessIndex === idx
                      ? "bg-white border-terracotta shadow-sm"
                      : "bg-[rgba(245,240,232,0.5)] border-charcoal-100 hover:bg-white"
                  }`}
                  onClick={() => setOpenProcessIndex(idx)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-body-lg text-terracotta font-semibold">
                        {step.number}
                      </span>
                      <h4 className="font-serif text-body-lg text-charcoal-950 font-medium">
                        {step.title}
                      </h4>
                    </div>
                    <span className="text-body-md text-charcoal-400">
                      {openProcessIndex === idx ? "—" : "+"}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {openProcessIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-body-sm text-charcoal-600 leading-relaxed font-sans">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side visual representation */}
            <div className="relative h-[350px] lg:h-full min-h-[350px] overflow-hidden bg-charcoal-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={openProcessIndex}
                  initial={false}
                  animate={{ opacity: 0.7, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HERO_IMAGES[openProcessIndex].src}
                    alt="Process backdrop visual"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-950/60 to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-8 left-8 right-8 z-10 text-cream">
                <span className="text-caption uppercase tracking-[0.1em] text-terracotta mb-2 block font-sans">
                  Active Phase
                </span>
                <h4 className="text-display-sm font-serif">
                  Stage {processSteps[openProcessIndex].number} — {processSteps[openProcessIndex].title}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 7. Differentiators, Trust, and Testimonials */}
      <AnimatedSection className="bg-charcoal-900 text-cream section-padding border-t border-charcoal-800">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Differentiators */}
            <div>
              <span className="text-caption uppercase tracking-[0.1em] text-terracotta mb-4 block font-sans">
                Our Differentiator
              </span>
              <h2 className="text-display-md font-serif text-cream mb-6">
                Why Experience-Led Brands Choose Us
              </h2>
              <p className="text-body-md text-cream-300 mb-8 leading-relaxed">
                Most agencies produce generic commercial content or try to apply tech-SaaS styles to hospitality brands. We focus exclusively on businesses that are experienced in person. Our workflow brings real locations, products, and founder stories to life by combining bespoke creative direction with structured, organized post-production technology.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="text-terracotta font-serif text-body-lg">✓</span>
                  <div>
                    <h4 className="font-serif text-body-md text-cream">Bespoke Creative Direction</h4>
                    <p className="text-body-sm text-[rgba(245,240,232,0.5)]">No pre-made visual templates. Every project begins with a dedicated visual concept created for your brand.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-terracotta font-serif text-body-lg">✓</span>
                  <div>
                    <h4 className="font-serif text-body-md text-cream">Direct Human Content</h4>
                    <p className="text-body-sm text-[rgba(245,240,232,0.5)]">We prioritize capturing the raw reality of spaces, preparation, and staff, rather than sterile mockups.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust and Testimonials */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-caption uppercase tracking-[0.1em] text-terracotta mb-4 block font-sans">
                  Trust & Operations
                </span>
                <h2 className="text-display-md font-serif text-cream mb-6">
                  Structured & Transparent Execution
                </h2>
                <ul className="space-y-4 mb-8">
                  <li className="text-body-sm text-cream-300 flex items-start gap-3">
                    <span className="text-terracotta">•</span>
                    <span><strong>Organized Reviews:</strong> Collaborations happen through structured Frame.io links for frame-accurate feedback.</span>
                  </li>
                  <li className="text-body-sm text-cream-300 flex items-start gap-3">
                    <span className="text-terracotta">•</span>
                    <span><strong>Clear Intellectual Property:</strong> Transparent commercial usage rights provided on all delivered imagery and video.</span>
                  </li>
                  <li className="text-body-sm text-cream-300 flex items-start gap-3">
                    <span className="text-terracotta">•</span>
                    <span><strong>Revision Safeguards:</strong> A structured, two-round edit cycle guarantees deliverables align exactly with the brief.</span>
                  </li>
                </ul>
              </div>

              {/* Add a testimonials component here only when verified client quotes are available. */}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 8. Final Call to Action */}
      <section className="bg-cream text-charcoal section-padding relative overflow-hidden">
        <div className="container-narrow text-center relative z-10">
          <h2 className="text-display-md font-serif text-charcoal-950 mb-6">
            Let’s turn what makes your business special into content people remember.
          </h2>
          <p className="text-body-lg text-charcoal-600 mb-8 max-w-xl mx-auto">
            Book a complimentary creative call or request a custom content sample outline tailored to your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/contact" variant="primary" size="lg">
              Book a Creative Call
            </Button>
            <Button href="/contact?ref=sample-concept" variant="secondary" size="lg" className="text-charcoal-900 border-charcoal-300 hover:bg-charcoal-50 hover:border-charcoal-400">
              Request a Sample Concept
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
