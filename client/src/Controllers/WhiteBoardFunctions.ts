import { fabric } from "fabric";
import React, { MutableRefObject } from "react";
import { socket } from "../Socket";

export function addRect(props: { editor: MutableRefObject<fabric.Canvas> }) {
  const { editor } = props;
  editor.current.isDrawingMode = false;
  const rect = new fabric.Rect({
    stroke: "black",
    strokeWidth: 2,
    width: 100,
    height: 100,
    fill: "white",
    selectable: true,
  });

  editor.current.add(rect);
}

export function addCircle(props: { editor: MutableRefObject<fabric.Canvas> }) {
  const { editor } = props;

  editor.current.isDrawingMode = false;
  const cir = new fabric.Circle({
    stroke: "black",
    strokeWidth: 2,
    radius: 50,
    fill: "white",
  });

  editor.current.add(cir);
}

export function addTriangle(props: {
  editor: MutableRefObject<fabric.Canvas>;
}) {
  const { editor } = props;

  editor.current.isDrawingMode = false;

  const triangle = new fabric.Triangle({
    stroke: "black",
    strokeWidth: 2,
    fill: "white",
    width: 100,
    height: 100,
  });

  editor.current.add(triangle);
}

export function addText(props: { editor: MutableRefObject<fabric.Canvas> }) {
  const { editor } = props;

  editor.current.isDrawingMode = false;

  const text = new fabric.Textbox("TEXT");
  editor.current.add(text);
}

export function deleteSelection(props: {
  editor: MutableRefObject<fabric.Canvas>;
}) {
  const { editor } = props;

  editor.current.isDrawingMode = false;
  editor.current.getActiveObjects().forEach((element) => {
    editor.current.remove(element);
  });
}

export function deleteAll(props: { editor: MutableRefObject<fabric.Canvas> }) {
  const { editor } = props;

  editor.current.getObjects().forEach((element) => {
    editor.current.remove(element);
  });
}

export function drawingMode(
  editor: MutableRefObject<fabric.Canvas>,
  mode: React.MutableRefObject<boolean>,
) {
  if (!mode.current) {
    mode.current = true;
    editor.current.isDrawingMode = mode.current;
  } else {
    mode.current = false;
    editor.current.isDrawingMode = mode.current;
  }
}

export function changeBrushColor(
  editor: MutableRefObject<fabric.Canvas>,
  mode: React.MutableRefObject<boolean>,
) {
  const color = (document.getElementById("Brush-color") as HTMLInputElement)
    .value;
  if (color && mode.current) {
    editor.current.freeDrawingBrush.color = color;
  }
}

export function changeBrushSize(
  editor: MutableRefObject<fabric.Canvas>,
  mode: React.MutableRefObject<boolean>,
) {
  const size = (document.getElementById("Brush-size") as HTMLInputElement)
    .value;

  if (size && mode.current) {
    editor.current.freeDrawingBrush.width = parseInt(size);
    if (parseInt(size) == 0) {
      editor.current.freeDrawingBrush.width = 1;
    }
  }
}

export function exportSVG(editor: MutableRefObject<fabric.Canvas>) {
  socket.emit("changes-to-whiteboard", editor.current.toSVG());
}
