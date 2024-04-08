import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Controllers/TokenFuncitons";
import { socket } from "../Socket";

export default function MainPage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [joinRoomCode, setJoinRoomCode] = useState("");

  function generateRoomCode() {
    const alphanumeric =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += alphanumeric.charAt(
        Math.floor(Math.random() * alphanumeric.length),
      );
    }
    return code;
  }

  function createRoom() {
    const generatedCode = generateRoomCode();
    setRoomCode(generatedCode);
    setShowPopup(true);
    socket.connect();
    socket.on("connect", () => {
      socket.emit("create-room", generatedCode);
    });
    console.log("createRoom");
  }

  function joinRoom() {
    if (/^[a-zA-Z0-9]{8}$/.test(joinRoomCode)) {
      socket.connect();
      socket.emit("join-room", joinRoomCode);
    } else {
      // If input is invalid, show an alert
      alert("Please enter a valid 8-digit alphanumeric code.");
    }
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
    }
  }, [navigate]);

  function copyRoomCode() {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied to clipboard!");
  }

  function closePopup() {
    setShowPopup(false);
  }

  return (
    <div className="Main-Page">
      <button onClick={createRoom}>Create room</button>
      <div className="Join-room">
        <input
          type="text"
          value={joinRoomCode}
          placeholder="Enter room code"
          onChange={(e) => setJoinRoomCode(e.target.value)}
        />
        <button onClick={joinRoom}>Join room</button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>Room Created!</h2>
            <p className="room-code">Room Code: {roomCode}</p>
            <button onClick={copyRoomCode}>Copy room code</button>
            <button onClick={() => navigate(`/room/${roomCode}`)}>
              Proceed to room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
