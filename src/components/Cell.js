import React from 'react';
import cs from 'clsx';

export default class Cell extends React.Component {
  render() {
    const { node, isStart, isEndNode, ...props } = this.props;

    return (
      <div {...props}>
        <span
          className={cs({
            visited: node.visited,
            wall: node.isWall,
            end: isEndNode,
            start: isStart,
            'shortest-path': node.isOnShortestPath
          })}
        ></span>
      </div>
    );
  }
}
