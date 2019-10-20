import React from 'react';
import cs from 'clsx';

export default class Cell extends React.PureComponent {
  render() {
    const {
      renderVisited,
      wall,
      isOnShortestPath,
      isStart,
      isEndNode
    } = this.props;

    return (
      <div
        className={cs('cell', {
          visited: renderVisited,
          wall: wall,
          end: isEndNode,
          start: isStart,
          'shortest-path': isOnShortestPath
        })}
      ></div>
    );
  }
}
