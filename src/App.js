import React from 'react';

import './App.scss';
import Cell from './components/Cell';
import breadthFirstSearch, { getShortestPath } from './algorithms/bfs';
import { newBoard } from './util';

const NUM_OF_ROWS = 20;
const NUM_OF_COLS = 20;

const START_COORDS = {
  x: Math.floor(Math.random() * NUM_OF_ROWS),
  y: Math.floor(Math.random() * NUM_OF_COLS)
};

const END_COORDS = {
  x: Math.floor(Math.random() * NUM_OF_ROWS),
  y: Math.floor(Math.random() * NUM_OF_COLS)
};

const BOARD = newBoard(NUM_OF_ROWS, NUM_OF_COLS);
const VISITED = newBoard(NUM_OF_ROWS, NUM_OF_COLS, false);

BOARD[5][11].isWall = true;
BOARD[6][11].isWall = true;
BOARD[7][11].isWall = true;
BOARD[8][11].isWall = true;
BOARD[9][11].isWall = true;
BOARD[10][11].isWall = true;
BOARD[11][11].isWall = true;
BOARD[12][11].isWall = true;
BOARD[13][11].isWall = true;

class App extends React.Component {
  state = {
    board: BOARD,
    visited: VISITED,
    queue: []
  };

  componentDidMount() {
    const queue = breadthFirstSearch(
      this.state.board,

      // start
      this.state.board[START_COORDS.x][START_COORDS.y],

      // end
      this.state.board[END_COORDS.x][END_COORDS.y]
    );

    const shortestPath = getShortestPath(queue);

    console.log(queue, shortestPath);
    this.setState({ queue, shortestPath });
  }

  componentDidUpdate() {
    const { board, queue, shortestPath } = this.state;

    if (queue.length > 0) {
      // animate traversal
      setTimeout(() => {
        const { x, y } = queue.shift();

        board[x][y].visited = true;

        this.setState({ board, queue });
      }, 0);
    } else if (shortestPath.length > 0) {
      // animate shortest path
      setTimeout(() => {
        const { x, y } = shortestPath.shift();

        board[x][y].isOnShortestPath = true;

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
            <div>
              {row.map((_, y) => (
                <Cell
                  node={board[x][y]}
                  isStart={x === START_COORDS.x && y === START_COORDS.y}
                  isEndNode={x === END_COORDS.x && y === END_COORDS.y}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
