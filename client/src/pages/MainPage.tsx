import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Controllers/TokenFuncitons";
import { socket } from "../Socket";

export default function MainPage() {
  const navigate = useNavigate();
  function createRoom() {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("create-room", "some rooom code");
    });
    console.log("createRoom");
  }
  function joinRoom() {
    socket.connect();
    socket.emit("join-room", "some existing rooom code");
  }
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <div>
      <button onClick={createRoom}>Create room</button>
      <button onClick={joinRoom}>Join room</button>
    </div>
  );
}
