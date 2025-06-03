import {  Sequence, useCurrentFrame, useVideoConfig, spring, Img, staticFile, interpolate, AbsoluteFill } from "remotion";
import { z } from "zod";

export const OutroCard: React.FC<OutroCardCompositionProps> = ({
  start_frame,
  end_frame,
}) => {

 // const frame = useCurrentFrame();


 const frame = useCurrentFrame();

  const { fps, width, height } = useVideoConfig()

  const titleScale = spring({frame,fps,
    config: {
        stiffness: 100,
    },
    durationInFrames: 40,
    });

    const socialSlideIn = [
        interpolate(frame, [start_frame + fps * 0.2, 90], [height / 2, 0], {extrapolateRight: "clamp"}),
        interpolate(frame, [start_frame + fps * 0.4, 90], [height / 2, 0], {extrapolateRight: "clamp"}),
        interpolate(frame, [start_frame + fps * 0.6, 90], [height / 2, 0], {extrapolateRight: "clamp"}),
        interpolate(frame, [start_frame + fps * 0.8, 90], [height / 2, 0], {extrapolateRight: "clamp"}),
        interpolate(frame, [start_frame + fps * 0.9, 90], [height / 2, 0], {extrapolateRight: "clamp"}),
        interpolate(frame, [start_frame + fps * 1, 90], [height / 2, 0], {extrapolateRight: "clamp"}),

    ]


  return (
      <Sequence
        name={`Title Card`}
        key={0}
        from={start_frame}
        durationInFrames={end_frame - start_frame}
      >
        <AbsoluteFill className="bg-black" style={{width, height}}>
            <Img
              src={staticFile("bg/background_1.png")}
              className="absolute inset-0 object-cover"
              style={{width, height}} />
        </AbsoluteFill>
        <div className="p-8 grid-bg h-full flex flex-col justify-center" style={{width}}>
            <div className="flex items-center justify-center">
                <Img src={staticFile("title_logo.png")} className="text-white" style={{scale:titleScale, fontSize: width / 20}} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-[100px]">
                <div className="bg-white flex  items-center gap-1.5 p-10 rounded-4xl border-[10px] border-orange-400 text-[rgb(255,142,0)] text-4xl relative" style={{transform: `translateY(${socialSlideIn[0]}px)`}}>
                    <Img src={staticFile("icon/youtube.png")} width={40}  />
                    <h2 className="font-bold" style={{fontSize: 30}}>@PartyGodTroy</h2>
                </div>
                <div className="bg-white flex items-center gap-1.5 p-10 rounded-4xl border-[10px] border-orange-400 text-[rgb(255,142,0)] text-4xl relative" style={{transform: `translateY(${socialSlideIn[1]}px)`}}>
                    <Img src={staticFile("icon/tiktok.png")} width={40}  />
                    <h2 className="font-bold" style={{fontSize: 30}}>@PartyGodTroy</h2>
                </div>
                <div className="bg-white flex items-center gap-1.5 p-10 rounded-4xl border-[10px] border-orange-400 text-[rgb(255,142,0)] text-4xl relative" style={{transform: `translateY(${socialSlideIn[2]}px)`}}>
                    <Img src={staticFile("icon/discord.png")} width={40}  />
                    <h2 className="font-bold" style={{fontSize: 30}}>@PartyGodTroy</h2>
                </div>
                  <div className="bg-white flex items-center gap-1.5 p-10 rounded-4xl border-[10px] border-orange-400 text-[rgb(255,142,0)] text-4xl relative" style={{transform: `translateY(${socialSlideIn[3]}px)`}}>
                    <Img src={staticFile("icon/bluesky.png")} width={40}  />
                    <h2 className="font-bold" style={{fontSize: 30}}>@PartyGodTroy</h2>
                </div>
            </div>
        </div>
      </Sequence>
  );
};

export const OutroCardSchema = z.object({
  start_frame: z.number().int(),
  end_frame: z.number().int(),
});

export const outroCardCompositionDefaultProps: z.infer<typeof OutroCardSchema> = {
  start_frame: 0,
  end_frame: 600,
};

export type OutroCardCompositionProps = z.infer<typeof OutroCardSchema> 
