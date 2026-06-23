export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  industry: IndustrySlug;
  objective: string;
  creativeDirection: string;
  deliverables: string[];
  platform: string[];
  label: "Studio Project" | "Original Concept" | "Creative Study" | "Spec Campaign" | "Client Work";
  imageSrc: string;
  imageAlt: string;
  featured: boolean;
}

export type IndustrySlug = "private-chefs" | "restaurants" | "retreats" | "yoga-wellness";

export interface Industry {
  slug: IndustrySlug;
  name: string;
  headline: string;
  description: string;
  focusAreas: string[];
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
}

export interface Service {
  title: string;
  description: string;
  items: string[];
  icon: "direction" | "production" | "partnership";
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FormData {
  name: string;
  businessName: string;
  email: string;
  website: string;
  instagram: string;
  industry: string;
  objective: string;
  contentNeeded: string;
  monthlyVolume: string;
  marketingChallenge: string;
  targetLaunchDate: string;
  approximateBudget: string;
  additionalNotes: string;
  consent: boolean;
}
