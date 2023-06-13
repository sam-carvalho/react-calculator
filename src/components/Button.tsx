import React from "react";
import "./Button.scss";
import { Calculation } from "./interfaces/Calculation";
import { calculate } from "./utils";
import { operations } from "./constants";

interface ButtonProps {
  className: string;
  value: string | number;
  calc: Calculation;
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>;
}

const handleClick = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  value: string | number,
  calc: Calculation,
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>
): void => {
  switch (value) {
    case "C":
      handleResetClick(calc, setCalc);
      break;
    case "+-":
      handleInvertClick(calc, setCalc);
      break;
    case "%":
      handlePercentClick(calc, setCalc);
      break;
    case "=":
      handleEqualsClick(calc, setCalc);
      break;
    case ".":
      handleCommaClick(calc, setCalc);
      break;
    default:
      if (operations.includes(value.toString())) {
        handleOperationClick(value, calc, setCalc);
        break;
      }
      handleNumClick(event, Number(value), calc, setCalc);
      break;
  }
};

const handleResetClick = (
  calc: Calculation,
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>
): void => {
  setCalc({
    ...calc,
    sign: "",
    num: 0,
    res: 0,
  });
};

const handleInvertClick = (
  calc: Calculation,
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>
): void => {
  setCalc({
    ...calc,
    num: calc.num ? Number(calc.num) * -1 : 0,
    res: calc.res ? Number(calc.res) * -1 : 0,
    sign: "",
  });
};

const handlePercentClick = (
  calc: Calculation,
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>
): void => {
  let num = calc.num ? parseFloat(calc.num.toString()) : 0;
  let res = calc.res ? parseFloat(calc.res.toString()) : 0;

  setCalc({
    ...calc,
    num: (num /= Math.pow(100, 1)),
    res: (res /= Math.pow(100, 1)),
    sign: "",
  });
};

const handleEqualsClick = (
  calc: Calculation,
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>
): void => {
  if (calc.sign && calc.num) {
    setCalc({
      ...calc,
      num: 0,
      res: calculate(Number(calc.res), Number(calc.num), calc.sign),
      sign: "",
    });
  }
};

const handleCommaClick = (
  calc: Calculation,
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>
): void => {
  if (!calc.num.toString().includes(".")) {
    setCalc((prevCalc) => ({
      ...prevCalc,
      num: `${prevCalc.num}.`,
    }));
  }
};

const handleOperationClick = (
  value: string | number,
  calc: Calculation,
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>
): void => {
  setCalc({
    ...calc,
    num: 0,
    res: !calc.res && calc.num ? Number(calc.num) : calc.res,
    sign: String(value),
  });
};

const handleNumClick = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  value: number,
  calc: Calculation,
  setCalc: React.Dispatch<React.SetStateAction<Calculation>>
): void => {
  event.preventDefault();

  const numString = calc.num.toString();
  const updatedNum = numString.includes(".") ? numString + value : value;

  setCalc((prevCalc) => ({
    ...prevCalc,
    num: Number(updatedNum),
    res: !calc.sign ? 0 : calc.res,
  }));
};

const Button: React.FC<ButtonProps> = ({ className, value, calc, setCalc }) => {
  return (
    <button
      className={className}
      value={value}
      onClick={(e) => handleClick(e, value, calc, setCalc)}
    >
      {value}
    </button>
  );
};

export default Button;
