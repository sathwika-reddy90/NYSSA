import nyssaLogo from "@/assets/brand/nyssa-logo.png";

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <div className="eyebrow mb-6">{title}</div>
      <ul className="space-y-3 text-sm text-ivory/75">
        {items.map((i) => (
          <li key={i}>
            <a href="/#" className="hover:text-gold transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal-deep border-t border-border px-6 md:px-12 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-border">
          <div className="md:col-span-5">
            <img
              src={nyssaLogo}
              alt="NYSSA DE LUXURIA"
              className="h-8 md:h-10 w-auto object-contain"
            />
            <p className="mt-6 font-display italic text-2xl md:text-3xl leading-snug text-ivory/85 max-w-md">
              Design is not what you see.
              <span className="block text-gold not-italic font-normal">It is what you feel.</span>
            </p>
          </div>

          <FooterCol title="Studio" items={["About", "Philosophy", "Press", "Careers"]} />
          <FooterCol title="Work" items={["Projects", "Services"]} />
          <FooterCol
            title="Contact"
            items={[
              "+91 9959339998",
              "studio@nyssadeluxuria.com",
              "Hyderabad",
              "Instagram",
              "LinkedIn",
            ]}
          />
        </div>
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
          <span>© {new Date().getFullYear()} NYSSA DE LUXURIA · All rights reserved</span>
          <span>
            BESPOKE INTERIOR CONCEPTS • PHOTOREALISTIC 3D VISUALIZATION • DESIGNED BEFORE BUILT
          </span>
        </div>
      </div>
    </footer>
  );
}
