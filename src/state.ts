import type { AsteroidData, Cell, PortalData, TileType } from "./types";

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
  hotspot: "#ff7f27",
  portal_up: "#00A2E8",
  portal_down: "#00A2E8",
  portal_left: "#00A2E8",
  portal_right: "#00A2E8",
};

export let grid: TileType[][] = [];
export let gridSize = 8;
export let selectedTile: TileType = "empty";
export let startCell: Cell | null = null;
export let endCell: Cell | null = null;

export let asteroids: AsteroidData[] = [];
export let currentAsteroidIndex = -1;

export let portals: PortalData[] = [];

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

export function setAsteroids(a: AsteroidData[]) {
  asteroids = a;
}

export function setCurrentAsteroidIndex(i: number) {
  currentAsteroidIndex = i;
}
