
import React  from 'react';
import { useState } from 'react';
import white from "../src/public/paw.jpg";
import orange from "../src/public/pawG.jpg";
import title from "../src/public/title.gif";
import laserCat from "../src/public/laser2.gif";
import keyboard from "../src/public/keyboard.gif";
import next from "../src/public/Next.gif"
import guitar from "../src/public/guitar.gif";





function Square({ id, value, onSquareClick }) {
  
  let content;
  if (value === "Orange") {
    content = <img className = "squareImage" src = {orange} alt="orange"  width = "116px" height = "116px" onClick = {onSquareClick} />
  }
  else if (value === "White") {
    content = <img className = "squareImage" src = {white} alt="white" width = "116px" height = "116px" onClick = {onSquareClick} />
  }
  return (
    <button id = {id} className="square" onClick={onSquareClick}>{content}
    </button>
  );
}



function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "Orange";
    } else {
      nextSquares[i] = "White";
    } 
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner ;

    return(
      
    <img className = "keyboard" src = {keyboard} alt = "keyboard"></img>
    );


  } else {
    status =  (xIsNext ? 'Orange' : 'White');
  }


  return (
    <div>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
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
      description = 'To move #' + move;
    } else {
      description = 'Back to Start';
    }
    return (
      <li key={move}>
        <button className = "moves"  onClick={() => jumpTo(move)}>{description} 
        <img src = {guitar} height = "80%" ></img>
        </button>
      </li>
    );
  });

  
  return (
    <div>
      
      

      <div className = "gameContainer">
      <a  href='https://www.youtube.com/watch?v=hvL1339luv0'><button type = "button" className = "button" >CLICK ME(OW)</button></a>

      <img className = "title1" src = {title} alt="title"  width = "700px" height = "120px"/> </div>
  
      <div className="game">            
      <div className="game-info">
        <ol> {moves}</ol>
      </div>    
      <div className="game-board">
      <img className = "next" src = {next} alt = "next" height = "40px" width = "200px"/>

        <Board  xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
   <img className = "laser-cat" src = {laserCat} alt = "lasercat" width = "900px" height ="450px"/>

    </div>
  </div>
    
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}
