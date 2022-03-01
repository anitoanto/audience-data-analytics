import { useRef, useState } from "react";
import VideoCall from "../video_call/video_call";

export default function Join() {
  const roomName = useRef();
  const [name, setName] = useState("");
  const [enterState, setEnterState] = useState(true);

  function handleJoin() {
    const room = roomName.current.value;
    setName(room);
    setEnterState(false);
  }
  return (
    <div>
      {enterState ? (
        <div className="container pt-5 mt-5">
          <input
            placeholder="Enter your code"
            className="input"
            ref={roomName}
          />
          <button className="button is-large mt-5" onClick={handleJoin}>
            Join
          </button>
        </div>
      ) : (
        <VideoCall definedId={name} />
      )}
    </div>
  );
}
