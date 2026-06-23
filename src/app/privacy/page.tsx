import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for Cabij Studio website enquiries.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-900 text-cream pt-32 pb-24 font-sans">
      <div className="container-narrow">
        <SectionHeading
          title="Privacy Policy"
          subtitle="Last updated: June 23, 2026"
        />

        <div className="prose prose-invert max-w-none text-body-sm text-cream-300 space-y-6 leading-relaxed mt-12 border-t border-charcoal-800 pt-8">
          <div className="bg-charcoal-950 p-6 border border-terracotta/20 text-cream mb-8">
            <h4 className="font-serif text-body-md text-terracotta font-semibold mb-2">
              Legal Review Placeholder Notice
            </h4>
            <p className="text-caption text-cream-300 font-sans leading-relaxed">
              This document is a visual design and structural placeholder for Cabij Studio. It contains basic operational practices but has not been cleared for commercial compliance. Please review this language with your legal counsel prior to launching the production domain.
            </p>
          </div>

          <h3 className="font-serif text-body-lg text-cream pt-4">1. Information We Collect</h3>
          <p>
            We collect the details submitted through our Enquiry Form (such as name, email, website URL, Instagram handle, and project budgets) to draft custom scope estimates and campaign details. We do not sell, trade, or distribute this information to third parties.
          </p>

          <h3 className="font-serif text-body-lg text-cream pt-4">2. Likeness & Reference Assets</h3>
          <p>
            Our production workflow frequently requires managing images, videos, and names representing your chefs, instructors, staff, and guests. We request explicit written releases before publication. All offline reference materials and raw media are handled securely on physical and structured cloud drives (e.g. Frame.io).
          </p>

          <h3 className="font-serif text-body-lg text-cream pt-4">3. Cookies & Analytics</h3>
          <p>
            We use minimal cookies to manage site settings, page load speeds, and navigation states. Third-party trackers may capture anonymous telemetry to help optimize site rendering.
          </p>

          <h3 className="font-serif text-body-lg text-cream pt-4">4. Compliance Contact</h3>
          <p>
            For inquiries regarding media removal, likeness release cancellations, or privacy concerns, contact our operations desk at:{" "}
            <a href="mailto:info@cabij-production.co" className="text-terracotta hover:underline font-serif">
              info@cabij-production.co
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
