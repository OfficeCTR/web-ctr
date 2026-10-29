import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

export const navItems = [
  { name: "Despre noi", path: "/despre" },
  { name: "Programe", path: "/proiecte" },
  { name: "Membri", path: "/membri" },
  { name: "Oportunități", path: "/oportunitati" },
  { name: "Blog", path: "/blog" },
  { name: "Susține-ne", path: "/support" },
];

export const ctaItem = { name: "Hai să vorbim!", path: "/contact-page" };

const accentByIndex = ["#5B8FFF", "#FE558E", "#FED653", "#5B8FFF", "#FE558E", "#FED653"];

const Header = () => {
  const { pathname } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-[1.5%] sm:pt-4">
        <nav
          className={`relative mx-auto flex max-w-[1326px] items-center justify-between overflow-hidden rounded-[18px] bg-gradient-to-r from-black via-[#1d1d1d] to-[#6b6b6b] pl-5 pr-4 text-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 sm:pl-[3.7%] sm:pr-[3%] xl:pr-[4.5%] ${
            scrolled ? "h-[66px] lg:h-[78px]" : "h-[72px] lg:h-[118px] xl:h-[134px]"
          }`}
        >
          <Link href="/" aria-label="Consiliul Tineretului din România — Acasă" className="relative shrink-0">
            <Image
              src="/assets/design/logo.png"
              alt="20 Years of CTR — Consiliul Tineretului din România"
              width={630}
              height={154}
              priority
              className={`h-auto transition-all duration-500 ${
                scrolled ? "w-[170px] lg:w-[clamp(170px,16vw,215px)]" : "w-[170px] lg:w-[clamp(190px,23vw,315px)]"
              }`}
            />
          </Link>

          <ul className="ml-6 hidden items-center gap-[clamp(14px,2.2vw,40px)] lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.path || pathname.startsWith(item.path + "/");
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="group relative whitespace-nowrap font-cond text-[clamp(16px,1.5vw,21px)] font-semibold tracking-wide"
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[3px] rounded-full bg-ctr-yellow transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={ctaItem.path}
                className={`ml-[clamp(0px,0.6vw,8px)] inline-flex items-center whitespace-nowrap rounded-full border-2 border-white px-[clamp(16px,1.8vw,24px)] font-cond text-[clamp(16px,1.5vw,21px)] font-semibold tracking-wide transition-all duration-300 hover:bg-white hover:text-black ${
                  scrolled ? "py-2" : "py-3"
                } ${pathname === ctaItem.path ? "bg-white text-black" : ""}`}
              >
                {ctaItem.name}
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/80 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 rounded bg-white transition-transform duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[2px] w-5 rounded bg-white transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-[2px] w-5 rounded bg-white transition-transform duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-black lg:hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[url('/assets/design/footer-pattern.png')] bg-cover bg-center opacity-50"
              aria-hidden
            />
            <div className="relative flex min-h-full flex-col px-6 pb-10 pt-28">
              <ul className="flex flex-col gap-2">
                {[...navItems, { name: "Acasă", path: "/" }].map((item, i) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className="group flex items-center gap-4 py-2 font-cond text-[2.6rem] font-extrabold uppercase leading-none text-white"
                    >
                      <span
                        className="h-3 w-3 shrink-0 rounded-full transition-transform group-hover:scale-150"
                        style={{ background: accentByIndex[i] }}
                      />
                      <span className={pathname === item.path ? "text-ctr-yellow" : ""}>{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-10"
              >
                <Link href={ctaItem.path} className="btn-pill w-full border-2 border-white bg-white text-black">
                  {ctaItem.name}
                </Link>
                <p className="mt-6 text-center font-script text-2xl text-ctr-blue">#CuȘiDespreTineri</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
