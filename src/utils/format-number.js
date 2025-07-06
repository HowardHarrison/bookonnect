import numeral from "numeral";

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format("$0,0.00") : "";

  return result(format, ".00");
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format("0.0%") : "";

  return result(format, ".0");
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format("0.00a") : "";

  return result(format, ".00");
}

export function fData(number) {
  const format = number ? numeral(number).format("0.0 b") : "";

  return result(format, ".0");
}

// export function NumberComma(number) {
//   if (!number && number !== 0) return "0"; // Handle undefined/null
//   return Number(number).toLocaleString("en-US");
// }

export function NumberComma(number) {
  if (isNaN(number) || number === null || number === undefined) return "0.00";

  const parts = number.toString().split("."); // Split integer and decimal parts
  const integerPart = Number(parts[0]).toLocaleString("en-US"); // Format integer part with commas
  const decimalPart = parts[1] ? `.${parts[1]}` : ""; // Keep the decimal part as is

  return `${integerPart}${decimalPart}`;
}

function result(format, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}
