import { useEffect, useRef, useState } from "react";
import "../App.css";
import { fabric } from "fabric";

// https://alexsidorenko.com/blog/react-list-rerender/

export default function ToolArray() {
  // let editor = new fabric.Canvas("Main-canvas");
  const [editor, setEditor] = useState(new fabric.Canvas("Main-canvas"));
  // let msg = useRef("Drawing Mode");
  const [msg, setMsg] = useState("Drawing Mode");
  let mode = useRef(false);

  useEffect(() => {
    // editor = new fabric.Canvas("Main-canvas", {
    //     height: 3000,
    //     width: 3000,

    // })

    setEditor(
      new fabric.Canvas("Main-canvas", {
        height: 3000,
        width: 3000,
      }),
    );
  }, []);

  function addRect() {
    var rect = new fabric.Rect({
      stroke: "black",
      strokeWidth: 2,
      width: 100,
      height: 100,
      fill: "white",
      selectable: true,
    });

    editor.add(rect);
    setEditor(editor);
  }

  function addCircle() {
    var cir = new fabric.Circle({
      stroke: "black",
      strokeWidth: 2,
      radius: 100,
      fill: "white",
    });

    editor.add(cir);
    setEditor(editor);
  }

  function addTriangle() {
    var triangle = new fabric.Triangle({
      stroke: "black",
      strokeWidth: 2,
      fill: "white",
      width: 100,
      height: 100,
    });

    editor.add(triangle);
    setEditor(editor);
  }

  function addText() {
    var text = new fabric.Textbox("TEXT");
    editor.add(text);
    setEditor(editor);
  }

  function deleteSelection() {
    let lst = editor.getActiveObjects();

    lst.forEach((element) => {
      editor.remove(element);
    });
    setEditor(editor);
  }

  function deleteAll() {
    editor.getObjects().forEach((element) => {
      editor.remove(element);
    });
    setEditor(editor);
  }

  function drawingMode() {
    if (!mode.current) {
      mode.current = true;
      setEditor(editor);
      editor.isDrawingMode = mode.current;
      // msg.current = "Exit drawing mode";
      setEditor(editor);
      setMsg("Exit drawing mode");
    } else {
      mode.current = false;
      setEditor(editor);
      editor.isDrawingMode = mode.current;
      // msg.current = "Drawing Mode";
      setEditor(editor);
      setMsg("Drawing Mode");
    }
  }

  function changeBrushColor() {
    let color = (document.getElementById("Brush-color") as HTMLInputElement)
      .value;
    if (color && mode.current) {
      editor.freeDrawingBrush.color = color;
    }
  }

  function changeBrushSize() {
    let size = (document.getElementById("Brush-size") as HTMLInputElement)
      .value;

    if (size && mode.current) {
      editor.freeDrawingBrush.width = parseInt(size);
    }
  }

  return (
    <div className="ToolArray">
      <button onClick={addRect}>Add Square</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addTriangle}>Add Triangle</button>
      <button onClick={addText}>Add Textbox</button>
      <button onClick={deleteSelection}>Delete</button>
      <button onClick={deleteAll}>Delete All</button>
      <button onClick={drawingMode}>{msg}</button>
      <input
        type="color"
        name="Brush-color"
        id="Brush-color"
        onChange={changeBrushColor}
      />
      <input
        type="range"
        name="Brush-size"
        id="Brush-size"
        onChange={changeBrushSize}
      />
    </div>
  );
}
