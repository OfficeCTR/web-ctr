import type { CSSProperties } from "react";

export function outline(rings: Array<[radius: number, color: string]>, drop?: string): string {
  const shadows: string[] = [];
  for (const [r, color] of rings) {
    const steps = Math.max(16, Math.round(r * 6));
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      shadows.push(`${(Math.cos(a) * r).toFixed(2)}px ${(Math.sin(a) * r).toFixed(2)}px 0 ${color}`);
    }
  }
  if (drop) shadows.push(drop);
  return shadows.join(", ");
}

export const stickers = {
  blueStat: {
    color: "#5B8FFF",
    textShadow: outline([
      [3, "#fff"],
      [7, "#5B8FFF"],
    ]),
  } as CSSProperties,
  pinkStat: {
    color: "#FE558E",
    textShadow: outline([
      [3, "#fff"],
      [7, "#FE558E"],
    ]),
  } as CSSProperties,
  yellowStat: {
    color: "#FED653",
    textShadow: outline([
      [3, "#fff"],
      [7, "#F2C200"],
    ]),
  } as CSSProperties,
  blueLabel: { color: "#fff", textShadow: outline([[4, "#5B8FFF"]]) } as CSSProperties,
  yellowLabel: { color: "#fff", textShadow: outline([[4, "#FED653"]]) } as CSSProperties,
  blackOnWhite: { color: "#fff", textShadow: outline([[3, "#0A0A0A"]]) } as CSSProperties,
  inkLabel: { color: "#fff", textShadow: outline([[3, "#0A0A0A"]], "0 6px 10px rgba(0,0,0,.5)") } as CSSProperties,
  number: { color: "#fff", textShadow: outline([[3.5, "#0A0A0A"]], "4px 5px 0 #0A0A0A") } as CSSProperties,
  scriptWhiteOnBlue: {
    color: "#fff",
    textShadow: outline([[5, "#5B8FFF"]], "0 8px 16px rgba(0,0,0,.18)"),
  } as CSSProperties,
  scriptWhiteOnPink: {
    color: "#fff",
    textShadow: outline([[5, "#FE558E"]], "0 8px 16px rgba(0,0,0,.18)"),
  } as CSSProperties,
  scriptWhiteOnInk: {
    color: "#fff",
    textShadow: outline([[5, "#0A0A0A"]], "0 8px 16px rgba(0,0,0,.18)"),
  } as CSSProperties,
  scriptWhiteOnYellow: {
    color: "#fff",
    textShadow: outline([[5, "#F2C200"]], "0 8px 16px rgba(0,0,0,.18)"),
  } as CSSProperties,
};
