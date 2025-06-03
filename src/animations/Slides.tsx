import { interpolate } from "remotion";

/**
 * Position should be 'relative'
 * @param frame 
 * @param start 
 * @param end 
 * @param height 
 * @returns 
 */
export function slideInFromTop(frame: number, start: number, end: number, height:number) {
  return interpolate(frame, [start, end], [height * -2, 0], {
    extrapolateRight: "clamp",
  });
}


export interface SlideInVertical extends React.PropsWithChildren {
  frame:number,
  start:number,
  end:number,
  height:number
}
export function SlideInFromTop( props: SlideInVertical){
  const top = slideInFromTop(props.frame, props.start, props.end, props.height)
  return <div className="relative" style={{top}}>
    {props.children}
  </div>
}



export function slideInFromBottom(frame: number, start: number, end: number, height:number) {
  return interpolate(frame, [start, end], [height * 2, 0], {
    extrapolateRight: "clamp",
  });
}

export function SlideInFromBottom( props: SlideInVertical){
  const top = slideInFromBottom(props.frame, props.start, props.end, props.height)
  return <div className="relative" style={{top}}>
    {props.children}
  </div>
}