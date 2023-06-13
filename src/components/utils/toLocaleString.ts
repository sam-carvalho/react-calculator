export const toLocaleString = (num: number) =>
  Number(String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 "));
