import type { CSSProperties } from "react";

export const u = (n: number) => `calc(var(--u) * ${n})`;

export const at = (x: number, y: number, w?: number, h?: number, extra?: CSSProperties): CSSProperties =>
  ({
    "--l": u(x),
    "--t": u(y),
    ...(w !== undefined ? { "--w": u(w) } : {}),
    ...(h !== undefined ? { "--h": u(h) } : {}),
    ...extra,
  }) as CSSProperties;

export const fs = (n: number, extra?: CSSProperties): CSSProperties => ({ "--fs": u(n), ...extra }) as CSSProperties;

export const placed = "lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]";
