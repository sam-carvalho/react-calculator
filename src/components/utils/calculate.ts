const add = (a: number, b: number): number => {
  return a + b;
};

const subtract = (a: number, b: number): number => {
  return a - b;
};

const multiply = (a: number, b: number): number => {
  return a * b;
};

const divide = (a: number, b: number): number => {
  return a / b;
};

export const calculate = (a: number, b: number, sign: string): number => {
  if (sign === "+") {
    return add(a, b);
  } else if (sign === "-") {
    return subtract(a, b);
  } else if (sign === "X") {
    return multiply(a, b);
  } else {
    return divide(a, b);
  }
};
