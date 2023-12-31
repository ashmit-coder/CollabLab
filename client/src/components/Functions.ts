import { fabric } from "fabric";
import React from "react";

export function addRect(props: { editor: fabric.Canvas }) {
  const { editor } = props;
  editor.isDrawingMode = false;
  const rect = new fabric.Rect({
    stroke: "black",
    strokeWidth: 2,
    width: 100,
    height: 100,
    fill: "white",
    selectable: true,
  });

  editor.add(rect);
}

export function addCircle(props: { editor: fabric.Canvas }) {
  const { editor } = props;

  editor.isDrawingMode = false;
  const cir = new fabric.Circle({
    stroke: "black",
    strokeWidth: 2,
    radius: 50,
    fill: "white",
  });

  editor.add(cir);

}

export function addTriangle(props: { editor: fabric.Canvas }) {
  const { editor } = props;

  editor.isDrawingMode = false;

  const triangle = new fabric.Triangle({
    stroke: "black",
    strokeWidth: 2,
    fill: "white",
    width: 100,
    height: 100,
  });

  editor.add(triangle);

}

export function addText(props: { editor: fabric.Canvas }) {
  const { editor } = props;

  editor.isDrawingMode = false;

  const text = new fabric.Textbox("TEXT");
  editor.add(text);

}

export function deleteSelection(props: { editor: fabric.Canvas }) {
  const { editor } = props;

  editor.isDrawingMode = false;
  editor.getActiveObjects().forEach((element) => {
    editor.remove(element);
  });

}

export function deleteAll(props: { editor: fabric.Canvas }) {
  const { editor } = props;

  editor.getObjects().forEach((element) => {
    editor.remove(element);
  });

}

export function drawingMode(
  editor: fabric.Canvas,
  mode: React.MutableRefObject<boolean>,
  
) {
  if (!mode.current) {
    mode.current = true;
    editor.isDrawingMode = mode.current;
  
  } else {
    mode.current = false;
    editor.isDrawingMode = mode.current;

  }

}

export function changeBrushColor(
  editor: fabric.Canvas,
  mode: React.MutableRefObject<boolean>,
) {
  const color = (document.getElementById("Brush-color") as HTMLInputElement)
    .value;
  if (color && mode.current) {
    editor.freeDrawingBrush.color = color;
  }

}

export function changeBrushSize(
  editor: fabric.Canvas,
  mode: React.MutableRefObject<boolean>,
) {
  const size = (document.getElementById("Brush-size") as HTMLInputElement).value;

  if (size && mode.current) {
    editor.freeDrawingBrush.width = parseInt(size);
    if (parseInt(size) == 0) {
      editor.freeDrawingBrush.width = 1;
    }
  }

}
