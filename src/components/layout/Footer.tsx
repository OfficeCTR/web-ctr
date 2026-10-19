import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaTiktok } from "react-icons/fa";
import type { IconType } from "react-icons";
import { settings, socialLinks } from "../../lib/site";
import { stickers } from "../ui/sticker";
import { ctaItem, navItems } from "./Header";

type Contact = { icon: IconType; label: string; href: string; external?: boolean };

const socialIcon: Record<string, IconType> = {
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  LinkedIn: FaLinkedinIn,
  TikTok: FaTiktok,
};

const phone = settings.phone.replace(/\s/g, "");
const socials: Contact[] = socialLinks.map((s) => ({
  icon: socialIcon[s.name],
  label: s.handle || s.name,
  href: s.url,
  external: true,
}));
const leftContacts: Contact[] = [
  ...socials.filter((_, i) => i < 2),
  { icon: FaEnvelope, label: settings.email, href: `mailto:${settings.email}` },
];
const rightContacts: Contact[] = [
  ...socials.filter((_, i) => i >= 2),
  { icon: FaPhoneAlt, label: phone, href: `tel:${phone}` },
];

const rows: Array<Array<[string, number]>> = [
  [
    ["handshake", 383],
    ["summit-x-stage", 379],
    ["youth-sitting", 316],
    ["hall", 288],
  ],
  [
    ["capitala-group", 383],
    ["summit-4-room", 309],
    ["summit-4-panel", 412],
    ["speaker", 262],
  ],
  [
    ["lights", 383],
    ["summit-7", 359],
    ["badges", 265],
    ["crowd-hall", 359],
  ],
];

const ContactItem = ({ c, i }: { c: Contact; i: number }) => (
  <motion.a
    href={c.href}
    target={c.external ? "_blank" : undefined}
    rel={c.external ? "noopener noreferrer" : undefined}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 * i }}
    className="group flex flex-col items-center gap-2 text-center"
  >
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[22px] text-black shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:scale-110 lg:h-[57px] lg:w-[57px] lg:text-[28px]">
      <c.icon />
    </span>
    <span
      className="max-w-[16rem] font-cond text-lg font-extrabold leading-[0.95] tracking-tight sm:text-xl lg:text-[28px]"
      style={stickers.blackOnWhite}
    >
      {c.label}
    </span>
  </motion.a>
);

export const SocialWall = () => (
  <section id="contact" className="relative -mt-12 overflow-hidden bg-black pt-12 text-white">
    <div className="absolute inset-0 flex flex-col" aria-hidden>
      {rows.map((row, r) => (
        <div key={r} className="flex flex-1">
          {row.map(([src, w], i) => (
            <div
              key={src}
              className={`relative overflow-hidden ${i > 1 ? "hidden sm:block" : ""}`}
              style={{ flexGrow: w, flexBasis: 0 }}
            >
              <Image
                src={`/assets/design/photos/${src}.jpg`}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 30vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className="absolute inset-0 bg-black/50" aria-hidden />
    <div
      className="absolute inset-x-0 bottom-0 h-2/3"
      aria-hidden
      style={{
        background:
          "radial-gradient(38% 45% at 6% 100%, rgba(254,85,142,.7), transparent 72%), radial-gradient(32% 40% at 45% 104%, rgba(91,143,255,.6), transparent 72%), radial-gradient(28% 42% at 74% 100%, rgba(254,85,142,.4), transparent 72%), radial-gradient(28% 50% at 100% 100%, rgba(254,214,83,.75), transparent 72%)",
        mixBlendMode: "screen",
      }}
    />

    <div className="relative mx-auto grid max-w-[1366px] grid-cols-2 items-center gap-x-4 gap-y-10 px-5 pb-12 pt-12 sm:px-8 lg:min-h-[700px] lg:grid-cols-[1fr_1.4fr_1fr] lg:px-[6%] lg:pb-20 lg:pt-16">
      <div className="col-span-2 lg:order-2 lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="mx-auto w-[78%] max-w-[480px]"
        >
          <Image
            src="/assets/design/cu-si-despre.png"
            alt="#CuȘiDespreTineri"
            width={1000}
            height={800}
            className="h-auto w-full drop-shadow-[0_10px_25px_rgba(0,0,0,.45)]"
          />
        </motion.div>
      </div>
      <div className="flex flex-col gap-10 lg:order-1 lg:gap-14">
        {leftContacts.map((c, i) => (
          <ContactItem key={c.label} c={c} i={i} />
        ))}
      </div>
      <div className="flex flex-col gap-10 lg:order-3 lg:gap-14">
        {rightContacts.map((c, i) => (
          <ContactItem key={c.label} c={c} i={i} />
        ))}
      </div>
    </div>

    <div className="relative flex justify-center pb-8 lg:-mt-24 lg:pb-12">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-xl transition-transform duration-300 hover:-translate-y-1.5 lg:h-20 lg:w-20 lg:rounded-[22px]"
        aria-label="Înapoi sus"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 lg:h-10 lg:w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20V4M5 11l7-7 7 7" />
        </svg>
      </button>
    </div>
  </section>
);

const LogoRow = ({ items }: { items: typeof settings.sponsors }) => (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:flex-nowrap">
    {items
      .filter((s) => s.logo)
      .map((s) => {
        const img = (
          <span className="flex h-[56px] w-[124px] items-center justify-center transition-transform duration-300 hover:-translate-y-1">
            <img src={s.logo!} alt={s.name} className="max-h-full max-w-full object-contain" />
          </span>
        );
        return s.url ? (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
            {img}
          </a>
        ) : (
          <span key={s.name}>{img}</span>
        );
      })}
  </div>
);

export const SiteFooter = () => (
  <footer className="relative overflow-hidden border-t-[6px] border-white bg-black text-white">
    <div
      className="pointer-events-none absolute inset-0 bg-[url('/assets/design/footer-pattern.png')] bg-cover bg-top opacity-40"
      aria-hidden
    />
    <div className="relative mx-auto max-w-[1366px] px-5 pb-8 pt-14 sm:px-8 lg:px-[6%]">
      <h2 className="text-center text-2xl font-bold tracking-wide sm:text-[32px]">Consiliul Tineretului din România</h2>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="flex flex-col items-center">
          <h3 className="font-cond text-[44px] font-extrabold leading-none tracking-tight" style={stickers.inkLabel}>
            Sponsori
          </h3>
          <LogoRow items={settings.sponsors} />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-cond text-[44px] font-extrabold leading-none tracking-tight" style={stickers.inkLabel}>
            Parteneri
          </h3>
          <LogoRow items={settings.partners} />
        </div>
      </div>

      <nav className="mt-14 flex flex-wrap justify-center gap-x-7 gap-y-3 font-cond text-lg font-semibold text-white/70">
        <Link href="/" className="hover:text-ctr-yellow">
          Acasă
        </Link>
        {[...navItems, ctaItem].map((item) => (
          <Link key={item.path} href={item.path} className="hover:text-ctr-yellow">
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/45 md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} Federația Consiliul Tineretului din România · CUI {settings.vat}
        </p>
        <p>
          Cod scris cu &#x2661; de{" "}
          <a href="https://www.linkedin.com/in/crares/" className="text-white/70 hover:text-white">
            Rareș Cotoi
          </a>
        </p>
      </div>
    </div>
  </footer>
);
