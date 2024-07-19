import { useReactMediaRecorder } from "react-media-recorder";
import VideoStreamPreview from "./VideoStreamPreview";
import { useState } from "react";

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isStop, setIsStop] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [timer, setTimer] = useState<TimeRanges>();

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    pauseRecording,
  } = useReactMediaRecorder({ video: true, askPermissionOnMount: true });

  const handleStartBtnClick = () => {
    setIsRecording(true);
    setIsPause(false);
    setIsStop(false);

    startRecording();
  };

  const handleStopBtnClick = () => {
    setIsStop(true);
    setIsRecording(false);
    setIsPause(false);

    stopRecording();
  };

  const handlePauseBtnClick = () => {
    setIsPause(true);
    setIsStop(false);

    isPause ? startRecording() : pauseRecording();
  };

  return (
    <div className="container border p-3">
      <div className="row">
        <div className="col-4">
          <p className="text-capitalize fw-bolder">Status:- {status}</p>
        </div>
        <div className="col-3">
          <p className="text-capitalize fw-bolder text-center">
            Timer:- 00:00:00
          </p>
        </div>
        <div className="col-5 d-flex align-items-center justify-content-end gap-3">
          {!isRecording && (
            <button
              className="btn btn-primary btn-sm fw-bold"
              type="button"
              onClick={handleStartBtnClick}
            >
              Start Recording
            </button>
          )}
          {isRecording && (
            <button
              className="btn btn-secondary btn-sm fw-bold"
              type="button"
              onClick={handlePauseBtnClick}
            >
              {isPause ? "Continue" : "Pause"} Recording
            </button>
          )}
          {isRecording && (
            <button
              className="btn btn-danger btn-sm fw-bold"
              type="button"
              onClick={handleStopBtnClick}
            >
              Stop Recording
            </button>
          )}
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
