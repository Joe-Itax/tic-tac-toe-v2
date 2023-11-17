import { useState } from 'react';
import Board from './board';

function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // setHistory([...history, nextSquares]);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      if (move !== currentMove) {
        description = 'Aller au coup #' + move;
      } else {
        description = 'Vous êtes au coup #' + move;
      }
    } else {
      description = 'Revenir au début';
    }

    let displayHistoryDescription;
    if (move !== currentMove) {
      displayHistoryDescription = (
        <button onClick={() => jumpTo(move)}>{description}</button>
      );
    } else {
      displayHistoryDescription = <span>{description}</span>;
    }

    return <li key={move}>{displayHistoryDescription}</li>;
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/ moves}</ol>
      </div>
    </div>
  );
}

export default Game;
