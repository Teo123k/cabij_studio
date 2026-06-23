import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Cabij Studio, a creative production partner for experience-led hospitality and wellness brands.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-900 text-cream pt-32 pb-24">
      <div className="container-content">
        {/* Editorial Header */}
        <SectionHeading
          title="About Cabij Studio"
          subtitle="A creative production partner dedicated exclusively to experience-driven hospitality and wellness brands."
        />

        {/* Narrative columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12">
          {/* Left Column: Thesis statement */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-caption text-terracotta uppercase tracking-[0.1em] font-sans font-medium block">
              Our Thesis
            </span>
            <h2 className="text-display-sm font-serif text-cream leading-tight">
              We translate physical atmosphere into premium visual assets.
            </h2>
            <div className="editorial-divider" />
            <p className="text-body-md text-cream-200 leading-relaxed font-sans font-medium">
              We believe that experience-led businesses cannot be marketed using generic, corporate templates or sterile SaaS-focused frameworks.
            </p>
          </div>

          {/* Right Column: Narrative details */}
          <div className="lg:col-span-7 space-y-6 text-body-sm text-cream-300 font-sans leading-relaxed">
            <p>
              Your guests make decisions based on emotion and sensory expectations. They seek the culinary details of a seasonal plate, the stillness of a yoga pavilion, or the architectural warmth of a dining hall. Our studio exists to capture those qualities and turn them into short-form content.
            </p>
            <p>
              We operate with a direct creative workflow. You collaborate directly with the creative directors planning and shooting your campaigns — ensuring no loss of detail in communication.
            </p>
            <p>
              We don&apos;t invent years of experience, fake customer reviews, or claim awards. Instead, we present our specimen concepts and original creative studies with transparency, letting the visual depth of the final media represent our craft.
            </p>
          </div>
        </div>

        {/* Studio Philosophy values */}
        <AnimatedSection className="mt-24 border-t border-charcoal-800 pt-16">
          <h3 className="text-display-sm font-serif text-cream mb-10 text-center">
            Our Studio Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-charcoal-800 bg-charcoal-950">
              <span className="text-caption text-terracotta font-sans font-semibold mb-4 block">
                01 // HONESTY
              </span>
              <h4 className="font-serif text-body-lg text-cream mb-3">
                Transparent Context
              </h4>
              <p className="text-body-sm text-[rgba(245,240,232,0.6)] leading-relaxed">
                All client cases are labeled correctly, and spec work is declared as Studio Projects or Creative Studies to preserve trust.
              </p>
            </div>

            <div className="p-8 border border-charcoal-800 bg-charcoal-950">
              <span className="text-caption text-terracotta font-sans font-semibold mb-4 block">
                02 // SENSORY REALITY
              </span>
              <h4 className="font-serif text-body-lg text-cream mb-3">
                Experience Centered
              </h4>
              <p className="text-body-sm text-[rgba(245,240,232,0.6)] leading-relaxed">
                We avoid abstract visuals or excessive digital overlays. We capture the physical geometry, ingredients, lighting, and sounds of your spaces.
              </p>
            </div>

            <div className="p-8 border border-charcoal-800 bg-charcoal-950">
              <span className="text-caption text-terracotta font-sans font-semibold mb-4 block">
                03 // OPERATIONAL STRUCTURE
              </span>
              <h4 className="font-serif text-body-lg text-cream mb-3">
                Bespoke Delivery
              </h4>
              <p className="text-body-sm text-[rgba(245,240,232,0.6)] leading-relaxed">
                No bloated management or slow cycles. We use structured assets sharing and point-to-frame feedback timelines to deliver on schedule.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <section className="mt-24 p-12 bg-cream text-charcoal text-center">
          <h2 className="text-display-sm font-serif text-charcoal-950 mb-6">
            Let’s Capture Your Brand’s Atmosphere
          </h2>
          <p className="text-body-md text-charcoal-600 mb-8 max-w-xl mx-auto">
            Get in touch to outline a production campaign for your private dining experience, restaurant, retreat, or wellness center.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Book a Creative Call
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
