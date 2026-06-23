# Cabij Studio Website

Production website for Cabij Studio, a creative production studio serving private chefs, restaurants, retreats, and yoga and wellness brands.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and replace the placeholder values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL used by metadata, robots, and sitemap |
| `NEXT_PUBLIC_EMAIL` | Public contact email |
| `NEXT_PUBLIC_BOOKING_URL` | Calendly or another booking link |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Full public Instagram profile URL |
| `ENQUIRY_WEBHOOK_URL` | Server-side endpoint that receives qualified enquiry JSON |
| `ENQUIRY_WEBHOOK_TOKEN` | Optional bearer token sent to the enquiry webhook |

The enquiry form returns an honest configuration error until `ENQUIRY_WEBHOOK_URL` is set. It never displays a false success state.

## Content editing

Primary reusable content lives in:

- `src/data/industries.ts` — industry-page copy and imagery
- `src/data/portfolio.ts` — portfolio projects and case-study content
- `src/data/services.ts` — service descriptions and deliverables
- `src/data/process.ts` — four-stage studio process
- `src/data/navigation.ts` — header and footer links

Images live in `public/images`. Keep the existing paths when replacing assets, or update the matching `imageSrc` value in the data file.

Portfolio labels must remain honest. Use only:

- `Studio Project`
- `Original Concept`
- `Creative Study`
- `Spec Campaign`
- `Client Work` when the project is genuinely commissioned

## Enquiry webhook

`POST /api/enquiry` validates required fields, email format, consent, and a honeypot field before forwarding the payload to `ENQUIRY_WEBHOOK_URL`.

The receiving endpoint should accept JSON. The forwarded payload includes all form fields plus:

```json
{
  "submittedAt": "ISO-8601 timestamp",
  "source": "cabijstudio.co"
}
```

Suitable receivers include an n8n webhook, Make, Zapier, a CRM endpoint, or a custom API.

## Verification

```bash
npm run lint
npm run build
```

Before launch, also verify:

1. Every navigation and portfolio link.
2. The enquiry webhook using a real test submission.
3. Booking, Instagram, and email links.
4. Mobile layouts and keyboard navigation.
5. Privacy and terms language with legal counsel.

## Deployment

Deploy to any platform supporting Next.js 16. Configure all environment variables in the deployment environment before building.
