import { CELL_SIZE, COLORS, grid, gridSize } from "./state";

const canvas = document.getElementById("grid-canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;

export const resizeCanvas = () => {
  canvas.width = gridSize * CELL_SIZE;
  canvas.height = gridSize * CELL_SIZE;
};

export const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const tile = grid[y][x];
      const px = x * CELL_SIZE;
      const py = y * CELL_SIZE;

      ctx.fillStyle = COLORS[tile] ?? COLORS.empty;
      ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(px + 0.25, py + 0.25, CELL_SIZE - 0.5, CELL_SIZE - 0.5);
    }
  }
};
