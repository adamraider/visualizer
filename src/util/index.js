export function createNode({ ...args }) {
  return {
    ...args,
    wall: false,
    visited: false
  };
}

export function newBoard(rows, cols, value) {
  return [...Array(rows)].map((_, x) =>
    [...Array(cols)].map((_, y) =>
      typeof value !== 'undefined' ? value : createNode({ x, y })
    )
  );
}
