import "../App.css";
import Navbar from "../components/Navbar";
import ToolArray from "../components/ToolArray";

function Whiteboard() {
  return (
    <div>
      <Navbar authenticated={false} />
      <div id="Main">
        <ToolArray />
        <canvas id="Main-canvas" />
      </div>
    </div>
  );
}

export default Whiteboard;
