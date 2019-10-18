export function createNode({ ...args }) {
  return {
    ...args,
    isWall: false,
    isEndNode: false,
    isStartNode: false
  };
}

export function newBoard(rows, cols, value) {
  return [...Array(rows)].map((_, x) =>
    [...Array(cols)].map((_, y) =>
      typeof value !== 'undefined' ? value : createNode({ x, y })
    )
  );
}
