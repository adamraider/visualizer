import React from 'react';

import './App.scss';
import Cell from './components/Cell';
import breadthFirstSearch, { getShortestPath } from './algorithms/bfs';
import { newBoard } from './util';

const NUM_OF_ROWS = 20;
const NUM_OF_COLS = 20;

const BOARD = newBoard(NUM_OF_ROWS, NUM_OF_COLS);
const VISITED = newBoard(NUM_OF_ROWS, NUM_OF_COLS, false);

BOARD[5][11].wall = true;
BOARD[6][11].wall = true;
BOARD[7][11].wall = true;
BOARD[8][11].wall = true;
BOARD[9][11].wall = true;
BOARD[10][11].wall = true;
BOARD[11][11].wall = true;
BOARD[12][11].wall = true;
BOARD[13][11].wall = true;
BOARD[5][4].wall = true;
BOARD[6][4].wall = true;
BOARD[7][4].wall = true;
BOARD[8][4].wall = true;
BOARD[9][4].wall = true;
BOARD[10][4].wall = true;
BOARD[11][4].wall = true;
BOARD[13][4].wall = true;
BOARD[5][4].wall = true;
BOARD[5][5].wall = true;
BOARD[5][6].wall = true;
BOARD[5][7].wall = true;
BOARD[5][8].wall = true;
BOARD[5][9].wall = true;
BOARD[5][10].wall = true;
BOARD[5][11].wall = true;
BOARD[5][12].wall = true;
BOARD[5][13].wall = true;

const allNodes = BOARD.reduce((memo, row) => memo.concat(row), []);
const freeNodes = allNodes.filter(node => !node.wall);

const startNode = freeNodes.splice(
  Math.floor(Math.random() * freeNodes.length),
  1
)[0];

const endNode = freeNodes.splice(
  Math.floor(Math.random() * freeNodes.length),
  1
)[0];

class App extends React.Component {
  state = {
    board: BOARD,
    visited: VISITED,
    shortestPath: [],
    queue: []
  };

  componentDidMount() {
    const queue = breadthFirstSearch(
      this.state.board,

      // start
      this.state.board[startNode.x][startNode.y],

      // end
      this.state.board[endNode.x][endNode.y]
    );

    const shortestPath = getShortestPath(queue);
    this.setState({ queue, shortestPath });
  }

  componentDidUpdate() {
    const { board, queue, visited, shortestPath } = this.state;

    if (queue.length > 0) {
      // animate traversal
      setTimeout(() => {
        const { x, y } = queue.shift();
        const node = board[x][y];

        node.renderVisited = true;
        visited[x][y] = true;

        this.setState({ board, queue });
      }, 0);
    } else if (shortestPath.length > 0) {
      // animate shortest path
      setTimeout(() => {
        const { x, y } = shortestPath.shift();
        const node = board[x][y];

        node.isOnShortestPath = true;

        this.setState({ board, shortestPath });
      }, 0);
    }
  }

  render() {
    const { board } = this.state;

    return (
      <div className="App">
        <div className="board">
          {board.map((row, x) => (
            <div key={x} className="flex">
              <div className={`row row--${x}`}>
                {row.map((_, y) => (
                  <Cell
                    key={x + ',' + y}
                    {...board[x][y]}
                    renderVisited={this.state.visited[x][y]}
                    isStart={x === startNode.x && y === startNode.y}
                    isEndNode={x === endNode.x && y === endNode.y}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
