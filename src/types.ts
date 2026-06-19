export type TileType = "empty" | "start" | "end" | "debris" | "house";

export type LevelData = {
  name: string;
  grid_size: number;
  moves: number;
  start_cell: [number, number] | null;
  end_cell: [number, number] | null;
  walls: [number, number][];
  houses: [number, number][];
};

export type Cell = {
  x: number;
  y: number;
};
