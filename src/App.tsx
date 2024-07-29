import { useContext, useEffect } from "react";
import VideoRecorder from "./components/VideoRecorder";
import disableDevtool from "disable-devtool";
import { MyContext } from "./store/GlobalContext";

const App = () => {
  const { containerRef } = useContext(MyContext);

  useEffect(() => {
    disableDevtool();
  }, []);

  return (
    <div
      ref={containerRef}
      className="container-fluid vh-100 d-flex align-items-center justify-content-center border"
      style={{ backgroundColor: "white" }}
    >
      <VideoRecorder />
    </div>
  );
};

export default App;
