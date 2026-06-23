"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mainNavItems } from "@/data/navigation";
import { Button } from "./Button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      id="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 600ms ease",
        backgroundColor: isScrolled ? "rgba(13,13,13,0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        paddingBlock: isScrolled ? "1rem" : "1.5rem",
      }}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          id="site-logo"
          className="font-serif text-xl md:text-2xl tracking-tight text-[#f5f0e8] hover:text-[#c4704b] transition-colors duration-300"
        >
          Cabij<span style={{ color: "#c4704b" }}>_</span>studio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" id="desktop-nav" aria-label="Main navigation">
          {mainNavItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                onClick={() => setActiveDropdown(null)}
                className={`font-sans text-caption uppercase tracking-[0.1em] transition-colors duration-300 link-underline ${
                  pathname === item.href
                    ? "text-[#c4704b]"
                    : "text-[rgba(245,240,232,0.7)] hover:text-[#f5f0e8]"
                }`}
              >
                {item.label}
              </Link>

              <AnimatePresence>
                {item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      marginTop: "0.5rem",
                      backgroundColor: "#2a2a2a",
                      border: "1px solid rgba(245,240,232,0.1)",
                      minWidth: "200px",
                      paddingBlock: "0.5rem",
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-2.5 text-body-sm text-[rgba(245,240,232,0.7)] hover:text-[#f5f0e8] hover:bg-[rgba(245,240,232,0.05)] transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="/contact" variant="primary" size="default" id="header-cta">
            Book a Creative Call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          id="mobile-menu-toggle"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 bg-[#f5f0e8]"
            style={{ height: "1px" }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 bg-[#f5f0e8]"
            style={{ height: "1px" }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 bg-[#f5f0e8]"
            style={{ height: "1px" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-menu"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#1a1a1a",
              zIndex: -1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
              {mainNavItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  {item.children ? (
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-display-sm font-serif text-[rgba(245,240,232,0.3)]">
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="text-body-lg font-sans text-[rgba(245,240,232,0.7)] hover:text-[#c4704b] transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-display-sm font-serif text-[#f5f0e8] hover:text-[#c4704b] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mainNavItems.length * 0.1 }}
                className="mt-4"
              >
                <Button href="/contact" variant="primary" size="lg" onClick={() => setIsOpen(false)}>
                  Book a Creative Call
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
