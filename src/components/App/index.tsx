import { FC, ReactNode, useState } from "react";
import { generateCells } from "../../utils";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";
import "./App.scss";

const App: FC = () => {
  const [cells, setCells] = useState(generateCells());

  const renderButtons = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Button key={`${rowIndex}-${colIndex}`} />)
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">😁</div>
        <NumberDisplay value={23} />
      </div>
      <div className="Body">{renderButtons()}</div>
    </div>
  );
};

export default App;
