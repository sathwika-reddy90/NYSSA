export interface Project {
  slug: string;
  title: string;
  location: string;
  heroImage: string;
  gallery: string[];
}

const aparnaImages = import.meta.glob("../assets/projects/aparna-one/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const jayabheriImages = import.meta.glob("../assets/projects/jayabheri-elevate/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const duplexImages = import.meta.glob("../assets/projects/duplex-house/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const sanciaImages = import.meta.glob("../assets/projects/sancia-villa/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function toGallery(images: Record<string, string>): string[] {
  return Object.keys(images)
    .sort()
    .map((key) => images[key]);
}

function findHero(images: Record<string, string>, filename: string): string {
  const key = Object.keys(images).find((k) => k.endsWith(`/${filename}`));
  return key ? images[key] : Object.values(images)[0];
}

export const projects: Project[] = [
  {
    slug: "aparna-one",
    title: "Aparna One",
    location: "Hyderabad",
    heroImage: findHero(aparnaImages, "living-tv2.png"),
    gallery: toGallery(aparnaImages),
  },
  {
    slug: "duplex-house",
    title: "Duplex House",
    location: "Vijayawada",
    heroImage: findHero(duplexImages, "living1.png"),
    gallery: toGallery(duplexImages),
  },
  {
    slug: "jayabheri-elevate",
    title: "Jayabheri Elevate",
    location: "Hyderabad",
    heroImage: findHero(jayabheriImages, "living2.png"),
    gallery: toGallery(jayabheriImages),
  },
  {
    slug: "sancia-villa",
    title: "Sancia Villa",
    location: "Hyderabad",
    heroImage: findHero(sanciaImages, "living.png"),
    gallery: toGallery(sanciaImages),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
