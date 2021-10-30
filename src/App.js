let leftOpr;
let rightOpr;
let buffer = "0";
let prevOper;

const scr = document.querySelector(".screen");

document.querySelector(".buttons").addEventListener("click", function (event) {
  handleClick(event.target.innerText);
});

function handleClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNum(value);
  }
}

function handleNum(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  renderer();
}

function renderer() {
  scr.innerText = buffer;
}

function update_oprs() {
  bufferInt = parseInt(buffer);
  if (leftOpr === undefined) {
    leftOpr = bufferInt;
  } else {
    rightOpr = bufferInt;
  }
}

function clear_scr() {
  leftOpr = rightOpr = undefined;
  buffer = "0";
}

function erase_last_digit() {
  const buf_int = parseInt(buffer);
  if (buf_int !== 0 && prevOper !== "=") {
    buffer = Math.floor(buf_int / 10).toString();
  }
}

function calc_res() {
  switch (prevOper) {
    case "×":
      leftOpr *= rightOpr;
      break;
    case "÷":
      leftOpr /= rightOpr;
      break;
    case "-":
      leftOpr -= rightOpr;
      break;
    case "+":
      leftOpr += rightOpr;
  }
}

function handleSymbol(value) {
  if (leftOpr === undefined) {
    leftOpr = parseInt(buffer);
  } else {
    rightOpr = parseInt(buffer);
    calc_res();
  }

  switch (value) {
    case "C":
      clear_scr();
      break;
    case "←":
      erase_last_digit();
      break;
    case "=":
      buffer = leftOpr.toString();
      break;
    default:
      buffer = "0";
  }
  renderer();
  prevOper = value;
}
