import { FC, ReactNode, useEffect, useState } from "react";
import { NO_OF_BOMBS } from "../../constants";
import { Cell, CellState, CellValue, Face } from "../../types";
import { generateCells, openMultipleCells } from "../../utils";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";
import "./App.scss";

const App: FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(NO_OF_BOMBS);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.surprised);
    };
    const handleMouseUp = (): void => {
      setFace(Face.smile);
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    if (isPlaying && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isPlaying, time]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    //start the game
    if (!isPlaying) {
      // Make sure you can not click on a bomb in the beginning!
      setIsPlaying(true);
    }
    const currentCell = cells[rowParam][colParam];
    let newCells = cells.slice();

    if (
      currentCell.state === CellState.flagged ||
      currentCell.state === CellState.visible
    ) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      //TODO: take care of bomb click
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
      setCells(newCells);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
      setCells(newCells);
    }
  };

  const handleRightClick = (rowParam: number, colParam: number) => (
    e: MouseEvent
  ): void => {
    e.preventDefault();
    if (!isPlaying) {
      return;
    }

    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.untouched) {
      currentCells[rowParam][colParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][colParam].state = CellState.untouched;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const handleFaceClick = (): void => {
    setIsPlaying(false);
    setTime(0);
    setCells(generateCells());
    setBombCounter(NO_OF_BOMBS);
  };

  const renderButtons = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          state={cell.state}
          onClick={handleCellClick}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
          onRightClick={handleRightClick}
        />
      ))
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={bombCounter} />
        <div className="Face" onClick={handleFaceClick}>
          {face}
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderButtons()}</div>
    </div>
  );
};

export default App;
