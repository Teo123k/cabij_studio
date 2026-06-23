"use client";

import { services } from "@/data/services";
import { Button } from "@/components/Button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-900 text-cream pt-32 pb-24">
      {/* Editorial Header */}
      <div className="container-content">
        <SectionHeading
          title="Bespoke Creative Capabilities"
          subtitle="We deliver end-to-end production pipelines built specifically for experience-driven hospitality and wellness brands."
        />

        {/* Services detailed breakdown */}
        <div className="space-y-16 mt-16">
          {services.map((svc, idx) => (
            <AnimatedSection
              key={svc.title}
              className="p-8 md:p-12 border border-charcoal-800 bg-charcoal-950 flex flex-col lg:flex-row gap-12 items-start"
            >
              {/* Left Column: Number & Title */}
              <div className="lg:w-1/3">
                <span className="text-caption text-terracotta font-sans font-semibold mb-3 block">
                  0{idx + 1} {"//"} STUDIO SERVICE
                </span>
                <h2 className="text-display-sm font-serif text-cream mb-4">
                  {svc.title}
                </h2>
                <div className="editorial-divider mb-6" />
                <p className="text-body-sm text-cream-300 leading-relaxed font-sans">
                  Tailored scopes are designed following a creative review call, ensuring alignment with your target marketing indicators.
                </p>
              </div>

              {/* Right Column: Description & List */}
              <div className="lg:w-2/3 space-y-6">
                <p className="text-body-md text-cream-200 leading-relaxed font-sans font-medium">
                  {svc.description}
                </p>
                <div className="border-t border-charcoal-800 pt-6">
                  <h4 className="text-caption text-[rgba(245,240,232,0.4)] uppercase tracking-[0.1em] font-sans mb-4">
                    What is Included in the Scope
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {svc.items.map((item) => (
                      <li key={item} className="text-body-sm text-cream-300 flex items-start">
                        <span className="text-terracotta mr-3">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust, revisions, and transparency callout */}
        <AnimatedSection className="mt-20 p-8 md:p-12 bg-cream-200 text-charcoal-900 border border-charcoal-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-caption text-terracotta uppercase tracking-[0.1em] font-sans font-semibold mb-3 block">
                Collaboration Standards
              </span>
              <h3 className="text-display-sm font-serif text-charcoal-950 mb-6">
                Professionalism in Production
              </h3>
              <p className="text-body-sm text-charcoal-600 leading-relaxed mb-4">
                To guarantee that final deliverables match your brand voice, we integrate structured pipelines into every engagement:
              </p>
              <ul className="space-y-3 font-sans text-body-sm text-charcoal-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-terracotta font-bold">•</span>
                  <span><strong>Round-by-Round Approvals:</strong> Two edit cycles included to verify color profiles, timing, and brand voice.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-terracotta font-bold">•</span>
                  <span><strong>Frame.io Reviews:</strong> Point-and-click frame-accurate notes to avoid communication gaps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-terracotta font-bold">•</span>
                  <span><strong>IP Clearance:</strong> Immediate commercial usage rights transfer on final invoice settlement.</span>
                </li>
              </ul>
            </div>
            <div className="border border-charcoal-300 p-8 bg-white flex flex-col gap-6 justify-center">
              <h4 className="font-serif text-body-lg text-charcoal-950 font-semibold text-center">
                Need a Custom Scope Estimate?
              </h4>
              <p className="text-body-sm text-charcoal-600 text-center font-sans">
                Tell us about your next menu launch, retreat event, or brand upgrade. We&apos;ll outline a visual strategy proposal in 48 hours.
              </p>
              <div className="mx-auto">
                <Button href="/contact" variant="primary" size="lg">
                  Submit Enquiry
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
