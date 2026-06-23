import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms placeholder for Cabij Studio creative production work.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-900 text-cream pt-32 pb-24 font-sans">
      <div className="container-narrow">
        <SectionHeading
          title="Terms of Service"
          subtitle="Last updated: June 23, 2026"
        />

        <div className="prose prose-invert max-w-none text-body-sm text-cream-300 space-y-6 leading-relaxed mt-12 border-t border-charcoal-800 pt-8">
          <div className="bg-charcoal-950 p-6 border border-terracotta/20 text-cream mb-8">
            <h4 className="font-serif text-body-md text-terracotta font-semibold mb-2">
              Legal Review Placeholder Notice
            </h4>
            <p className="text-caption text-cream-300 font-sans leading-relaxed">
              This document is a visual design and structural placeholder for Cabij Studio. It outlines generic terms regarding edit limitations, revision cycles, and IP clearance but is not a legally binding contract. Please consult counsel before onboarding commercial partners.
            </p>
          </div>

          <h3 className="font-serif text-body-lg text-cream pt-4">1. Campaign Scopes & Deliverables</h3>
          <p>
            All production campaigns, visual styling mood boards, and short-form video quantities are specified in individual Statement of Work (SOW) documents. Any requests beyond the agreed SOW parameters will require a custom scope amendment.
          </p>

          <h3 className="font-serif text-body-lg text-cream pt-4">2. Revision Cycles & Feedback</h3>
          <p>
            To maintain production schedules, all edits include two (2) feedback rounds. Client comments must be submitted through our Frame.io links within five (5) business days of delivery. Comments received after this window may generate project delays and additional editing charges.
          </p>

          <h3 className="font-serif text-body-lg text-cream pt-4">3. Intellectual Property Rights</h3>
          <p>
            Cabij Studio retains ownership of raw source files, outtakes, and unused visual drafts. Upon receipt of full campaign invoice payment, we transfer comprehensive, royalty-free commercial usage rights for the final edited deliverables.
          </p>

          <h3 className="font-serif text-body-lg text-cream pt-4">4. Likeness Clearances</h3>
          <p>
            It is the client&apos;s responsibility to obtain and maintain all necessary likeness permissions and photo releases from staff, chefs, and guests present on locations during shoot sessions. Cabij Studio accepts no liability for third-party likeness disputes.
          </p>
        </div>
      </div>
    </div>
  );
}
