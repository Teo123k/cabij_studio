import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import { portfolioProjects } from "@/data/portfolio";
import { Button } from "@/components/Button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

interface Props {
  params: Promise<{
    industry: string;
  }>;
}

export async function generateStaticParams() {
  return industries.map((ind) => ({
    industry: ind.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const industry = industries.find((ind) => ind.slug === resolvedParams.industry);
  if (!industry) return {};

  return {
    title: `${industry.name} Creative Production`,
    description: industry.headline,
  };
}

export default async function IndustryPage({ params }: Props) {
  const resolvedParams = await params;
  const industry = industries.find((ind) => ind.slug === resolvedParams.industry);

  if (!industry) {
    notFound();
  }

  // Filter projects matching this industry
  const matchingProjects = portfolioProjects.filter(
    (p) => p.industry === resolvedParams.industry
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[65vh] min-h-[450px] w-full flex items-center justify-center overflow-hidden bg-charcoal-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={industry.imageSrc}
            alt={industry.imageAlt}
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="image-overlay" />
        </div>

        <div className="container-wide relative z-10 w-full pt-16">
          <div className="max-w-3xl">
            <span className="text-caption uppercase tracking-[0.2em] text-terracotta mb-4 block font-sans font-medium">
              Industries // {industry.name}
            </span>
            <h1 className="text-display-lg font-serif text-cream mb-6" style={{ textWrap: "balance" } as React.CSSProperties}>
              {industry.headline}
            </h1>
            <p className="text-body-md text-cream-300 max-w-xl">
              {industry.description}
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas Grid */}
      <AnimatedSection className="bg-cream-200 text-charcoal-900 section-padding">
        <div className="container-content">
          <SectionHeading
            title="Strategic Focus Areas"
            subtitle={`How we structure creative production and campaigns specifically for ${industry.name.toLowerCase()} brands.`}
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {industry.focusAreas.map((focus, idx) => (
              <div
                key={focus}
                className="p-8 bg-white border border-charcoal-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-caption text-terracotta font-sans font-medium mb-4 block">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-body-lg text-charcoal-950 font-medium mb-3">
                    {focus}
                  </h3>
                  <p className="text-body-sm text-charcoal-600 font-sans leading-relaxed">
                    Custom-crafted visual storytelling assets designed around {focus.toLowerCase()} and built for conversion.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Matching Portfolio Work */}
      <AnimatedSection className="bg-charcoal-900 text-cream section-padding">
        <div className="container-content">
          <SectionHeading
            title={`Selected ${industry.name} Projects`}
            subtitle="Explore Spec Campaigns, Studio Projects and Creative Studies in this sector."
          />

          {matchingProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              {matchingProjects.map((project) => (
                <div key={project.id} className="flex flex-col group">
                  <Link
                    href={`/work/${project.slug}`}
                    className="relative h-[340px] w-full overflow-hidden block bg-charcoal-950"
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
                    <Link href={`/work/${project.slug}`} className="hover:text-terracotta transition-colors">
                      <h3 className="text-display-sm font-serif text-cream mb-3">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-body-sm text-cream-300 mb-4 line-clamp-2">
                      <strong>Objective:</strong> {project.objective}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((d) => (
                        <span
                          key={d}
                          className="text-caption text-[rgba(245,240,232,0.6)] bg-charcoal-800 px-2.5 py-1 font-sans border border-charcoal-700"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-charcoal-800 bg-charcoal-950 mt-12">
              <p className="text-body-md text-cream-300">
                New studio campaigns are in production. Check back soon.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="bg-cream text-charcoal section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-display-sm font-serif text-charcoal-950 mb-6">
            {industry.ctaText}
          </h2>
          <p className="text-body-md text-charcoal-600 mb-8 max-w-xl mx-auto">
            Let’s discuss your brand’s content objectives, production timeline, and visual style. We will design a custom scope outline for your review.
          </p>
          <div className="flex justify-center gap-4">
            <Button href={`/contact?industry=${resolvedParams.industry}`} variant="primary" size="lg">
              Book a Creative Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
