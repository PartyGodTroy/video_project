import {  Sequence, useCurrentFrame, useVideoConfig, staticFile, AbsoluteFill } from "remotion";
import { z } from "zod";

export const Versus: React.FC<VersusCompositionProps> = ({
  title,
    start_frame,
  end_frame,
  A,
  B
}) => {

  const frame = useCurrentFrame();

  const { fps, width } = useVideoConfig()

  return (
      <Sequence
        name={`Versus: ${title}`}
        key={0}
        from={start_frame}
        durationInFrames={end_frame - start_frame}
      >
        <AbsoluteFill>
        <div id="debugger" className="font-[40px]">
            <div>{fps}</div>
            <div>{width}</div>
            <div>{frame}</div>
            <div>{JSON.stringify(A)}</div>
            <div>{JSON.stringify(B)}</div>

         </div>
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
    img: z.string()
  }),
  B : z.object({
    name: z.string(),
    img: z.string()
  })
});

export const versusCompositionDefaultProps: z.infer<typeof VersusSchema> = {
  start_frame: 0,
  end_frame: 360,
  title: "Versus",
  A:{ 
        name: 'Ryu',
        img: staticFile('placeholder/ryu-face.jpg')
    },
B:{ 
        name: 'Ryu',
        img: staticFile('placeholder/ryu-face.jpg')
    }
};

export type VersusCompositionProps = z.infer<typeof VersusSchema> 
