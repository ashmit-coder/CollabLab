import "../App.css";
import Navbar from "../components/Navbar";
import ToolArray from "../components/ToolArray";
import { isAuthenticated } from "../Controllers/TokenFuncitons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Whiteboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <div>
      <Navbar authenticated={isAuthenticated()} />
      <div id="Main">
        <ToolArray />
        <canvas id="Main-canvas" />
      </div>
    </div>
  );
}

export default Whiteboard;
