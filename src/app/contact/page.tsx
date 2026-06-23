"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const bookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "mailto:info@cabij-production.co?subject=Creative%20Call%20Request";
  const contactEmail =
    process.env.NEXT_PUBLIC_EMAIL || "info@cabij-production.co";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [formData, setFormData] = useState(() => ({
    name: "",
    businessName: "",
    email: "",
    website: "",
    instagram: "",
    industry: searchParams.get("industry") || "",
    objective:
      searchParams.get("ref") === "sample-concept"
        ? "Request a Sample Concept Outline"
        : "",
    contentNeeded: "",
    monthlyVolume: "",
    marketingChallenge: "",
    targetLaunchDate: "",
    approximateBudget: "",
    additionalNotes: "",
    consent: false,
    company: "",
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmissionError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "The enquiry could not be sent.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "The enquiry could not be sent. Please email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-12 items-start">
      {/* Left Column: Booking info and alternative contact */}
      <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
        <div>
          <span className="text-caption text-terracotta uppercase tracking-[0.1em] font-sans font-medium block mb-3">
            Schedule a Call
          </span>
          <h2 className="text-display-sm font-serif text-cream mb-4">
            Book a Creative Call
          </h2>
          <p className="text-body-sm text-cream-300 font-sans leading-relaxed mb-6">
            If you want to discuss your production requirements directly, book a 30-minute creative consult. We will align on visual references and draft a preliminary campaign structure.
          </p>
          <Button
            href={bookingUrl}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            id="calendly-booking-button"
          >
            Open Calendly Booking
          </Button>
        </div>

        <div className="border-t border-charcoal-800 pt-8">
          <span className="text-caption text-terracotta uppercase tracking-[0.1em] font-sans font-medium block mb-3">
            Direct Contact
          </span>
          <p className="text-body-sm text-cream-300 font-sans">
            Have general questions, partnerships, or spec requests? Reach out directly via:
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="text-body-md text-cream hover:text-terracotta font-serif mt-2 block transition-colors duration-300"
          >
            {contactEmail}
          </a>
        </div>
      </div>

      {/* Right Column: Enquiry Form */}
      <div className="lg:col-span-7 border border-charcoal-800 bg-charcoal-950 p-8 md:p-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <h3 className="text-display-sm font-serif text-cream mb-6">
                Creative Enquiry Form
              </h3>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company website confirmation</label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              {/* Grid 1: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                    placeholder="E.g., Sarah Jenkins"
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                    placeholder="E.g., Olea Restaurant"
                  />
                </div>
              </div>

              {/* Grid 2: Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label htmlFor="email" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                    placeholder="E.g., sarah@olea.com"
                  />
                </div>
                <div className="md:col-span-1">
                  <label htmlFor="website" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                    placeholder="E.g., https://olea.com"
                  />
                </div>
                <div className="md:col-span-1">
                  <label htmlFor="instagram" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Instagram handle
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                    placeholder="E.g., @olea_dining"
                  />
                </div>
              </div>

              {/* Grid 3: Project scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="industry" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Your Industry *
                  </label>
                  <select
                    name="industry"
                    id="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="private-chefs">Private Chefs</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="retreats">Retreats</option>
                    <option value="yoga-wellness">Yoga & Wellness</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="objective" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Main Objective *
                  </label>
                  <select
                    name="objective"
                    id="objective"
                    required
                    value={formData.objective}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Book a Creative Call">Book a Creative Call</option>
                    <option value="Request a Sample Concept Outline">Request a Sample Concept Outline</option>
                    <option value="Scope a Full Content Campaign">Scope a Full Content Campaign</option>
                    <option value="Establish a Monthly Production Partnership">Establish a Monthly Production Partnership</option>
                  </select>
                </div>
              </div>

              {/* Detail fields */}
              <div>
                <label htmlFor="contentNeeded" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                  What content do you need? *
                </label>
                <input
                  type="text"
                  name="contentNeeded"
                  id="contentNeeded"
                  required
                  value={formData.contentNeeded}
                  onChange={handleChange}
                  className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                  placeholder="E.g., 6 Instagram Reels, 20 high-res plated images"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="monthlyVolume" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Monthly Content Volume
                  </label>
                  <select
                    name="monthlyVolume"
                    id="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                  >
                    <option value="" disabled>Select volume</option>
                    <option value="One-off launch/campaign">One-off launch/campaign</option>
                    <option value="Light (4-6 assets/month)">Light (4-6 assets/month)</option>
                    <option value="Medium (8-12 assets/month)">Medium (8-12 assets/month)</option>
                    <option value="High (16+ assets/month)">High (16+ assets/month)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="approximateBudget" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Approximate Budget Range
                  </label>
                  <select
                    name="approximateBudget"
                    id="approximateBudget"
                    value={formData.approximateBudget}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                  >
                    <option value="" disabled>Select range</option>
                    <option value="Below $2,000">Below $2,000</option>
                    <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="targetLaunchDate" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Target Launch Date
                  </label>
                  <input
                    type="text"
                    name="targetLaunchDate"
                    id="targetLaunchDate"
                    value={formData.targetLaunchDate}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                    placeholder="E.g., Mid-September"
                  />
                </div>
                <div>
                  <label htmlFor="marketingChallenge" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                    Current Marketing Challenge
                  </label>
                  <input
                    type="text"
                    name="marketingChallenge"
                    id="marketingChallenge"
                    value={formData.marketingChallenge}
                    onChange={handleChange}
                    className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                    placeholder="E.g., High quality but inconsistent posting"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="additionalNotes" className="text-caption text-cream-300 uppercase tracking-[0.05em] block mb-2 font-sans font-medium">
                  Additional Scope Notes
                </label>
                <textarea
                  name="additionalNotes"
                  id="additionalNotes"
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="w-full bg-charcoal-900 border border-charcoal-800 text-cream px-4 py-3 text-body-sm focus:border-terracotta focus:outline-none transition-colors duration-300"
                  placeholder="Share details about your locations, staff likeness permissions, or timeline highlights."
                />
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  name="consent"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 accent-[#c4704b]"
                />
                <label htmlFor="consent" className="text-caption text-[rgba(245,240,232,0.6)] leading-relaxed font-sans">
                  I consent to sharing this business information to draft a campaign proposal. We handle likeness permissions and reference assets with direct confidentiality. *
                </label>
              </div>

              <div className="pt-4">
                {submissionError && (
                  <p
                    className="mb-4 text-body-sm text-terracotta-300"
                    role="alert"
                  >
                    {submissionError} You can also email{" "}
                    <a className="underline" href={`mailto:${contactEmail}`}>
                      {contactEmail}
                    </a>
                    .
                  </p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? "Sending Enquiry..." : "Submit Enquiry"}
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 px-4 flex flex-col items-center gap-6"
            >
              <span className="text-display-xl text-terracotta">✓</span>
              <h3 className="text-display-sm font-serif text-cream">
                Enquiry Submitted Successfully
              </h3>
              <p className="text-body-sm text-cream-300 font-sans max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. We have received your creative outline details for <strong>{formData.businessName}</strong>. Our team will review the parameters and contact you at <strong>{formData.email}</strong>.
              </p>
              <div className="pt-4">
                <Button onClick={() => setSubmitted(false)} variant="secondary">
                  Back to Form
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-900 text-cream pt-32 pb-24">
      <div className="container-content">
        <SectionHeading
          title="Start Your Project"
          subtitle="Submit a qualified enquiry below or open our Calendly scheduler to book a direct creative review call."
        />

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <p className="text-body-md text-cream-300">Loading form parameters...</p>
            </div>
          }
        >
          <ContactFormInner />
        </Suspense>
      </div>
    </div>
  );
}
