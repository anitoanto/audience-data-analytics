import "./FaceTrack.css";
import { useRef, useEffect } from "react";

export default function FaceTrack(data) {
  // console.log(data)
  return (
    <div>
      <iframe
        src={"https://ada-makeaton-tracking.web.app?mid=" + data.data}
        frameborder="0"
        width={500}
        height={350}
        allow="camera; microphone; fullscreen; display-capture"
      ></iframe>
    </div>
  );
}
