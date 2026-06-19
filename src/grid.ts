import {
  gridSize,
  setGrid,
  setGridSize,
  setStartCell,
  setEndCell,
  grid,
  selectedTile,
  startCell,
  endCell,
} from "./state";
import type { TileType, Cell } from "./types";
import { resizeCanvas, draw } from "./draw";

export const initGrid = () => {
  setGrid(
    Array.from(
      { length: gridSize },
      () => Array(gridSize).fill("empty") as TileType[],
    ),
  );

  setStartCell(null);
  setEndCell(null);

  resizeCanvas();
  draw();
};

export const resizeGrid = () => {
  const input = document.getElementById("grid-size") as HTMLInputElement;
  const newSize = Math.max(4, Math.min(16, parseInt(input.value) || 8));

  input.value = String(newSize);
  setGridSize(newSize);

  initGrid();
};

export const paintCell = (cell: Cell, erase: boolean) => {
  const tile: TileType = erase ? "empty" : selectedTile;

  if (tile === "start") {
    if (startCell) {
      grid[startCell.y][startCell.x] = "empty";
    }
    setStartCell({ x: cell.x, y: cell.y });
  }

  if (tile === "end") {
    if (endCell) {
      grid[endCell.y][endCell.x] = "empty";
    }
    setEndCell({ x: cell.x, y: cell.y });
  }

  grid[cell.y][cell.x] = tile;
  draw();
};
