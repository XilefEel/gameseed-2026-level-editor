const CELL_SIZE = 48;

const COLORS = {
  empty: "#0A0A1A",
  start: "#b5e61d",
  end: "#ffc90e",
  debris: "#595959",
  house: "#b97a57",
};

const canvas = document.getElementById("grid-canvas");
const ctx = canvas.getContext("2d");

let gridSize = 8;
let grid = [];
let selectedTile = "empty";
let isPainting = false;
let isErasing = false;
let startCell = null;
let endCell = null;

const initGrid = () => {
  grid = Array.from({ length: gridSize }, () => Array(gridSize).fill("empty"));
  startCell = null;
  endCell = null;

  resizeCanvas();
  draw();
};

const resizeCanvas = () => {
  canvas.width = gridSize * CELL_SIZE;
  canvas.height = gridSize * CELL_SIZE;
};

const resizeGrid = () => {
  const newSize = Math.max(
    4,
    Math.min(16, parseInt(document.getElementById("grid-size").value) || 8),
  );

  document.getElementById("grid-size").value = newSize;
  gridSize = newSize;

  initGrid();
};

const selectTile = (tile, btn) => {
  selectedTile = tile;

  document
    .querySelectorAll(".tile-btn")
    .forEach((b) => b.classList.remove("active"));

  btn.classList.add("active");
};

const cellFromEvent = (e) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL_SIZE);
  const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL_SIZE);

  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return null;

  return { x, y };
};

const paintCell = (cell, erase) => {
  if (!cell) return;

  const tile = erase ? "empty" : selectedTile;

  if (tile === "start") {
    if (startCell) grid[startCell.y][startCell.x] = "empty";
    startCell = { x: cell.x, y: cell.y };
  }

  if (tile === "end") {
    if (endCell) grid[endCell.y][endCell.x] = "empty";
    endCell = { x: cell.x, y: cell.y };
  }

  grid[cell.y][cell.x] = tile;

  draw();
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const tile = grid[y][x];
      const px = x * CELL_SIZE;
      const py = y * CELL_SIZE;

      ctx.fillStyle = COLORS[tile] || COLORS.empty;
      ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(px + 0.25, py + 0.25, CELL_SIZE - 0.5, CELL_SIZE - 0.5);
    }
  }
};

canvas.addEventListener("mousedown", (e) => {
  e.preventDefault();

  isErasing = e.button === 2;
  isPainting = true;

  paintCell(cellFromEvent(e), isErasing);
});

canvas.addEventListener("mousemove", (e) => {
  if (!isPainting) return;

  paintCell(cellFromEvent(e), isErasing);
  const cell = cellFromEvent(e);
});

canvas.addEventListener("mouseup", () => {
  isPainting = false;
});

canvas.addEventListener("mouseleave", () => {
  isPainting = false;
});

canvas.addEventListener("contextmenu", (e) => e.preventDefault());

const clearGrid = () => {
  if (!confirm("Clear the grid?")) return;

  initGrid();
  setStatus("Grid cleared");
};

const setStatus = (msg) => {
  document.getElementById("status").textContent = msg;
};

const buildJSON = () => {
  let start = null;
  let end = null;

  const walls = [];
  const houses = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const t = grid[y][x];

      if (t === "start") start = [x, y];
      if (t === "end") end = [x, y];
      if (t === "debris") walls.push([x, y]);
      if (t === "house") houses.push([x, y]);
    }
  }

  return {
    name: document.getElementById("level-name").value || "level_01",
    grid_size: gridSize,
    moves: parseInt(document.getElementById("start-moves").value) || 15,
    start_cell: start,
    end_cell: end,
    walls,
    houses,
  };
};

const exportJSON = () => {
  const data = buildJSON();

  if (!data.start_cell) {
    alert("Place a start cell first!");
    return;
  }

  if (!data.end_cell) {
    alert("Place an end cell first!");
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

const importJSON = () => {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = ".json";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
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

const loadFromJSON = (data) => {
  gridSize = data.grid_size || 8;
  document.getElementById("grid-size").value = gridSize;
  document.getElementById("start-moves").value = data.moves || 15;
  document.getElementById("level-name").value = data.name || "level_01";

  grid = Array.from({ length: gridSize }, () => Array(gridSize).fill("empty"));
  startCell = null;
  endCell = null;

  if (data.start_cell) {
    const [x, y] = data.start_cell;
    grid[y][x] = "start";
    startCell = { x, y };
  }

  if (data.end_cell) {
    const [x, y] = data.end_cell;
    grid[y][x] = "end";
    endCell = { x, y };
  }

  (data.walls || []).forEach(([x, y]) => (grid[y][x] = "debris"));
  (data.houses || []).forEach(([x, y]) => (grid[y][x] = "house"));

  resizeCanvas();
  draw();
};

initGrid();
