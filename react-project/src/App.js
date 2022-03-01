import "./App.css";
import VideoCall from "./video_call/video_call";
import Home from "./home/home";
import "bulma/css/bulma.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./join/join";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="video_call" element={<VideoCall />} />
        <Route path="join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
