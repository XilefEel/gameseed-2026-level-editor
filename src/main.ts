import { initGrid, resizeGrid } from "./grid";
import { setupInput } from "./input";
import { exportJSON, importJSON } from "./io";
import { setSelectedTile } from "./state";

(window as any).selectTile = (tile: string, btn: HTMLElement) => {
  setSelectedTile(tile as any);
  document
    .querySelectorAll(".tile-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
};

(window as any).resizeGrid = resizeGrid;

(window as any).clearGrid = () => {
  if (!confirm("Clear the grid?")) return;
  initGrid();
};

(window as any).exportJSON = exportJSON;

(window as any).importJSON = importJSON;

setupInput();
initGrid();
