import nyssaLogo from "@/assets/brand/nyssa-logo.png";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

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

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.171-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.205 0 1.03.397 2.137.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.222-.174.269-.402.162-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146A12.013 12.013 0 0 0 12.017 24c6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001Z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/nyssadeluxuria/",
    Icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@nyssadeluxuria?si=-3zbboyxCR23PA4A",
    Icon: Youtube,
  },
  {
    name: "Pinterest",
    href: "https://pin.it/2vwbrsZl6",
    Icon: PinterestIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590228189449",
    Icon: Facebook,
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-charcoal-deep border-t border-border px-6 md:px-12 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-border">
          <div className="md:col-span-4">
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

          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Contact</div>
            <ul className="space-y-4 text-sm text-ivory/75">
              <li>
                <a
                  href="tel:+919959339998"
                  className="group flex items-start gap-3 hover:text-gold transition-colors"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/80 group-hover:text-gold transition-colors" />
                  <span>+91 9959339998</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:studio@nyssadeluxuria.com"
                  className="group flex items-start gap-3 hover:text-gold transition-colors"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold/80 group-hover:text-gold transition-colors" />
                  <span>studio@nyssadeluxuria.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                <span className="leading-relaxed">
                  Suite No.4B, 4th Floor, Plot No 28A, Opp. Jiva Rehab Center, Beside Lane of
                  Union Bank, Madhura Nagar Colony, Gachibowli, Khajaguda, Hyderabad, Telangana
                  500032
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <div className="eyebrow mb-4">Follow Us</div>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/75 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-gold hover:text-gold hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-[400ms] group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
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
