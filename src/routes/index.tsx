import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroVilla from "@/assets/hero-villa.jpg";
import aboutStudio from "@/assets/about-studio.jpg";
import projPenthouse from "@/assets/project-penthouse.jpg";
import materials from "@/assets/materials.jpg";
import consultationBg from "@/assets/consultation-bg.jpg";
import { projects } from "@/data/projects";
import { Reveal, useReveal } from "@/components/Reveal";
import { Nav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NYSSA DE LUXURIA — Designing Extraordinary Spaces for Extraordinary Lives" },
      {
        name: "description",
        content:
          "Bespoke luxury interior architecture and turnkey design consultancy for villas, penthouses, residences and hospitality.",
      },
      { property: "og:title", content: "NYSSA DE LUXURIA — Luxury Interior Architecture" },
      {
        property: "og:description",
        content:
          "Bespoke luxury interiors, architecture and turnkey experiences crafted for visionaries.",
      },
      { property: "og:image", content: heroVilla },
      { name: "twitter:image", content: heroVilla },
    ],
  }),
  component: Index,
});

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

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwBX7FUzrjHMclDUfm4zz3rolhcUVogkLDe2S0uQTsQf1v3Se4mNMIp4vB8miS8bg_t/exec";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  location: "",
  projectType: "",
  budgetRange: "",
  message: "",
};

const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(data: typeof EMPTY_FORM): string | null {
  const allFilled = Object.values(data).every((value) => value.trim() !== "");
  if (!allFilled) {
    return "Please complete all required fields";
  }
  if (!PHONE_REGEX.test(data.phone.trim())) {
    return "Please enter a valid 10-digit phone number";
  }
  if (!EMAIL_REGEX.test(data.email.trim())) {
    return "Please enter a valid email address";
  }
  return null;
}

