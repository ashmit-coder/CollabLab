import { useEffect, useRef } from "react";
import "../App.css";
import { fabric } from "fabric";
import {
  addCircle,
  addRect,
  addText,
  addTriangle,
  changeBrushColor,
  changeBrushSize,
  deleteAll,
  deleteSelection,
  drawingMode,
  exportSVG,
} from "../Controllers/WhiteBoardFunctions";
import { socket } from "../Socket";

// https://alexsidorenko.com/blog/react-list-rerender/

export default function ToolArray() {
  const editor = useRef(new fabric.Canvas("Main-canvas"));
  const mode = useRef(false);


  // socket.on("changes-to-whiteboard",(svg:string)=>{

  //   fabric.loadSVGFromString(svg,(obj)=>{
  //       obj.map(shape=> editor.current.add(shape))
  //     });

  //  })

  useEffect(() => {
    socket.connect();
    editor.current = new fabric.Canvas("Main-canvas", {
      height: 650,
      width: 1250,
    });

    editor.current.on("object:added", (data:any) => {
      socket.emit("object:added", data);
    });

    socket.on("object:added", (data: fabric.IEvent<MouseEvent>) => {
      console.log(data.target);
      editor.current.off("object:added");
      if (data.target) {
        if (data.target.type === "rect") {
          editor.current.add(new fabric.Rect(data.target));
        }
        if (data.target.type === "circle") {
          editor.current.add(new fabric.Circle(data.target));
        }
        if (data.target.type === "triangle") {
          editor.current.add(new fabric.Triangle(data.target));
        }
        if (data.target.type === "textbox") {
          editor.current.add(new fabric.Textbox(((data.target as fabric.Textbox).text)as string,{...data.target}));
        }
      }
      editor.current.on("object:added", (data:any) => {
        socket.emit("object:added", data);
      })
    }
    );
  }, []);

  return (
    <div className="ToolArray">
      <button onClick={(_e: never) => addRect({ editor })}>
        <img src="/check-box.png" width={30} />
      </button>

      <button onClick={(_e: never) => addCircle({ editor })}>
        <img src="/circle.png" width={30} />
      </button>

      <button onClick={(_e: never) => addTriangle({ editor })}>
        <img src="/triangle.png" width={30} />
      </button>

      <button onClick={(_e: never) => addText({ editor })}>
        <img src="/text-box.png" width={30} />
      </button>

      <button onClick={(_e: never) => deleteSelection({ editor })}>
        <img src="/trash-bin.png" width={30} />
      </button>

      <button onClick={(_e: never) => deleteAll({ editor })}>
        <img src="/clean.png" width={30} />
      </button>

      <button onClick={(_e: never) => drawingMode(editor, mode)}>
        <img src="/pen.png" width={30} />
      </button>

      <input
        type="color"
        name="Brush-color"
        id="Brush-color"
        onChange={(_e: never) => changeBrushColor(editor, mode)}
      />

      <input
        type="range"
        name="Brush-size"
        id="Brush-size"
        color="black"
        onChange={(_e: never) => changeBrushSize(editor, mode)}
      />
      <button onClick={(_e: never) => exportSVG(editor)}>Broad_Cast</button>
    </div>
  );
}
