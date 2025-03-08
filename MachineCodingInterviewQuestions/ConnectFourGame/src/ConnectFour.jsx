import React, { useState } from "react";
import "./ConnectFour.css";

const ROWS = 6;
const COLS = 7;

// Union-Find Helper Class
class UnionFind {
  constructor(size) {
    this.parent = Array(size).fill(null).map((_, i) => i);
    this.rank = Array(size).fill(1);
    this.size = Array(size).fill(1); // Tracks the size of each component
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
        this.size[rootX] += this.size[rootY];
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
        this.size[rootY] += this.size[rootX];
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
        this.size[rootX] += this.size[rootY];
      }
    }
  }

  getSize(x) {
    return this.size[this.find(x)];
  }
}

const ConnectFour = () => {
  const [board, setBoard] = useState(
    Array(ROWS)
      .fill()
      .map(() => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [winningCells, setWinningCells] = useState([]);
  const [winner, setWinner] = useState(null);

  const uf = new UnionFind(ROWS * COLS);

  const getIndex = (row, col) => row * COLS + col;

  const directions = [
    [0, 1],    // Horizontal →
    [1, 0],    // Vertical ↓
    [1, 1],    // Diagonal ↘
    [1, -1]    // Diagonal ↙
  ];

  const checkWin = (row, col) => {
    const currentIndex = getIndex(row, col);

    for (const [dr, dc] of directions) {
      let count = 1;
      let winningCells = [[row, col]];

      for (const sign of [-1, 1]) {
        let r = row + dr * sign;
        let c = col + dc * sign;

        while (
          r >= 0 && r < ROWS &&
          c >= 0 && c < COLS &&
          board[r][c] === currentPlayer
        ) {
          count++;
          winningCells.push([r, c]);
          r += dr * sign;
          c += dc * sign;
        }
      }

      if (count >= 4) {
        setWinningCells(winningCells);
        return true;
      }
    }
    return false;
  };

  const handleClick = (rowIndex, colIndex) => {
    if (winner || board[rowIndex][colIndex]) return;

    const newBoard = [...board.map((row) => [...row])];

    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoard(newBoard);

    // Union-Find logic
    const currentIndex = getIndex(rowIndex, colIndex);

    for (const [dr, dc] of directions) {
      const newRow = rowIndex + dr;
      const newCol = colIndex + dc;

      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        newBoard[newRow][newCol] === currentPlayer
      ) {
        uf.union(currentIndex, getIndex(newRow, newCol));
      }
    }

    if (checkWin(rowIndex, colIndex)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === "red" ? "blue" : "red");
    }
  };

  return (
    <div className="connect-four-container">
      <h1 className="game-title">Welcome to Connect Four</h1>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${
                winningCells.some(([r, c]) => r === rowIndex && c === colIndex)
                  ? "winning"
                  : ""
              }`}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell && <div className={`disc ${cell}`} />}
            </div>
          ))
        )}
      </div>
      <div className="winner-message">
        {winner && (
          <h2>
            The winner is <span className={winner}>{winner.toUpperCase()}</span> 🎉
          </h2>
        )}
      </div>
    </div>
  );
};

export default ConnectFour;
