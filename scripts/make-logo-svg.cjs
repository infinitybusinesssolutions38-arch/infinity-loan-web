const fs = require("fs");
const path = require("path");
const pngPath = path.join("public", "infinity-logo.png");
const outPath = path.join("public", "infinity-logo.svg");
const b64 = fs.readFileSync(pngPath).toString("base64");
const svg = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Infinity Loans and Business Solutions">',
  '<image width="400" height="480" xlink:href="data:image/png;base64,' + b64 + '"/>',
  '</svg>',
  '',
].join("\n");
fs.writeFileSync(outPath, svg, "utf8");
console.log("wrote", outPath, fs.statSync(outPath).size);
