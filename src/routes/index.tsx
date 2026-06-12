import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroVilla from "@/assets/hero-villa.jpg";
import aboutStudio from "@/assets/about-studio.jpg";
import projVilla from "@/assets/project-villa.jpg";
import projPenthouse from "@/assets/project-penthouse.jpg";
import projLiving from "@/assets/project-living.jpg";
import projOffice from "@/assets/project-office.jpg";
import projBedroom from "@/assets/project-bedroom.jpg";
import projLounge from "@/assets/project-lounge.jpg";
import materials from "@/assets/materials.jpg";
import consultationBg from "@/assets/consultation-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NYSA DE LUXURIA — Designing Extraordinary Spaces for Extraordinary Lives" },
      { name: "description", content: "Bespoke luxury interior architecture and turnkey design consultancy for villas, penthouses, residences and hospitality." },
      { property: "og:title", content: "NYSA DE LUXURIA — Luxury Interior Architecture" },
      { property: "og:description", content: "Bespoke luxury interiors, architecture and turnkey experiences crafted for visionaries." },
      { property: "og:image", content: heroVilla },
      { name: "twitter:image", content: heroVilla },
    ],
  }),
  component: Index,
});

/* ——— Reveal-on-scroll hook ——— */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), obs.disconnect()),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ——— Animated counter ——— */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ——— Reveal wrapper ——— */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ——— Sticky nav ——— */
function Nav() {
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
        <a href="#top" className="font-display text-xl md:text-2xl tracking-[0.25em] text-ivory">
          NYSA<span className="text-gold mx-2">·</span>DE LUXURIA
        </a>
        <nav className="hidden lg:flex items-center gap-10 text-[0.72rem] uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#projects" className="hover:text-gold transition-colors">Projects</a>
          <a href="#philosophy" className="hover:text-gold transition-colors">Philosophy</a>
          <a href="#process" className="hover:text-gold transition-colors">Process</a>
          <a href="#stories" className="hover:text-gold transition-colors">Stories</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </nav>
        <a href="#contact" className="btn-ghost-luxe hidden md:inline-flex !py-3 !px-5 text-[0.65rem]">
          Book Consultation
        </a>
      </div>
    </header>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroVilla}
            alt="Luxury villa interior with double-height ceiling and Italian marble"
            className="h-full w-full object-cover animate-ken-burns"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/70 via-charcoal-deep/40 to-charcoal-deep" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
          <div className="animate-luxe-fade">
            <p className="eyebrow mb-8">
              <span className="hairline mr-4" />
              Luxury Interior Architecture · Est. India
            </p>
          </div>
          <h1 className="animate-luxe-rise font-display text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] max-w-[1100px] text-ivory">
            Designing extraordinary
            <span className="block italic text-gold/95">spaces</span>
            for extraordinary lives.
          </h1>
          <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground animate-luxe-fade [animation-delay:400ms]">
            Bespoke luxury interiors, architecture and turnkey experiences crafted for
            visionaries, homeowners, developers and modern luxury living.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 animate-luxe-fade [animation-delay:700ms]">
            <a href="#contact" className="btn-luxe">Book Private Consultation</a>
            <a href="#projects" className="btn-ghost-luxe">View Signature Projects</a>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border bg-charcoal-deep/70 backdrop-blur-sm">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              ["150+", "Luxury Projects"],
              ["₹50Cr+", "Project Value Delivered"],
              ["98%", "Client Satisfaction"],
              ["10+", "Years Design Excellence"],
            ].map(([n, l]) => (
              <div key={l} className="py-5 md:py-6 px-4 text-center">
                <div className="font-display text-2xl md:text-3xl text-gold">{n}</div>
                <div className="mt-1 text-[0.65rem] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={aboutStudio}
                alt="NYSA DE LUXURIA design studio with architects reviewing villa plans"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1280}
                height={1600}
              />
              <div className="absolute -bottom-px left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="eyebrow mb-6">
              <span className="hairline mr-4" />
              The Studio
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              We don't design interiors.
              <span className="block italic text-gold">We curate legacies.</span>
            </h2>
            <div className="mt-10 space-y-6 text-muted-foreground text-base md:text-[1.05rem] leading-[1.85] max-w-xl">
              <p>
                At NYSA DE LUXURIA, every project begins with understanding the life that will
                unfold within it. We blend architecture, interior design, craftsmanship,
                technology and luxury experiences to create spaces that reflect identity,
                aspiration and timeless elegance.
              </p>
              <p className="text-ivory">
                Every detail is intentional.<br />
                Every material is curated.<br />
                Every space is designed to elevate everyday living.
              </p>
            </div>
            <div className="mt-12 flex gap-12">
              <div>
                <div className="font-display text-4xl text-gold"><Counter to={25} suffix="+" /></div>
                <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">Design Specialists</div>
              </div>
              <div>
                <div className="font-display text-4xl text-gold"><Counter to={10} suffix="+" /></div>
                <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">Cities Served</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURE PROJECTS */}
      <section id="projects" className="py-28 md:py-40 px-6 md:px-12 bg-charcoal-deep">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div>
                <p className="eyebrow mb-6"><span className="hairline mr-4" />Signature Projects</p>
                <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
                  A portfolio of <span className="italic text-gold">quiet opulence.</span>
                </h2>
              </div>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Each project is a singular expression — sculpted around the rituals,
                heirlooms and aspirations of its inhabitants.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {[
              { img: projVilla,     name: "The Marble Sanctuary",   place: "Bengaluru",     area: "12,400 sq ft", value: "₹14.2 Cr", phi: "Tactile minimalism, framed by Calacatta", cls: "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[5/6]" },
              { img: projPenthouse, name: "Sky Residence 41",       place: "Mumbai",        area: "6,800 sq ft",  value: "₹22.5 Cr", phi: "Sunset-led penthouse with full skyline aperture", cls: "col-span-12 md:col-span-5 aspect-[4/5]" },
              { img: projLiving,    name: "Salon Noir",              place: "Hyderabad",     area: "4,200 sq ft",  value: "₹6.8 Cr",  phi: "An entertaining salon for collectors", cls: "col-span-12 md:col-span-5 aspect-[5/6]" },
              { img: projBedroom,   name: "Suite Aurelia",           place: "New Delhi",     area: "2,100 sq ft",  value: "₹3.4 Cr",  phi: "A primary suite of silk, oak and warm light", cls: "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[5/6]" },
              { img: projOffice,    name: "Atelier Boardroom",       place: "Pune",          area: "5,600 sq ft",  value: "₹8.9 Cr",  phi: "Stone-clad executive headquarters", cls: "col-span-12 md:col-span-6 aspect-[5/6]" },
              { img: projLounge,    name: "Maison Vermeil",          place: "Goa",           area: "9,300 sq ft",  value: "₹18.0 Cr", phi: "A hospitality lounge of cinematic warmth", cls: "col-span-12 md:col-span-6 aspect-[5/6]" },
            ].map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 120} className={p.cls}>
                <div className="group relative h-full w-full overflow-hidden cursor-pointer">
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.place}`}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/30 to-transparent opacity-90" />
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="eyebrow !text-ivory/70">{p.place}</p>
                      <p className="font-display text-gold text-xl md:text-2xl">{p.value}</p>
                    </div>
                    <h3 className="font-display text-2xl md:text-4xl mt-3 text-ivory">{p.name}</h3>
                    <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-[max-height] duration-700">
                      <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                        <span>{p.area}</span>
                        <span className="italic text-ivory/80 text-right max-w-[60%]">{p.phi}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="eyebrow mb-6">Our Design Philosophy</p>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
                Three principles, <span className="italic text-gold">one quiet conviction.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { n: "01", t: "Human-Centered Luxury", b: "We design around lifestyles, not floor plans. The way you wake, host, retreat and dream is the brief." },
              { n: "02", t: "Architectural Precision", b: "Every reveal, joint and shadow line is intentional. Technical refinement is the unseen luxury." },
              { n: "03", t: "Timeless Aesthetics", b: "Designs that remain relevant for decades. We resist trends and pursue inheritance." },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 150}>
                <div className="bg-background p-10 md:p-14 h-full hover:bg-card transition-colors duration-700">
                  <div className="flex items-start justify-between mb-10">
                    <span className="font-display text-gold text-2xl">{c.n}</span>
                    <span className="hairline" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight">{c.t}</h3>
                  <p className="mt-6 text-muted-foreground leading-relaxed">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 md:py-40 px-6 md:px-12 bg-charcoal-deep">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <p className="eyebrow mb-6"><span className="hairline mr-4" />Our Process</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">
              Six considered movements <span className="italic text-gold">from vision to handover.</span>
            </h2>
          </Reveal>

          <div className="mt-20 relative">
            <div className="absolute top-[44px] left-0 right-0 h-px bg-border hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-6">
              {[
                ["Discover", "Private Consultation"],
                ["Define",   "Vision & Lifestyle Mapping"],
                ["Design",   "Concept Development"],
                ["Curate",   "Material & Experience Selection"],
                ["Execute",  "Luxury Turnkey Delivery"],
                ["Perfect",  "Final Styling & Handover"],
              ].map(([k, v], i) => (
                <Reveal key={k} delay={i * 100}>
                  <div className="relative">
                    <div className="h-[88px] flex items-center justify-center md:justify-start">
                      <div className="relative">
                        <div className="w-3 h-3 rotate-45 bg-gold" />
                        <div className="absolute inset-0 w-3 h-3 rotate-45 bg-gold animate-ping opacity-30" />
                      </div>
                    </div>
                    <div className="font-display text-3xl text-ivory">{k}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{v}</div>
                    <div className="mt-4 text-[0.65rem] text-gold tracking-[0.3em]">0{i + 1}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY NYSA — counters */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-background">
        <div className="max-w-[1500px] mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <p className="eyebrow mb-6">Why NYSA DE LUXURIA</p>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
                A decade of <span className="italic text-gold">discerning craft.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
            {[
              { n: 150, s: "+", l: "Projects Completed" },
              { n: 25,  s: "+", l: "Design Specialists" },
              { n: 50,  s: "+", l: "Luxury Partners" },
              { n: 100, s: "%", l: "Customized Solutions" },
              { n: 10,  s: "+", l: "Cities Served" },
              { n: 98,  s: "%", l: "Client Retention" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={(i % 3) * 100}>
                <div className="bg-background p-10 md:p-14 text-center">
                  <div className="font-display text-5xl md:text-7xl text-gold">
                    <Counter to={s.n} suffix={s.s} />
                  </div>
                  <div className="mt-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FILM */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={projPenthouse}
          alt="Featured project film backdrop"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal-deep/65" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <p className="eyebrow mb-8">Featured Project Film</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl max-w-4xl text-ivory leading-[1.05]">
              Experience spaces <span className="italic text-gold">before they exist.</span>
            </h2>
            <div className="mt-12">
              <button className="btn-luxe">
                <span className="w-8 h-8 rounded-full border border-charcoal/40 inline-flex items-center justify-center">▶</span>
                Watch Project Film
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="stories" className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <Reveal>
            <div className="mb-20 max-w-3xl">
              <p className="eyebrow mb-6"><span className="hairline mr-4" />Client Stories</p>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
                Words from <span className="italic text-gold">those who live within.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 md:gap-6">
            {[
              { q: "The team didn't just design our home. They transformed how we live.", n: "Ananya & Rohan Mehra", r: "Private Residence · Mumbai" },
              { q: "The attention to detail exceeded every expectation we had set.",       n: "Vikram Shourie",        r: "Penthouse Owner · Bengaluru" },
              { q: "Every guest who visits asks who designed this space.",                 n: "The Khurana Family",    r: "Villa Owners · New Delhi" },
            ].map((t, i) => (
              <Reveal key={t.n} delay={i * 150}>
                <figure className="bg-card p-10 md:p-12 h-full border border-border/50 flex flex-col">
                  <div className="font-display text-6xl text-gold leading-none mb-6">"</div>
                  <blockquote className="font-display text-2xl md:text-[1.7rem] leading-[1.35] text-ivory flex-1">
                    {t.q}
                  </blockquote>
                  <figcaption className="mt-10 pt-6 border-t border-border/60">
                    <div className="text-sm text-ivory tracking-wide">{t.n}</div>
                    <div className="mt-1 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">{t.r}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-charcoal-deep">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={materials} alt="Luxury material flatlay — marble, walnut veneer, brass and fabric" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <p className="eyebrow mb-6"><span className="hairline mr-4" />Materials & Craftsmanship</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Luxury lives <span className="italic text-gold">in the details.</span>
            </h2>
            <p className="mt-8 text-muted-foreground leading-[1.85]">
              Italian marble. Natural stone. Premium veneers. Bespoke lighting. Hand-finished
              furniture. Imported fabrics. We source — and sometimes commission — every
              element to compose a singular material language for each home.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-ivory/85">
              {["Italian Marble","Natural Stone","Premium Veneers","Luxury Lighting","Bespoke Furniture","Imported Fabrics"].map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold rounded-full" />{m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PRESS */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-y border-border">
        <div className="max-w-[1500px] mx-auto">
          <Reveal>
            <p className="eyebrow text-center mb-12">As Featured In</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-center">
              {["Architectural Digest","Elle Decor","Design Anthology","Luxury Lifestyle","Business Today"].map((p) => (
                <div key={p} className="text-center">
                  <div className="font-display text-xl md:text-2xl text-ivory/70 hover:text-gold transition-colors duration-500">{p}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONSULTATION */}
      <section id="contact" className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src={consultationBg} alt="Luxury mansion at twilight" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-charcoal-deep/85" />
        </div>
        <div className="relative max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="eyebrow mb-6"><span className="hairline mr-4" />Begin</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-ivory">
              Your dream space begins
              <span className="block italic text-gold">with a conversation.</span>
            </h2>
            <p className="mt-8 text-muted-foreground leading-[1.85] max-w-md">
              Share a few details about your project. A senior design principal will personally
              reach out within 48 hours to schedule your private consultation.
            </p>
            <div className="mt-12 space-y-4 text-sm text-ivory/80">
              <div className="flex items-center gap-4"><span className="hairline" /> +91 9959339998</div>
              <div className="flex items-center gap-4"><span className="hairline" /> studio@nysadeluxuria.com</div>
              <div className="flex items-center gap-4"><span className="hairline" /> Hyderabad</div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-card/85 backdrop-blur-md border border-border/60 p-8 md:p-12 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <LuxField label="Name" placeholder="Your full name" />
                <LuxField label="Phone" placeholder="+91 ..." />
                <LuxField label="Email" type="email" placeholder="you@domain.com" />
                <LuxField label="Location" placeholder="City" />
                <LuxSelect label="Project Type" options={["Private Residence","Villa","Penthouse","Commercial","Hospitality","Other"]} />
                <LuxSelect label="Budget Range" options={["₹50L – ₹1Cr","₹1Cr – ₹3Cr","₹3Cr – ₹10Cr","₹10Cr+"]} />
              </div>
              <div>
                <label className="block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground mb-3">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about the life you want this space to hold."
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-ivory placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>
              <button type="submit" className="btn-luxe w-full mt-4">Schedule Private Consultation</button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal-deep border-t border-border px-6 md:px-12 pt-20 pb-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-border">
            <div className="md:col-span-5">
              <div className="font-display text-2xl tracking-[0.25em] text-ivory">
                NYSA<span className="text-gold mx-2">·</span>DE LUXURIA
              </div>
              <p className="mt-6 font-display italic text-2xl md:text-3xl leading-snug text-ivory/85 max-w-md">
                Design is not what you see.
                <span className="block text-gold not-italic font-normal">It is what you feel.</span>
              </p>
            </div>

            <FooterCol title="Studio" items={["About","Philosophy","Press","Careers"]} />
            <FooterCol title="Work"   items={["Projects","Services","Process","Materials"]} />
            <FooterCol title="Contact" items={["+91 9959339998","studio@nysadeluxuria.com","Hyderabad","Instagram","LinkedIn"]} />
          </div>
          <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
            <span>© {new Date().getFullYear()} NYSA DE LUXURIA · All rights reserved</span>
            <span>Luxury Interior Architecture · Bespoke Design Consultancy · Turnkey Excellence</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LuxField({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground mb-3">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-ivory placeholder:text-muted-foreground/60 transition-colors"
      />
    </div>
  );
}
function LuxSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground mb-3">{label}</label>
      <select
        defaultValue=""
        className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-ivory transition-colors appearance-none cursor-pointer"
      >
        <option value="" disabled className="bg-card">Select…</option>
        {options.map((o) => <option key={o} value={o} className="bg-card text-ivory">{o}</option>)}
      </select>
    </div>
  );
}
function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <div className="eyebrow mb-6">{title}</div>
      <ul className="space-y-3 text-sm text-ivory/75">
        {items.map((i) => (
          <li key={i}><a href="#" className="hover:text-gold transition-colors">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
