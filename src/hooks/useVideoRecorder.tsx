import moment from "moment";
import { useState } from "react";

const useVideoRecorder = ({
  startRecording,
  stopRecording,
  pauseRecording,
}: any) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isStop, setIsStop] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);

  const startVideoRecording = () => {
    setIsRecording(true);
    setIsPause(false);
    setIsStop(false);

    startRecording();

    const startTime = new Date();
    sessionStorage.setItem("startTime", startTime.toISOString());
  };

  const endVideoRecording = () => {
    setIsStop(true);
    setIsRecording(false);
    setIsPause(false);

    stopRecording();
  };

  const pauseVideoRecording = () => {
    setIsPause(true);
    setIsStop(false);

    isPause ? startRecording() : pauseRecording();
  };

  const getTime = () => {
    const startTime = moment(
      new Date(sessionStorage.getItem("startTime") || "")
    ).format("YYYY-MM-DDTHH:mm:ss");
    const current = moment();

    const hours = current.diff(startTime, "hours") % 12;
    const mins = current.diff(startTime, "minutes") % 60;
    const secs = current.diff(startTime, "seconds") % 60;

    return [
      `${String(hours).padStart(2, "0")}:${String(mins).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`,
      secs,
    ];
  };

  return {
    isRecording,
    isPause,
    isStop,
    startVideoRecording,
    endVideoRecording,
    pauseVideoRecording,
    getTime,
  };
};

export default useVideoRecorder;
