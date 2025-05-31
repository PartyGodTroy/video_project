import "./index.css";
import { Composition, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./compositions/CaptionedVideo";
import { CTA, ctaCompositionDefaultProps, CTASchema } from "./compositions/layouts/CTA";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return <>
    <Composition
      id="CaptionedVideo"
      component={CaptionedVideo}
      calculateMetadata={calculateCaptionedVideoMetadata}
      schema={captionedVideoSchema}
      height={1080}
      width={1920}
      defaultProps={{
        src: staticFile("sample-video.mp4"),
      }}
    />
    <Composition
      id="CTA"
      component={CTA}
      fps={60}
      durationInFrames={100}
      schema={CTASchema}
      height={1080}
      width={1920}
      defaultProps={{
        title: ctaCompositionDefaultProps.title,
        start_frame: ctaCompositionDefaultProps.start_frame,
        end_frame: ctaCompositionDefaultProps.end_frame,
        img: staticFile("placeholder/ryu-face.jpg"),
        content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      }}
    />
  </>
};