function Index() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return; // guards against double-click / double-submit

    const validationError = validateForm(formData);
    if (validationError) {
      setFormError(validationError);
      setStatus("error");
      return;
    }

    setFormError(null);
    setStatus("submitting");

    try {
      // IMPORTANT: Content-Type must be "text/plain" (a CORS-safelisted type),
      // NOT "application/json" — a JSON content-type forces the browser to send
      // a CORS preflight (OPTIONS) request that Apps Script web apps can't
      // answer, which is what causes "blocked by CORS policy" / "Failed to fetch".
      //
      // mode: "no-cors" is used because Apps Script's redirect-based response
      // doesn't reliably expose Access-Control-Allow-Origin on the *actual*
      // response body, even though the request itself succeeds server-side.
      // That mismatch is exactly why the row was being saved to the Sheet
      // while the browser still failed to parse a response and showed a false
      // "Something went wrong" error. With no-cors the response is opaque by
      // design, so success is judged by "the request didn't throw" rather
      // than by reading response JSON we were never reliably able to read.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error(error);
      setFormError("Something went wrong sending your request. Please try again or reach us directly.");
      setStatus("error");
    }
  };
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
          <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
            Bespoke luxury interior concepts and world-class 3D visualizations crafted for
            visionaries, homeowners, developers, and those who believe every exceptional space
            begins with exceptional design.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 animate-luxe-fade [animation-delay:700ms]">
            <a href="#contact" className="btn-luxe">
              Book Private Consultation
            </a>
            <a href="#projects" className="btn-ghost-luxe">
              View Signature Projects
            </a>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border bg-charcoal-deep/70 backdrop-blur-sm">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 divide-x divide-border">
            {[
              ["30+", "Cumulative Experience"],
              ["100%", "Customization"],
              ["100+", "Premium Projects"],
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
                alt="NYSSA DE LUXURIA design studio with architects reviewing villa plans"
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
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
              We don't just create 3D renders.
              <br />
              <span className="italic text-gold">We envision extraordinary living.</span>
            </h2>
            <div className="mt-10 space-y-6 text-muted-foreground text-base md:text-[1.05rem] leading-[1.85] max-w-xl">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                At NYSSA DE LUXURIA, every project begins with a vision. We specialize in luxury
                interior design, crafting bespoke concepts and ultra-realistic 3D visualizations
                that allow clients to experience their dream spaces before execution begins.
              </p>

              <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                Every design is thoughtfully curated, balancing aesthetics, functionality, and
                timeless elegance. For clients seeking end-to-end project execution, our trusted
                execution partner, SPOC Interiors, transforms these concepts into reality with
                precision and craftsmanship.
              </p>
              <p className="text-ivory">
                Every concept is intentional.
                <br />
                Every render tells a story.
                <br />
                Every space begins with a vision.
              </p>
            </div>
            <div className="mt-12 flex gap-12">
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
                <p className="eyebrow mb-6">
                  <span className="hairline mr-4" />
                  Signature Projects
                </p>
                <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
                  A portfolio of <span className="italic text-gold">quiet opulence.</span>
                </h2>
              </div>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Each project is a singular expression — sculpted around the rituals, heirlooms and
                aspirations of its inhabitants.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {[
              { ...projects[0], cls: "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[5/6]" },
              { ...projects[1], cls: "col-span-12 md:col-span-5 aspect-[4/5]" },
              { ...projects[2], cls: "col-span-12 md:col-span-5 aspect-[5/6]" },
              { ...projects[3], cls: "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[5/6]" },
            ].map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120} className={p.cls}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block h-full w-full overflow-hidden cursor-pointer"
                >
                  <img
                    src={p.heroImage}
                    alt={`${p.title} — ${p.location}`}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/30 to-transparent opacity-90" />
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                    <p className="eyebrow !text-ivory/70">{p.location}</p>
                    <h3 className="font-display text-2xl md:text-4xl mt-3 text-ivory">{p.title}</h3>
                    <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-[max-height] duration-700">
                      <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                        <span>{p.gallery.length} Photographs</span>
                        <span className="italic text-ivory/80 text-right">View Full Gallery →</span>
                      </div>
                    </div>
                  </div>
                </Link>
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
              {
                n: "01",
                t: "Human-Centered Luxury",
                b: "We design around lifestyles, not floor plans. The way you wake, host, retreat and dream is the brief.",
              },
              {
                n: "02",
                t: "Architectural Precision",
                b: "Every reveal, joint and shadow line is intentional. Technical refinement is the unseen luxury.",
              },
              {
                n: "03",
                t: "Timeless Aesthetics",
                b: "Designs that remain relevant for decades. We resist trends and pursue inheritance.",
              },
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
              <button
                className="btn-luxe"
                onClick={() => window.open("https://www.instagram.com/reel/DYly5-_hTXj/", "_blank")}
              >
                <span className="w-8 h-8 rounded-full border border-charcoal/40 inline-flex items-center justify-center">
                  ▶
                </span>
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
              <p className="eyebrow mb-6">
                <span className="hairline mr-4" />
                Client Stories
              </p>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
                Words from <span className="italic text-gold">those who live within.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {[
              {
                q: "The team didn't just design our home. They transformed how we live.",
                r: "SANCIA VILLA · HYDERABAD",
              },
              {
                q: "The attention to detail exceeded every expectation we had set.",
                r: "APARNA ONE · HYDERABAD",
              },
              {
                q: "Every guest who visits asks who designed this space.",
                r: "DUPLEX HOUSE · VIJAYAWADA",
              },
              {
                q: "A perfect blend of luxury, comfort, and functionality.",
                r: "JAYABHERI ELEVATE · HYDERABAD",
              },
            ].map((t, i) => (
              <Reveal key={`${t.r}-${i}`} delay={i * 150}>
                <figure className="bg-card p-10 md:p-12 h-full border border-border/50 flex flex-col">
                  <div className="font-display text-6xl text-gold leading-none mb-6">"</div>
                  <blockquote className="font-display text-2xl md:text-[1.7rem] leading-[1.35] text-ivory flex-1">
                    {t.q}
                  </blockquote>
                  <figcaption className="mt-10 pt-6 border-t border-border/60">
                    <div className="mt-1 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
                      {t.r}
                    </div>
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
              <img
                src={materials}
                alt="Luxury material flatlay — marble, walnut veneer, brass and fabric"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <p className="eyebrow mb-6">
              <span className="hairline mr-4" />
              DESIGN PRECISION
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Luxury lives <span className="italic text-gold">in the details.</span>
            </h2>
            <p className="mt-8 text-muted-foreground leading-[1.85]">
              Every exceptional interior begins with an exceptional vision.
              At NYSSA DE LUXURIA, every line, proportion, texture, lighting
              effect, and spatial composition is meticulously crafted into
              photorealistic 3D visualizations allowing you to experience
              luxury long before it is built. Every render is designed to
              inspire confidence, evoke emotion, and reflect the timeless
              elegance of bespoke living.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-ivory/85">
              {[
                "Photorealistic 3D Renders",
                "Bespoke Interior Concepts",
                "Material & Texture Visualization",
                "Lighting Design",
                "Spatial Planning",
                "Luxury Styling",
              ].map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CONSULTATION */}
      <section id="contact" className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={consultationBg}
            alt="Luxury mansion at twilight"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal-deep/85" />
        </div>
        <div className="relative max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="eyebrow mb-6">
              <span className="hairline mr-4" />
              Begin
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-ivory">
              Your dream space begins
              <span className="block italic text-gold">with a conversation.</span>
            </h2>
            <p className="mt-8 text-muted-foreground leading-[1.85] max-w-md">
              Share a few details about your project. A senior design principal will personally
              reach out within 48 hours to schedule your private consultation.
            </p>
            <div className="mt-12 space-y-4 text-sm text-ivory/80">
              <div className="flex items-center gap-4">
                <span className="hairline" /> +91 9959339998
              </div>
              <div className="flex items-center gap-4">
                <span className="hairline" /> studio@nyssadeluxuria.com
              </div>
              <div className="flex items-center gap-4">
                <span className="hairline" /> Hyderabad
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form
              onSubmit={handleSubmit}
              className="bg-card/85 backdrop-blur-md border border-border/60 p-8 md:p-12 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <LuxField
                  label="Name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <LuxField
                  label="Phone"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setFormData({ ...formData, phone: digitsOnly });
                  }}
                />
                <LuxField
                  label="Email"
                  type="email"
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <LuxField
                  label="Location"
                  placeholder="City"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
                <LuxSelect
                  label="Project Type"
                  options={[
                    "Private Residence",
                    "Villa",
                    "Penthouse",
                    "Commercial",
                    "Hospitality",
                    "Other",
                  ]}
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      projectType: e.target.value,
                    })
                  }
                />
                <LuxSelect
                  label="Budget Range"
                  options={[
                    "₹50L - ₹1Cr",
                    "₹1Cr - ₹3Cr",
                    "₹3Cr - ₹10Cr",
                    "₹10Cr+",
                  ]}
                  value={formData.budgetRange}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budgetRange: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground mb-3">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  placeholder="Tell us about the life you want this space to hold."
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-ivory placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-luxe w-full mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : "Schedule Private Consultation"}
              </button>
              {status === "success" && (
                <p className="text-sm text-gold text-center pt-2">
                  Thank you — your consultation request has been received. A senior
                  design principal will reach out within 48 hours.
                </p>
              )}
              {status === "error" && formError && (
                <p className="text-sm text-red-400 text-center pt-2">{formError}</p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function LuxField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground mb-3">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-ivory placeholder:text-muted-foreground/60 transition-colors"
      />
    </div>
  );
}
function LuxSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label className="block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground mb-3">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-ivory transition-colors appearance-none cursor-pointer"
      >
        <option value="" className="bg-card">
          Select…
        </option>

        {options.map((o, index) => (
          <option
            key={`${o}-${index}`}
            value={o}
            className="bg-card text-ivory"
          >
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
