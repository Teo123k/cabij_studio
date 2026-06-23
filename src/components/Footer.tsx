import Link from "next/link";
import { footerNavItems } from "@/data/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const email = process.env.NEXT_PUBLIC_EMAIL || "info@cabij-production.co";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  return (
    <footer
      id="site-footer"
      style={{
        backgroundColor: "#0d0d0d",
        borderTop: "1px solid rgba(245,240,232,0.05)",
      }}
    >
      <div className="container-content section-padding-sm">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl tracking-tight text-[#f5f0e8]"
            >
              Cabij<span style={{ color: "#c4704b" }}>_</span>studio
            </Link>
            <p className="mt-4 text-body-sm text-[rgba(245,240,232,0.5)] max-w-xs">
              Creative production for hospitality and wellness brands. Premium
              social content built around your people, spaces and identity.
            </p>
          </div>

          {/* Studio */}
          <div>
            <h4 className="text-caption font-sans uppercase tracking-[0.1em] text-[rgba(245,240,232,0.4)] mb-4">
              Studio
            </h4>
            <ul className="space-y-3">
              {footerNavItems.studio.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-[rgba(245,240,232,0.6)] hover:text-[#f5f0e8] transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-caption font-sans uppercase tracking-[0.1em] text-[rgba(245,240,232,0.4)] mb-4">
              Industries
            </h4>
            <ul className="space-y-3">
              {footerNavItems.industries.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-[rgba(245,240,232,0.6)] hover:text-[#f5f0e8] transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-caption font-sans uppercase tracking-[0.1em] text-[rgba(245,240,232,0.4)] mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-body-sm text-[rgba(245,240,232,0.6)] hover:text-[#c4704b] transition-colors duration-300"
                >
                  {email}
                </a>
              </li>
              {instagramUrl && (
                <li>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-[rgba(245,240,232,0.6)] hover:text-[#c4704b] transition-colors duration-300"
                  >
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(245,240,232,0.05)" }}
        >
          <p className="text-caption text-[rgba(245,240,232,0.3)]">
            © {currentYear} Cabij Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerNavItems.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-caption text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.6)] transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
