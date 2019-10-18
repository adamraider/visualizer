import { newBoard } from '../util';

export function getShortestPath(queue) {
  const path = [];
  const endNode = queue[queue.length - 1];

  path.push(endNode);

  let currentNode = endNode;

  while (currentNode.previousNode) {
    currentNode = currentNode.previousNode;
    path.push(currentNode);
  }

  return path.reverse();
}

export default function breadthFirstSearch(board, startNode, endNode) {
  const visitedInOrder = [];

  const { x: endX, y: endY } = endNode;
  const queue = [startNode];

  const rowsCount = board.length;
  const colsCount = board[0].length;

  const visitedOrQueued = newBoard(rowsCount, colsCount, false);

  while (queue.length > 0) {
    const node = queue.shift();

    const { x, y } = node;
    visitedInOrder.push({ ...node, previousNode: node });

    // found the end node
    if (x === endX && y === endY) return visitedInOrder;

    visitedOrQueued[x][y] = { ...node };

    if (x > 0 && !visitedOrQueued[x - 1][y] && !board[x - 1][y].isWall) {
      const nextNode = {
        ...board[x - 1][y],
        previousNode: node
      };

      visitedOrQueued[x - 1][y] = true;
      queue.push(nextNode);
    }

    if (y > 0 && !visitedOrQueued[x][y - 1] && !board[x][y - 1].isWall) {
      const nextNode = {
        ...board[x][y - 1],
        previousNode: node
      };

      visitedOrQueued[x][y - 1] = true;
      queue.push(nextNode);
    }

    if (
      x < board.length - 1 &&
      !visitedOrQueued[x + 1][y] &&
      !board[x + 1][y].isWall
    ) {
      const nextNode = {
        ...board[x + 1][y],
        previousNode: node
      };

      visitedOrQueued[x + 1][y] = true;
      queue.push(nextNode);
    }

    if (
      y < board[0].length - 1 &&
      !visitedOrQueued[x][y + 1] &&
      !board[x][y + 1].isWall
    ) {
      const newNode = {
        ...board[x][y + 1],
        previousNode: node
      };

      visitedOrQueued[x][y + 1] = true;
      queue.push(newNode);
    }
  }

  return visitedInOrder;
}
