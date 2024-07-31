import VideoStreamPreview from "./VideoStreamPreview";
import { useContext, useEffect, useRef } from "react";
import { MyContext } from "../store/GlobalContext";

const VideoRecorder = () => {
  const timerRef = useRef<HTMLParagraphElement | null>(null);

  const {
    screenStatus,
    screenBlobUrl,
    previewStream,
    startInterview,
    endInterview,
    isRecording,
    isStop,
    getTime,
  } = useContext(MyContext);

  useEffect(() => {
    let interval: number;

    if (isRecording && timerRef?.current) {
      interval = setInterval(() => {
        const [time, secs] = getTime();
        (timerRef.current as HTMLElement).textContent = `Timer:- ${time}`;

        if (secs == 30) {
          endInterview();
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
          <p className="text-capitalize fw-bolder">Status:- {screenStatus}</p>
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
              onClick={() => startInterview()}
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
              src={screenBlobUrl}
              width={"100%"}
              height={500}
              controls
              autoPlay
            />
          )}
          {previewStream && isRecording && (
            <VideoStreamPreview stream={previewStream} />
          )}

          {!isRecording && !screenBlobUrl && (
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
