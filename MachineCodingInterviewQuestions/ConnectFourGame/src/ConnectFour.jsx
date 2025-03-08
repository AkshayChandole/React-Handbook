import React, { useState } from "react";
import "./ConnectFour.css";

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const [board, setBoard] = useState(
    Array(ROWS)
      .fill()
      .map(() => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [winningCells, setWinningCells] = useState([]);
  const [winner, setWinner] = useState(null);

  // Union-Find Data Structure
  const parent = Array(ROWS * COLS).fill(-1);

  const find = (x) => {
    if (parent[x] < 0) return x;
    return (parent[x] = find(parent[x])); // Path compression
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootX] += parent[rootY];
      parent[rootY] = rootX;
    }
  };

  const index = (row, col) => row * COLS + col;

  const checkWin = (row, col, player) => {
    const directions = [
      [0, 1], // Horizontal →
      [1, 0], // Vertical ↓
      [1, 1], // Diagonal ↘
      [1, -1], // Diagonal ↙
    ];

    for (const [dx, dy] of directions) {
      const cells = [[row, col]];
      for (let step = 1; step < 4; step++) {
        const r = row + step * dx;
        const c = col + step * dy;
        if (
          r >= 0 &&
          r < ROWS &&
          c >= 0 &&
          c < COLS &&
          board[r][c] === player
        ) {
          cells.push([r, c]);
        } else break;
      }

      for (let step = 1; step < 4; step++) {
        const r = row - step * dx;
        const c = col - step * dy;
        if (
          r >= 0 &&
          r < ROWS &&
          c >= 0 &&
          c < COLS &&
          board[r][c] === player
        ) {
          cells.push([r, c]);
        } else break;
      }

      if (cells.length >= 4) {
        setWinningCells(cells);
        setWinner(player);
        return true;
      }
    }

    return false;
  };

  const handleClick = (e) => {
    if (winner || winningCells.length > 0) return;

    const cell = e.target.closest(".cell");
    if (!cell) return; // Ignore clicks outside cells

    const rowIndex = parseInt(cell.dataset.row);
    const colIndex = parseInt(cell.dataset.col);

    const newBoard = [...board.map((row) => [...row])];

    if (!newBoard[rowIndex][colIndex]) {
      newBoard[rowIndex][colIndex] = currentPlayer;
      setBoard(newBoard);

      if (checkWin(rowIndex, colIndex, currentPlayer)) return;

      setCurrentPlayer(currentPlayer === "red" ? "blue" : "red");
    }
  };

  return (
    <div className="connect-four-container">
      <h1 className="game-title">Welcome to Connect Four</h1>

      <div className="board" onClick={handleClick}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${
                winningCells.some(([r, c]) => r === rowIndex && c === colIndex)
                  ? "winning"
                  : ""
              }`}
              data-row={rowIndex}
              data-col={colIndex}
            >
              {cell && <div className={`disc ${cell}`} />}
            </div>
          ))
        )}
      </div>

      <div className="winner-message">
        {winner && (
          <h2>
            The winner is <span className={winner}>{winner.toUpperCase()}</span>{" "}
            🎉
          </h2>
        )}
      </div>
    </div>
  );
};

export default ConnectFour;
