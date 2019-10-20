export function getShortestPath(queue) {
  const path = [];
  const endNode = queue[queue.length - 1];

  path.push(endNode);

  let currentNode = endNode;
  let count = 0;

  while (currentNode.previousNode && count < 1000) {
    currentNode = currentNode.previousNode;
    path.push(currentNode);
    count++;
  }

  return path.reverse();
}

export default function breadthFirstSearch(board, startNode, endNode) {
  const { x: endX, y: endY } = endNode;

  const traversed = [];
  const queue = [];
  const addToQueue = node => queue.push(node);

  addToQueue(startNode);
  startNode.visited = true;

  while (queue.length > 0) {
    const node = queue.shift();

    traversed.push(node);

    // found the end node
    if (node.x === endX && node.y === endY) return traversed;

    getAdjacentNodes(board, node).forEach(addToQueue);
  }

  return traversed;
}

function getAdjacentNodes(board, node) {
  const { x, y } = node;
  const toQueue = [];

  function enqueue(x, y) {
    const targetNode = board[x][y];

    if (!targetNode.wall && !targetNode.visited) {
      targetNode.previousNode = node;
      toQueue.push(targetNode);
    }

    targetNode.visited = true;
  }

  if (x > 0) enqueue(x - 1, y);
  if (y > 0) enqueue(x, y - 1);
  if (x < board.length - 1) enqueue(x + 1, y);
  if (y < board[0].length - 1) enqueue(x, y + 1);

  return toQueue;
}
