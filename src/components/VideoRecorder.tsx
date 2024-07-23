import { useReactMediaRecorder } from "react-media-recorder";
import VideoStreamPreview from "./VideoStreamPreview";
import useVideoRecorder from "../hooks/useVideoRecorder";
import { useEffect, useRef } from "react";

const VideoRecorder = () => {
  const timerRef = useRef<HTMLParagraphElement | null>(null);

  const {
    status,
    mediaBlobUrl,
    previewStream,
    startRecording,
    stopRecording,
    pauseRecording,
  } = useReactMediaRecorder({
    video: true,
    askPermissionOnMount: true,
  });

  const {
    startVideoRecording,
    endVideoRecording,
    pauseVideoRecording,
    isPause,
    isRecording,
    isStop,
    getTime,
  } = useVideoRecorder({ startRecording, stopRecording, pauseRecording });

  useEffect(() => {
    let interval: number;

    if (isRecording && timerRef?.current) {
      interval = setInterval(() => {
        const [time, secs] = getTime();
        (timerRef.current as HTMLElement).textContent = `Timer:- ${time}`;

        if (secs == 30) {
          endVideoRecording();
          sessionStorage.removeItem("startTime");
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval); // Clean up on component unmount
  }, [timerRef, isRecording]);

  return (
    <div className="container border p-3">
      <div className="row">
        <div className="col-4">
          <p className="text-capitalize fw-bolder">Status:- {status}</p>
        </div>
        <div className="col-3">
          <p
            className="text-capitalize fw-bolder text-center"
            ref={timerRef}
          ></p>
        </div>
        <div className="col-5 d-flex align-items-center justify-content-end gap-3">
          {!isRecording && (
            <button
              className="btn btn-primary btn-sm fw-bold"
              type="button"
              onClick={() => startVideoRecording()}
            >
              Start Recording
            </button>
          )}
          {/* {isRecording && (
            <button
              className="btn btn-secondary btn-sm fw-bold"
              type="button"
              onClick={() => pauseVideoRecording()}
            >
              {isPause ? "Continue" : "Pause"} Recording
            </button>
          )}
          {isRecording && (
            <button
              className="btn btn-danger btn-sm fw-bold"
              type="button"
              onClick={() => endVideoRecording()}
            >
              Stop Recording
            </button>
          )} */}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 d-flex align-items-center justify-content-center">
          {isStop && (
            <video
              src={mediaBlobUrl}
              width={"100%"}
              height={500}
              controls
              autoPlay
            />
          )}
          {previewStream && isRecording && (
            <VideoStreamPreview stream={previewStream} />
          )}

          {!isRecording && !mediaBlobUrl && (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "50%", width: "100%", background: "#ccc" }}
            >
              <h3 className="text-center text-capitalize">
                Start video recording
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;
