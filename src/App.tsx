import { useEffect } from "react";
import VideoRecorder from "./components/VideoRecorder";
import disableDevtool from "disable-devtool";

const App = () => {
  useEffect(() => {
    // disableDevtool();
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center border">
      <VideoRecorder />
    </div>
  );
};

export default App;
