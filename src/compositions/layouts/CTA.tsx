import {  interpolate, Sequence, useCurrentFrame, useVideoConfig, Img } from "remotion";
import { z } from "zod";

export const CTA: React.FC<CTACompositionProps> = ({
  title,
  start_frame,
  end_frame,
  content,
  img
}) => {

  const frame = useCurrentFrame();

  const { fps, width } = useVideoConfig()

  const titleOpacity = interpolate(frame, [start_frame, start_frame + (0.5 * fps)], [0, 1], {
     extrapolateRight: "clamp",
  });

 const titleSlideIn = interpolate(frame, [start_frame, start_frame + (0.5 * fps)], [-50, 0], {
     extrapolateRight: "clamp",
  });


  const contentOpacity = interpolate(frame, [start_frame + 0.2 * fps, start_frame + (0.5 * fps)], [0, 1], {
     extrapolateRight: "clamp",
  });

 const contentSlideIn = interpolate(frame, [start_frame, start_frame + (0.5 * fps)], [50, 0], {
     extrapolateRight: "clamp",
  });


  const imageSlideIn = interpolate(frame, [start_frame, start_frame + (0.5 * fps)], [width/-2, 0], {
     extrapolateRight: "clamp",
  });

  const imageRoll = interpolate(frame, [start_frame, start_frame + (0.5 * fps)], [-360, 0], {
     extrapolateRight: "clamp",
  });
  
  


  return (
      <Sequence
        name={`CTA: ${title}`}
        key={0}
        from={start_frame}
        durationInFrames={end_frame - start_frame}
      >
        <div className="p-8 grid-bg h-full" style={{width}}>
          {/* Start */}

          <div className="flex gap-12 items-center h-full">

            <div>
              {img && 
                <Img
                  src={img}
                  width={width / 2}
                  height={width / 2}
                  style={{
                    transform: `translateX(${imageSlideIn}px) rotate(${imageRoll}deg)`,
                  }}
                  className="rounded-full origin-center relative"
                  alt="CTA Background"
                />} 
            </div>

            <div  className="flex flex-col items-center justify-center h-full ">
              <h2 className="relative text-white" style={{opacity: titleOpacity, top:titleSlideIn, fontSize: 100, fontWeight:'bold' }}>{title}</h2>
              <div style={{opacity:contentOpacity, top:contentSlideIn , fontSize:70}} className="relative bg-gray-100 p-10 rounded-lg shadow-md">
                <p>{content}</p>
              </div>
            </div>

          </div>

          {/* end */}
        </div>
      </Sequence>
  );
};

export const CTASchema = z.object({
  start_frame: z.number().int(),
  end_frame: z.number().int(),
  title: z.string().min(1, "Title is required"),
  img: z.string().optional(),
  content: z.string().optional(),
});

export const ctaCompositionDefaultProps: z.infer<typeof CTASchema> = {
  start_frame: 0,
  end_frame: 60,
  title: "Call to Action",
  img: undefined,
  content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export type CTACompositionProps = z.infer<typeof CTASchema> 
