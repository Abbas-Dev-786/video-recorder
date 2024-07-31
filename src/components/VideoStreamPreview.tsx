import { memo, useEffect, useRef } from "react";

interface VideoStreamPreviewProps {
  stream: MediaStream | null;
}

const VideoStreamPreview = memo(function VideoStreamPreview({
  stream,
}: VideoStreamPreviewProps) {
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
    <div
      style={{
        position: "absolute",
        bottom: "-1%",
        right: "0%",
      }}
    >
      <video ref={videoRef} width={"100%"} height={175} autoPlay />
    </div>
  );
});

export default VideoStreamPreview;
