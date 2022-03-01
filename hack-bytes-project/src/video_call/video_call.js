import "./video_call.css";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FaceTrack from "../face_track/FaceTrack";
import Metrics from "../metrics/metrics";

export default function VideoCall(data) {
  // console.log(data);

  const [id, setId] = useState("");

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true, video: true },
      function (stream) {
        stream.getTracks().forEach((x) => x.stop());
      },
      (err) => console.log(err)
    );
    if (data.definedId) {
      // console.log(data.definedId);
      setId(data.definedId);
    } else {
      setId(uuidv4());
    }
  }, []);

  return (
    <div className="fullc">
      <div className="wrapper">
        <div className="m-5">meeting code: {id}</div>
        <iframe
          src={"https://meet.jit.si/" + id}
          frameborder="0"
          width={1000}
          scrolling={false}
          allow="camera; microphone; fullscreen; display-capture"
        ></iframe>
      </div>
      <div className="fct">
        <FaceTrack data={id} />
        <Metrics data={id} />
      </div>
    </div>
  );
}
