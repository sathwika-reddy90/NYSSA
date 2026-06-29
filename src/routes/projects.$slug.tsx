import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { Nav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — NYSSA DE LUXURIA` },
          {
            name: "description",
            content: `${loaderData.title}, ${loaderData.location} — a signature interior project by NYSSA DE LUXURIA.`,
          },
          { property: "og:title", content: `${loaderData.title} — NYSSA DE LUXURIA` },
          { property: "og:image", content: loaderData.heroImage },
        ]
      : [],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + project.gallery.length) % project.gallery.length,
    );
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % project.gallery.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const total = project.gallery.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total));
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % total));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, project.gallery.length]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />

      {/* HERO */}
      <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden">
        <img
          src={project.heroImage}
          alt={`${project.title} — ${project.location}`}
          className="h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/70 via-charcoal-deep/40 to-charcoal-deep" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
          <Link
            to="/"
            hash="projects"
            className="eyebrow mb-8 inline-flex items-center gap-3 text-ivory/70 hover:text-gold transition-colors w-fit"
          >
            <span className="hairline mr-1" />
            Back to Projects
          </Link>
          <p className="eyebrow mb-4">{project.location}</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory">
            {project.title}
          </h1>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="mb-16">
              <p className="eyebrow mb-6">
                <span className="hairline mr-4" />
                Full Gallery
              </p>
              <h2 className="font-display text-3xl md:text-5xl max-w-2xl leading-[1.1]">
                {project.gallery.length} photographs from{" "}
                <span className="italic text-gold">{project.title}</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {project.gallery.map((src, i) => (
              <Reveal
                key={src}
                delay={(i % 6) * 80}
                className={i % 7 === 0 ? "col-span-2 row-span-2" : ""}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`group relative block h-full w-full overflow-hidden cursor-pointer ${
                    i % 7 === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${project.title} interior detail ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/30 transition-colors duration-500" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal-deep/96 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute top-6 right-6 text-ivory/70 hover:text-gold transition-colors"
          >
            <X size={32} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 md:left-8 text-ivory/70 hover:text-gold transition-colors"
          >
            <ChevronLeft size={40} />
          </button>

          <img
            src={project.gallery[lightboxIndex]}
            alt={`${project.title} interior detail ${lightboxIndex + 1}`}
            className="max-h-[88vh] max-w-[88vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-2 md:right-8 text-ivory/70 hover:text-gold transition-colors"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-6 left-0 right-0 text-center text-xs uppercase tracking-[0.25em] text-ivory/50">
            {lightboxIndex + 1} / {project.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
}
