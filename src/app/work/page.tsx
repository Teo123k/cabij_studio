"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioProjects } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { IndustrySlug } from "@/types";

const FILTER_OPTIONS: { label: string; value: "all" | IndustrySlug }[] = [
  { label: "All Work", value: "all" },
  { label: "Private Chefs", value: "private-chefs" },
  { label: "Restaurants", value: "restaurants" },
  { label: "Retreats", value: "retreats" },
  { label: "Yoga & Wellness", value: "yoga-wellness" },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<"all" | IndustrySlug>("all");
  const [, startTransition] = useTransition();

  const filteredProjects = portfolioProjects.filter(
    (project) => filter === "all" || project.industry === filter
  );

  const handleFilterChange = (value: "all" | IndustrySlug) => {
    startTransition(() => {
      setFilter(value);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-charcoal-900 text-cream pt-32 pb-24">
      <div className="container-content">
        <SectionHeading
          title="Our Archive of Work"
          subtitle="A selection of Spec Campaigns, Studio Projects, and Creative Studies across the hospitality and wellness industries."
        />

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-16 pb-4 border-b border-charcoal-800">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilterChange(opt.value)}
              className={`px-5 py-2.5 text-caption uppercase tracking-[0.1em] transition-all duration-300 font-sans border font-medium ${
                filter === opt.value
                  ? "bg-cream text-charcoal border-cream"
                  : "bg-transparent text-[rgba(245,240,232,0.6)] border-charcoal-800 hover:text-cream hover:border-charcoal-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col group"
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="relative h-[380px] w-full overflow-hidden block bg-charcoal-950"
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute top-4 right-4 bg-charcoal-900 text-cream px-3 py-1.5 text-caption uppercase tracking-[0.05em] font-sans border border-charcoal-800">
                    {project.label}
                  </div>
                </Link>
                <div className="mt-6 flex flex-col">
                  <span className="text-caption uppercase tracking-[0.1em] text-terracotta mb-2 font-sans font-medium">
                    {project.industry.replace("-", " ")}
                  </span>
                  <Link href={`/work/${project.slug}`} className="hover:text-terracotta transition-colors">
                    <h3 className="text-display-sm font-serif text-cream mb-3">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-body-sm text-cream-300 mb-4 leading-relaxed line-clamp-2">
                    <strong className="text-cream">Objective:</strong> {project.objective}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-caption text-[rgba(245,240,232,0.6)] bg-charcoal-850 px-2.5 py-1 font-sans border border-charcoal-850"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-24 border border-dashed border-charcoal-800 bg-charcoal-950">
            <p className="text-body-md text-cream-300">
              No projects match the selected filter. Check back soon for new work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
