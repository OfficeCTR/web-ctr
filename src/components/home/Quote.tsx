import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { at, fs, placed, u } from "../ui/canvas";
import Reveal from "../ui/Reveal";
import { homepage } from "../../lib/site";

const photos = homepage.carouselPhotos.filter((p): p is string => !!p);

const frames = ["#5B8FFF", "#FFFFFF", "#FE558E", "#FFFFFF", "#FED653", "#FFFFFF"];

const topics = ["educație", "sănătate mintală", "piața muncii", "incluziune", "siguranță online", "participare civică"];

export const PhotoCarousel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const step = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const delta = card ? card.getBoundingClientRect().width + 16 : 220;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * delta, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => step(1), 3200);
    return () => clearInterval(id);
  }, [paused, step]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div ref={ref} className="scrollbar-hide overflow-x-auto scroll-smooth">
        <ul className="flex w-max gap-4 px-4 py-6 lg:-ml-[calc(var(--u)*140)] lg:px-0">
          {photos.map((src, i) => (
            <li
              key={src}
              className="group relative h-[170px] w-[170px] shrink-0 overflow-hidden rounded-[14px] shadow-[0_10px_24px_-10px_rgba(0,0,0,.35)] transition-transform duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-[-2deg] lg:h-[calc(var(--u)*207)] lg:w-[calc(var(--u)*207)]"
              style={{ background: frames[i % frames.length], padding: u(11) }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[6px]">
                <Image
                  src={src}
                  alt="Moment de la un eveniment CTR"
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2 flex justify-between px-4 lg:absolute lg:inset-x-0 lg:-bottom-[calc(var(--u)*30)] lg:mt-0 lg:px-[calc(var(--u)*18)]">
        <button
          type="button"
          onClick={() => step(-1)}
          className="p-2 text-3xl leading-none transition-transform hover:-translate-x-1"
          aria-label="Fotografia anterioară"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="p-2 text-3xl leading-none transition-transform hover:translate-x-1"
          aria-label="Fotografia următoare"
        >
          →
        </button>
      </div>
    </div>
  );
};

const Quote = () => (
  <section className="relative bg-white">
    <div
      className="pointer-events-none absolute left-0 top-0 w-[70%] max-w-[700px] lg:top-[calc(var(--u)*91)] lg:w-[calc(var(--u)*700)] lg:max-w-none"
      aria-hidden
    >
      <Image src="/assets/design/ctr-pattern-faded.png" alt="" width={1400} height={1350} className="h-auto w-full" />
    </div>

    <div className="relative mx-auto max-w-[1366px] px-5 pb-20 pt-10 sm:px-8 lg:h-[calc(var(--u)*699)] lg:p-0">
      <Reveal className={`text-center ${placed}`} style={at(0, 92, 1366)}>
        <h2 className="text-[1.75rem] font-bold leading-tight lg:text-[length:var(--fs)]" style={fs(42)}>
          „Nimic despre tineri fără tineri.”
        </h2>
      </Reveal>
      <Reveal
        delay={0.1}
        className={`paper-card mx-auto mt-6 max-w-[929px] px-6 py-6 text-center text-lg leading-snug lg:mt-0 lg:flex lg:h-[var(--h)] lg:flex-col lg:justify-center lg:rounded-[calc(var(--u)*30)] lg:p-0 lg:text-[length:var(--fs)] lg:leading-[1.3] ${placed}`}
        style={{ ...at(218, 164, 929, 150), ...fs(30) }}
      >
        <p>
          Tineretul este un domeniu transversal.
          <br />
          Acționăm la intersecția dintre{" "}
          {topics.map((t, i) => (
            <span key={t}>
              <strong className="text-ctr-blue">{t}</strong>
              {i < topics.length - 2 ? ", " : i === topics.length - 2 ? " și " : "."}
              {i === 1 && <br className="hidden lg:block" />}
            </span>
          ))}
        </p>
      </Reveal>

      <div className={`mt-8 lg:mt-0 lg:w-full ${placed}`} style={at(0, 386, 1366)}>
        <PhotoCarousel />
      </div>
    </div>
  </section>
);

export default Quote;
