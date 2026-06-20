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
  | "hotspot"
  | "portal_up"
  | "portal_down"
  | "portal_left"
  | "portal_right";

export type LevelData = {
  name: string;
  grid_size: number;
  moves: number;
  parcel_type: "normal" | "fragile" | "flammable";
  start_cell: [number, number] | null;
  end_cell: [number, number] | null;
  debris: [number, number][];
  houses: [number, number][];
  asteroids: AsteroidData[];
  blackholes: [number, number][];
  pirates: [number, number][];
  portals: PortalData[];
};

export type Cell = {
  x: number;
  y: number;
};

export type AsteroidData = {
  cell: Cell;
  path: [number, number][];
};

export type PortalData = {
  cell: Cell;
  dir: "up" | "down" | "left" | "right";
};
