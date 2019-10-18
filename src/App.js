import React from 'react';
import cs from 'clsx';
import './App.scss';

const ROWS = 20;
const COLS = 50;
const WALL = 2;
const BOARD = [...Array(ROWS)].map(() => [...Array(COLS)].map(() => 0));
const VISITED = [...Array(ROWS)].map(() => [...Array(COLS)].map(() => false));

BOARD[12][10] = WALL;
BOARD[11][10] = WALL;
BOARD[10][8] = WALL;

class Node extends React.PureComponent {
  render() {
    const { visited, value, ...props } = this.props;
    return (
      <div {...props}>
        <span className={cs({ visited, wall: value === WALL })}></span>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    board: BOARD,
    visited: VISITED,
    queue: []
  };

  componentDidMount() {
    this.setState({
      queue: [{ x: 10, y: 10 }]
    });
  }

  componentDidUpdate() {
    const { visited, queue, board } = this.state;

    if (queue.length > 0) {
      const { x, y } = queue.shift();

      visited[x][y] = true;

      const toTraverse = [];

      if (x > 0 && !visited[x - 1][y] && board[x - 1][y] !== WALL) {
        toTraverse.push({ x: x - 1, y });
      }

      if (y > 0 && !visited[x][y - 1] && board[x][y - 1] !== WALL) {
        toTraverse.push({ x: x, y: y - 1 });
      }

      if (
        x < board.length - 1 &&
        !visited[x + 1][y] &&
        board[x + 1][y] !== WALL
      ) {
        toTraverse.push({ x: x + 1, y });
      }

      if (
        y < board[0].length - 1 &&
        !visited[x][y + 1] &&
        board[x][y + 1] !== WALL
      ) {
        toTraverse.push({ x: x, y: y + 1 });
      }

      if (toTraverse.length > 0 || queue.length > 0) {
        requestAnimationFrame(() => {
          this.setState({
            visited,
            queue: queue.concat(toTraverse)
          });
        }, 50);
      }
    }
  }

  render() {
    const { board, visited } = this.state;
    return (
      <div className="App">
        <div className="board">
          {board.map((row, x) => (
            <div key={`row: ${x}`}>
              {row.map((_, y) => (
                <Node
                  key={`node: ${x},${y}`}
                  visited={visited[x][y]}
                  value={board[x][y]}
                ></Node>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
