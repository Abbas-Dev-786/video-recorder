import { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const useVideoRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isStop, setIsStop] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timer, setTimerId] = useState<number | null>(null);

  const { startRecording, stopRecording, pauseRecording } =
    useReactMediaRecorder({ video: true, askPermissionOnMount: true });

  const startVideoRecording = () => {
    setIsRecording(true);
    setIsPause(false);
    setIsStop(false);

    startRecording();

    if (!isPause) {
      const startTime = Date.now() - elapsedTime;
      const id: any = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      setTimerId(id);
    } else if (isPause) {
      const startTime = Date.now() - elapsedTime;
      const id: any = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      setTimerId(id);
    }
  };

  const endVideoRecording = () => {
    setIsStop(true);
    setIsRecording(false);
    setIsPause(false);

    stopRecording();

    if (isStop && timer) {
      clearInterval(timer);
      setTimerId(null);
    }
  };

  const pauseVideoRecording = () => {
    setIsPause(true);
    setIsStop(false);

    isPause ? startRecording() : pauseRecording();

    if (isPause && timer) {
      clearInterval(timer);
      setTimerId(null);
    }
  };

  const getTime = () => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

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
