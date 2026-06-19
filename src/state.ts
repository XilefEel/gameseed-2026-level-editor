import type { Cell, TileType } from "./types";

export const CELL_SIZE = 48;

export const COLORS: Record<TileType, string> = {
  empty: "#0A0A1A",
  start: "#b5e61d",
  end: "#ffc90e",
  debris: "#595959",
  house: "#b97a57",
  asteroid: "#7F7F7F",
  asteroid_path: "#16162D",
  blackhole: "#ED1C24",
  pirate: "#A349A4",
  portal: "#00A2E8",
};

export let grid: TileType[][] = [];
export let gridSize = 8;
export let selectedTile: TileType = "empty";
export let startCell: Cell | null = null;
export let endCell: Cell | null = null;

export function setGrid(g: TileType[][]) {
  grid = g;
}

export function setGridSize(s: number) {
  gridSize = s;
}

export function setSelectedTile(t: TileType) {
  selectedTile = t;
}

export function setStartCell(c: Cell | null) {
  startCell = c;
}

export function setEndCell(c: Cell | null) {
  endCell = c;
}
