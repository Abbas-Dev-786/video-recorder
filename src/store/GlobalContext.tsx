import moment from "moment";
import { createContext, PropsWithChildren, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

interface MyContextType {
  status: string;
  mediaBlobUrl: string | undefined;
  previewStream: MediaStream | null;
  screenStatus: string;
  screenBlobUrl: string | undefined;
  screenPreviewStream: MediaStream | null;
  startInterview: () => void;
  endInterview: () => void;
  getTime: () => (string | number)[];
  isRecording: boolean;
  isStop: boolean;
}

export const MyContext = createContext<MyContextType>({
  status: "",
  mediaBlobUrl: "",
  previewStream: null,
  screenStatus: "",
  screenBlobUrl: "",
  screenPreviewStream: null,
  startInterview: () => {},
  endInterview: () => {},
  getTime: () => ["", 0],
  isRecording: false,
  isStop: false,
});

const GlobalContext = ({ children }: PropsWithChildren) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isStop, setIsStop] = useState<boolean>(false);

  const {
    status: screenStatus,
    mediaBlobUrl: screenBlobUrl,
    previewStream: screenPreviewStream,
    startRecording: startScreenRecording,
    stopRecording: stopScreenRecording,
  } = useReactMediaRecorder({
    screen: true,
    askPermissionOnMount: true,
    onStop: endInterview,
  });

  const { status, mediaBlobUrl, previewStream, startRecording, stopRecording } =
    useReactMediaRecorder({
      video: true,
      askPermissionOnMount: true,
    });

  const startInterview = () => {
    setIsRecording(true);
    setIsStop(false);

    startScreenRecording();
    startRecording();

    const startTime = new Date();
    sessionStorage.setItem("startTime", startTime.toISOString());
  };

  function endInterview() {
    setIsStop(true);
    setIsRecording(false);

    stopRecording();
    stopScreenRecording();
  }

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

  return (
    <MyContext.Provider
      value={{
        status,
        mediaBlobUrl,
        previewStream,
        screenStatus,
        screenBlobUrl,
        screenPreviewStream,
        isRecording,
        isStop,
        startInterview,
        endInterview,
        getTime,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default GlobalContext;
