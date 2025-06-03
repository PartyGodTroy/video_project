import { noise2D } from "@remotion/noise";
export function basicShake(
  frame: number,
  str_x: number,
  str_y: number,
  start: number,
  end: number,
  seed ="hello-world",
) {
  const n = noise2D(seed, str_x, str_y);
  return n
}
