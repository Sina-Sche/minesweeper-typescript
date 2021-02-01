import { FC, ReactNode } from "react";
import { CellState, CellValue } from "../../types";
import "./Button.scss";

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onRightClick(rowParam: number, colParam: number): (...args: any[]) => void;
}
const Button: FC<ButtonProps> = ({
  row,
  col,
  state,
  value,
  onClick,
  onRightClick,
}) => {
  const renderContent = (): ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === CellValue.none) {
        return null;
      }
      return value;
    } else if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          🚩
        </span>
      );
    }
  };
  return (
    <div
      className={`Button ${
        state === CellState.visible ? "visible" : ""
      } value-${value}`}
      onClick={onClick(row, col)}
      onContextMenu={onRightClick(row, col)}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
