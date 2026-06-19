import { CELL_SIZE, gridSize } from "./state";
import type { Cell } from "./types";
import { paintCell } from "./grid";

const canvas = document.getElementById("grid-canvas") as HTMLCanvasElement;

let isPainting = false;
let isErasing = false;
let lastPaintedCell: Cell | null = null;

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

    const cell = cellFromEvent(e);
    lastPaintedCell = cell;
    if (cell) {
      paintCell(cell, isErasing);
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isPainting) return;

    const cell = cellFromEvent(e);
    if (!cell) return;

    if (
      lastPaintedCell &&
      cell.x === lastPaintedCell.x &&
      cell.y === lastPaintedCell.y
    ) {
      return;
    }

    paintCell(cell, isErasing);
    lastPaintedCell = cell;
  });

  canvas.addEventListener("mouseup", () => {
    isPainting = false;
    lastPaintedCell = null;
  });

  canvas.addEventListener("mouseleave", () => {
    isPainting = false;
  });

  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
};
