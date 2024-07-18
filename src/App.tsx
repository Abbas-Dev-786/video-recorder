import VideoRecorder from "./components/VideoRecorder";
// import VideoStreamPreview from "./components/VideoStreamPreview";

const App = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center border">
      <VideoRecorder />
      {/* <VideoStreamPreview /> */}
    </div>
  );
};

export default App;
