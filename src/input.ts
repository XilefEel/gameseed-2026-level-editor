import { CELL_SIZE, gridSize } from "./state";
import type { Cell } from "./types";
import { paintCell } from "./grid";

const canvas = document.getElementById("grid-canvas") as HTMLCanvasElement;

let isPainting = false;
let isErasing = false;

const cellFromEvent = (e: MouseEvent): Cell | null => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL_SIZE);
  const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL_SIZE);

  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return null;

  return { x, y };
};

export const setupInput = () => {
  canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();

    isErasing = e.button === 2;
    isPainting = true;

    paintCell(cellFromEvent(e)!, isErasing);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isPainting) return;

    const cell = cellFromEvent(e);
    if (cell) {
      paintCell(cell, isErasing);
    }
  });

  canvas.addEventListener("mouseup", () => {
    isPainting = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isPainting = false;
  });

  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
};
