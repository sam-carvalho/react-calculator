import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import { buttonValues, operations } from "./components/constants";
import { Calculation } from "./components/interfaces/Calculation";

const applyClassName = (btn: string | number) => {
  if (btn === "=") {
    return "equals";
  }

  if (operations.includes(btn.toString())) {
    return "operations";
  }

  return "";
};

function App() {
  const [calc, setCalc] = useState<Calculation>({
    sign: "",
    num: 0,
    res: 0,
  });

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {buttonValues.flat().map((btn, index) => {
          return (
            <Button
              key={index}
              className={applyClassName(btn)}
              value={btn}
              calc={calc}
              setCalc={setCalc}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
