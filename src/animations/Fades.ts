import { interpolate } from "remotion";

export function basicFadeIn (frame:number, start:number, end:number){
    return interpolate(frame, [start, end], [0, 1], {
     extrapolateRight: "clamp",
  });
}

export function basicFadeOut (frame:number, start:number, end:number){
    return interpolate(frame, [start, end], [1, 0], {
     extrapolateRight: "clamp",
  });
}