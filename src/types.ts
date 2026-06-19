export type TileType =
  | "empty"
  | "start"
  | "end"
  | "debris"
  | "house"
  | "asteroid"
  | "asteroid_path"
  | "blackhole"
  | "pirate"
  | "portal";

export type LevelData = {
  name: string;
  grid_size: number;
  moves: number;
  start_cell: [number, number] | null;
  end_cell: [number, number] | null;
  debris: [number, number][];
  houses: [number, number][];
  asteroids: [number, number][];
  asteroid_paths: [number, number][];
  blackholes: [number, number][];
  pirates: [number, number][];
  portals: [number, number][];
};

export type Cell = {
  x: number;
  y: number;
};
