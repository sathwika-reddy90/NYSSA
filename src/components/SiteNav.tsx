import { useEffect, useState } from "react";
import nyssaLogo from "@/assets/brand/nyssa-logo.png";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-charcoal-deep/85 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="/#top" className="flex items-center">
          <img
            src={nyssaLogo}
            alt="NYSSA DE LUXURIA"
            className="h-7 md:h-9 w-auto object-contain"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-10 text-[0.72rem] uppercase tracking-[0.25em] text-muted-foreground">
          <a href="/#projects" className="hover:text-gold transition-colors">
            Projects
          </a>
          <a href="/#philosophy" className="hover:text-gold transition-colors">
            Philosophy
          </a>
          <a href="/#stories" className="hover:text-gold transition-colors">
            Stories
          </a>
          <a href="/#contact" className="hover:text-gold transition-colors">
            Contact
          </a>
        </nav>
        <a
          href="/#contact"
          className="btn-ghost-luxe hidden md:inline-flex !py-3 !px-5 text-[0.65rem]"
        >
          Book Consultation
        </a>
      </div>
    </header>
  );
}
