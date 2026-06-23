import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/data/portfolio";
import { Button } from "@/components/Button";
import { AnimatedSection } from "@/components/AnimatedSection";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = portfolioProjects.find((p) => p.slug === resolvedParams.slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.objective,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.objective,
      images: [{ url: project.imageSrc, alt: project.imageAlt }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const project = portfolioProjects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Get other projects in the same industry as recommendations
  const recommendations = portfolioProjects
    .filter((p) => p.industry === project.industry && p.slug !== project.slug)
    .slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-charcoal-900 text-cream">
      {/* Editorial Header */}
      <section className="relative pt-40 pb-20 border-b border-charcoal-800 bg-charcoal-950">
        <div className="container-content">
          <div className="max-w-4xl">
            <span className="text-caption uppercase tracking-[0.15em] text-terracotta mb-3 block font-sans font-medium">
              Case Study // {project.label}
            </span>
            <h1 className="text-display-lg font-serif text-cream mb-6">
              {project.title}
            </h1>
            <p className="text-body-lg text-cream-300 max-w-2xl leading-relaxed">
              {project.objective}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Grid & Image */}
      <section className="section-padding">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Metadata Details */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 h-fit">
              <div className="border-t border-charcoal-800 pt-6">
                <span className="text-caption text-terracotta uppercase tracking-[0.1em] font-sans block mb-2">
                  Industry & Category
                </span>
                <span className="text-body-md font-serif text-cream uppercase tracking-[0.05em]">
                  {project.industry.replace("-", " ")}
                </span>
              </div>

              <div className="border-t border-charcoal-800 pt-6">
                <span className="text-caption text-terracotta uppercase tracking-[0.1em] font-sans block mb-2">
                  Target Platforms
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.platform.map((p) => (
                    <span
                      key={p}
                      className="text-caption bg-charcoal-850 px-2.5 py-1 font-sans border border-charcoal-800 text-cream-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-charcoal-800 pt-6">
                <span className="text-caption text-terracotta uppercase tracking-[0.1em] font-sans block mb-2">
                  Studio Deliverables
                </span>
                <ul className="space-y-2">
                  {project.deliverables.map((d) => (
                    <li
                      key={d}
                      className="text-body-sm text-cream-300 flex items-center"
                    >
                      <span className="text-terracotta mr-2.5">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Narrative & Visual Showcase */}
            <div className="lg:col-span-8 space-y-12">
              {/* Media Asset Showcase */}
              <div className="relative h-[480px] w-full overflow-hidden bg-charcoal-950 border border-charcoal-800">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Creative Direction & Visual Strategy */}
              <div className="border-t border-charcoal-800 pt-10">
                <h2 className="text-display-sm font-serif text-cream mb-6">
                  Creative Direction & Visual Strategy
                </h2>
                <p className="text-body-md text-cream-300 leading-relaxed font-sans mb-6">
                  {project.creativeDirection}
                </p>
                <p className="text-body-sm text-[rgba(245,240,232,0.55)] leading-relaxed font-sans">
                  The visual assets for this {project.label.toLowerCase()} were curated to preserve local texture, warmth, and organic geometry. Post-production color grading applied custom low-contrast profiles and cinematic skin-tone alignment to drive visual distinction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations / Related work */}
      {recommendations.length > 0 && (
        <AnimatedSection className="bg-charcoal-950 section-padding border-t border-charcoal-800">
          <div className="container-content">
            <h3 className="text-display-sm font-serif text-cream mb-10">
              Related Studies & Campaigns
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {recommendations.map((rec) => (
                <div key={rec.id} className="flex flex-col group">
                  <Link
                    href={`/work/${rec.slug}`}
                    className="relative h-[280px] w-full overflow-hidden block bg-charcoal-900 border border-charcoal-800"
                  >
                    <Image
                      src={rec.imageSrc}
                      alt={rec.imageAlt}
                      fill
                      className="object-cover opacity-80 transition-transform duration-75 group-hover:scale-102"
                    />
                    <div className="absolute top-4 right-4 bg-charcoal-900 text-cream px-3 py-1.5 text-caption uppercase tracking-[0.05em] font-sans">
                      {rec.label}
                    </div>
                  </Link>
                  <h4 className="mt-4 font-serif text-body-lg text-cream hover:text-terracotta transition-colors">
                    <Link href={`/work/${rec.slug}`}>{rec.title}</Link>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Bottom CTA */}
      <section className="bg-cream text-charcoal section-padding">
        <div className="container-narrow text-center">
          <span className="text-caption uppercase tracking-[0.1em] text-terracotta mb-3 block font-sans font-medium">
            Partnerships
          </span>
          <h2 className="text-display-sm font-serif text-charcoal-950 mb-6">
            Looking for Similar Content Production?
          </h2>
          <p className="text-body-md text-charcoal-600 mb-8 max-w-md mx-auto">
            We structure campaigns around your exact industry challenges and target metrics. Reach out to schedule a visual brainstorm call.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Book a Creative Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
