import "../App.css";
import ToolArray from "../components/ToolArray";
   

function Whiteboard() {
    return (
        <div id="Main">
            <ToolArray />
            <canvas id="Main-canvas" />
        </div>
    );
}

export default Whiteboard;
