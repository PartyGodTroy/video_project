import {
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  AbsoluteFill,
  Img,
} from "remotion";
import {  z } from "zod";
import ParallaxBG from "../../components/ParallaxBG";


import {loadFont} from "@remotion/fonts"


const fontFamily = "Fighting";
 
loadFont({
  family: fontFamily,
  url: staticFile("Fighting Spirit 2 bold.otf"),
  weight: "500",
}).then(() => {
  console.log("Font loaded!");
});


export const Versus: React.FC<VersusCompositionProps> = ({
  title,
  start_frame,
  end_frame,
  A,
  B,
}) => {
  const frame = useCurrentFrame();

  const { width, height } = useVideoConfig();

  const gridcols = height >= width ? 1 : 2;
  const gridrows = height >= width ? 2 : 1;


  

  return (
    <Sequence
      name={`Versus: ${title}`}
      key={0}
      from={start_frame}
      durationInFrames={end_frame - start_frame}
    >
    <AbsoluteFill>
      <div
        className={`grid w-full h-full`}
        style={{
          gridTemplateColumns: `repeat(${gridcols}, 1fr)`,
          gridTemplateRows: `repeat(${gridrows}, 1fr)`,
        }}
      >
        <div className="bg-blue-400 relative z-20 overflow-hidden">
             <AbsoluteFill>
               <ParallaxBG className="opacity-20" direction="l"  frame={frame} end_frame={end_frame} img_path={'noise/anisotropic_noise.png'} />
            </AbsoluteFill>
            <div className="relative z-40" style={{top:`${width *0.07}px`}}>
              <VersusOpponent {...A} flip_img={true} width={width} flip_name={false} />
            </div>
        </div>
        <div className="bg-red-400 relative overflow-hidden">
             <AbsoluteFill>
               <ParallaxBG className="opacity-20" direction="r" frame={frame} end_frame={end_frame} img_path={'noise/anisotropic_noise.png'} />
            </AbsoluteFill>
            <div className="relative h-full z-40">
              <VersusOpponent {...B} flip_img={false} width={width} flip_name={true} />
            </div>
        </div>
      </div>
    </AbsoluteFill>

      <AbsoluteFill className="flex justify-center z-50">
          <Img
            className="relative"
            style={{left: width / 2 - 317 / 2}}
            src={staticFile("versus/versus-divider.png")}
            width={317}
            height={height}

          />
      </AbsoluteFill>

         <AbsoluteFill className="flex justify-center z-50">
          <Img
            className="relative"
            style={{left: width / 2 - 317 / 2}}
            src={staticFile("versus/versus-logo.png")}
            width={317}
            height={height}
          />
      </AbsoluteFill>

    </Sequence>
  );
};

export const VersusSchema = z.object({
  title: z.string(),
  start_frame: z.number().int(),
  end_frame: z.number().int(),
  A: z.object({
    name: z.string(),
    img: z.string(),
    flip_img: z.boolean().optional()
  }),
  B: z.object({
    name: z.string(),
    img: z.string(),
    flip_img: z.boolean().optional()

  }),
});

export const versusCompositionDefaultProps: z.infer<typeof VersusSchema> = {
  start_frame: 0,
  end_frame: 360,
  title: "Versus",
  A: {
    name: "Ryu",
    img: staticFile("placeholder/ryu-face.jpg"),
  },
  B: {
    name: "Ryu",
    img: staticFile("placeholder/ryu-face.jpg"),
  },
};

export type VersusCompositionProps = z.infer<typeof VersusSchema>;
type VersusOpponent = typeof versusCompositionDefaultProps.A & {
    flip_name:boolean;
    width:number
}

const VersusOpponent = (props:VersusOpponent) =>{


    const gridTemplateRows = props.flip_name
        ? `1fr 9fr`
        : `9fr 1fr`

    const topBoxOrder = props.flip_name
        ? '2'
        : '1'

    const botBoxOrder = props.flip_name
        ? '1'
        : '2'


    return (
        <div className="flex h-full relative">
          
            <div className="grid w-full h-full max-h-96 px-[140px]"  style={{gridTemplateRows}}>
                <div className=" w-full h-full" style={{order:topBoxOrder}}>
                   <Img src={props.img} className="w-full" style={{scale: `${props.flip_img ? -1 : 1} 1`}} />
                </div>
                <div className=" w-full h-full  flex justify-center items-center" style={{order:botBoxOrder}} id="a_name">
                    <h2 className="font-bold font-serif" style={{fontSize:`${props.width * .05}px`, fontFamily:'Fighting'}}>
                         {props.name}
                    </h2> 
                </div>
            </div>
        </div>
    )
}

