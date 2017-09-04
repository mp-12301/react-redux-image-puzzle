export default function newGrid() {
  const grid = [];
  for (let i = 0; i < 3 * 3; i += 1) {
    grid.push(i);
  }

  let tmp = grid.length;
  let current = grid.length;
  let top = grid.length;

  if (top) {
    while (top > 0) {
      top -= 1;
      current = Math.floor(Math.random() * (top + 1));
      tmp = grid[current];
      grid[current] = grid[top];
      grid[top] = tmp;
    }
  }
  return grid;
}
