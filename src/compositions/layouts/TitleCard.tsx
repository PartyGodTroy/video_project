import {  Sequence, useVideoConfig } from "remotion";
import { z } from "zod";

export const TitleCard: React.FC<TitleCardCompositionProps> = ({
  title,
  start_frame,
  end_frame,
}) => {

 // const frame = useCurrentFrame();

  const { width } = useVideoConfig()

  return (
      <Sequence
        name={`CTA: ${title}`}
        key={0}
        from={start_frame}
        durationInFrames={end_frame - start_frame}
      >
        <div className="p-8 grid-bg h-full" style={{width}}>
      
        </div>
      </Sequence>
  );
};

export const TitleCardSchema = z.object({
  start_frame: z.number().int(),
  end_frame: z.number().int(),
  title: z.string().min(1, "Title is required"),
  img: z.string().optional(),
});

export const titleCardCompositionDefaultProps: z.infer<typeof TitleCardSchema> = {
  start_frame: 0,
  end_frame: 60,
  title: "Call to Action",
  img: undefined,
};

export type TitleCardCompositionProps = z.infer<typeof TitleCardSchema> 
