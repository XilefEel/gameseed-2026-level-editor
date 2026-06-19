import {
  grid,
  gridSize,
  setGrid,
  setGridSize,
  setStartCell,
  setEndCell,
} from "./state";
import type { LevelData, TileType } from "./types";
import { resizeCanvas, draw } from "./draw";

const setStatus = (msg: string) => {
  const el = document.getElementById("status")!;
  el.textContent = msg;
};

export const buildJSON = (): LevelData => {
  let start: [number, number] | null = null;
  let end: [number, number] | null = null;

  const debris: [number, number][] = [];
  const houses: [number, number][] = [];
  const asteroids: [number, number][] = [];
  const asteroid_paths: [number, number][] = [];
  const blackholes: [number, number][] = [];
  const pirates: [number, number][] = [];
  const portals: [number, number][] = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const t = grid[y][x];

      if (t === "start") start = [x, y];
      if (t === "end") end = [x, y];
      if (t === "debris") debris.push([x, y]);
      if (t === "house") houses.push([x, y]);
      if (t === "asteroid") asteroids.push([x, y]);
      if (t === "asteroid_path") asteroid_paths.push([x, y]);
      if (t === "blackhole") blackholes.push([x, y]);
      if (t === "pirate") pirates.push([x, y]);
      if (t === "portal") portals.push([x, y]);
    }
  }

  const levelName = (document.getElementById("level-name") as HTMLInputElement)
    .value;

  const moves = parseInt(
    (document.getElementById("start-moves") as HTMLInputElement).value,
  );

  return {
    name: levelName || "level_01",
    grid_size: gridSize,
    moves: moves || 15,
    start_cell: start,
    end_cell: end,
    debris,
    houses,
    asteroids,
    asteroid_paths,
    blackholes,
    pirates,
    portals,
  };
};

export const exportJSON = () => {
  const data = buildJSON();

  if (!data.start_cell) {
    alert("Place a start cell first!");
    return;
  }

  if (!data.end_cell) {
    alert("Place an end cell first!");
    return;
  }

  if (data.portals.length % 2 !== 0) {
    alert("Portals must be in pairs!");
    return;
  }

  if (data.asteroids && data.asteroid_paths.length === 0) {
    alert("Asteroids must have paths!");
    return;
  }

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = (data.name || "level") + ".json";
  a.click();

  setStatus("Exported " + a.download);
};

export const importJSON = () => {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = ".json";

  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target!.result as string) as LevelData;
        loadFromJSON(data);
        setStatus("Imported " + file.name);
      } catch {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  input.click();
};

export const loadFromJSON = (data: LevelData) => {
  setGridSize(data.grid_size || 8);

  (document.getElementById("grid-size") as HTMLInputElement).value = String(
    data.grid_size,
  );

  (document.getElementById("start-moves") as HTMLInputElement).value = String(
    data.moves,
  );

  (document.getElementById("level-name") as HTMLInputElement).value =
    data.name || "level_01";

  setGrid(
    Array.from(
      { length: data.grid_size },
      () => Array(data.grid_size).fill("empty") as TileType[],
    ),
  );

  setStartCell(null);
  setEndCell(null);

  if (data.start_cell) {
    const [x, y] = data.start_cell;
    grid[y][x] = "start";
    setStartCell({ x, y });
  }

  if (data.end_cell) {
    const [x, y] = data.end_cell;
    grid[y][x] = "end";
    setEndCell({ x, y });
  }

  (data.debris || []).forEach(([x, y]) => (grid[y][x] = "debris"));

  (data.houses || []).forEach(([x, y]) => (grid[y][x] = "house"));

  (data.asteroids || []).forEach(([x, y]) => (grid[y][x] = "asteroid"));

  (data.asteroid_paths || []).forEach(
    ([x, y]) => (grid[y][x] = "asteroid_path"),
  );

  (data.blackholes || []).forEach(([x, y]) => (grid[y][x] = "blackhole"));

  (data.pirates || []).forEach(([x, y]) => (grid[y][x] = "pirate"));

  (data.portals || []).forEach(([x, y]) => (grid[y][x] = "portal"));

  resizeCanvas();
  draw();
};
