import "./home.css";

import { useParams, useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  function handleCreate() {
    navigate("/video_call");
  }

  function handleJoin() {
    navigate("/join");
  }

  return (
    <div className="home-container">
      <div className="title">
        ADA (Audience Data Analytics) [ Team Hack Bytes ]
      </div>
      <div>
        <button className="button mr-2 is-large" onClick={handleCreate}>
          create a meeting
        </button>
        <button className="button ml-2 is-large" onClick={handleJoin}>
          join a meeting
        </button>
      </div>
    </div>
  );
}
