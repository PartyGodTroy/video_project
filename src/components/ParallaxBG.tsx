
import { Img, staticFile } from "remotion";

export interface ParallaxBGProps {
  end_frame: number;
  frame: number;
  img_path: string;
  className:string;
  direction: 'l' | 'r'

}

const ParallaxBG: React.FC<ParallaxBGProps> = (props: ParallaxBGProps) => {
  const aSideFrames: number[] = [];
  for (let abgFrames = 0; abgFrames < props.end_frame / 4; abgFrames++) {
    aSideFrames.push(abgFrames);
  }

  const bgStyle = props.direction == 'l'
    ? { left: `${props.frame * 20 - 20000}px` }
    : { right: `${props.frame * 20}px` }


  return (
    <div className="flex h-full">
      {aSideFrames.map(() => {
        return (
          <Img
            style={bgStyle}
            className={`h-full relative ${props.className}`}
            src={staticFile(props.img_path)}
          />
        );
      })}
    </div>
  );
};

export default ParallaxBG;
