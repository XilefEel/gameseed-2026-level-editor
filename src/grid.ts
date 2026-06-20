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
  asteroids,
  setCurrentAsteroidIndex,
  setAsteroids,
  currentAsteroidIndex,
  portals,
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
  setAsteroids([]);
  setCurrentAsteroidIndex(-1);

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
  const prev = grid[cell.y][cell.x];
  const tile: TileType = erase ? "empty" : selectedTile;

  if (tile === "start") {
    if (startCell) grid[startCell.y][startCell.x] = "empty";
    setStartCell({ x: cell.x, y: cell.y });
  }

  if (tile === "end") {
    if (endCell) grid[endCell.y][endCell.x] = "empty";
    setEndCell({ x: cell.x, y: cell.y });
  }

  grid[cell.y][cell.x] = tile;

  if (tile === "asteroid") {
    asteroids.push({
      cell: { x: cell.x, y: cell.y },
      path: [[cell.x, cell.y]],
    });
    setCurrentAsteroidIndex(asteroids.length - 1);
  }

  if (tile === "asteroid_path") {
    const currentAsteroid = asteroids[currentAsteroidIndex];
    currentAsteroid.path.push([cell.x, cell.y]);
  }

  if (erase && prev === "asteroid_path") {
    const asteroid = asteroids[currentAsteroidIndex];
    if (asteroid) {
      const i = asteroid.path.findIndex(
        ([x, y]) => x === cell.x && y === cell.y,
      );
      if (i !== -1) asteroid.path.splice(i, 1);
    }
  }

  if (erase && prev === "asteroid") {
    const idx = asteroids.findIndex(
      (a) => a.cell.x === cell.x && a.cell.y === cell.y,
    );
    if (idx !== -1) {
      asteroids[idx].path.forEach(([x, y]) => (grid[y][x] = "empty"));
      asteroids.splice(idx, 1);

      setCurrentAsteroidIndex(
        Math.min(currentAsteroidIndex, asteroids.length - 1),
      );
    }
  }

  if (tile === "portal_up") {
    portals.push({
      cell: { x: cell.x, y: cell.y },
      dir: "up",
    });
  }

  if (tile === "portal_down") {
    portals.push({
      cell: { x: cell.x, y: cell.y },
      dir: "down",
    });
  }

  if (tile === "portal_left") {
    portals.push({
      cell: { x: cell.x, y: cell.y },
      dir: "left",
    });
  }

  if (tile === "portal_right") {
    portals.push({
      cell: { x: cell.x, y: cell.y },
      dir: "right",
    });
  }

  draw();
};
