import { useEffect, useRef } from "react";

const VideoStreamPreview = ({ stream }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return (
    <div>
      <video ref={videoRef} width={"100%"} height={500} autoPlay />
    </div>
  );
};

export default VideoStreamPreview;
