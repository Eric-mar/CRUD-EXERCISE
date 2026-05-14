const express = require("express");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "/data.json");

const readFile = () => {
  if (!fs.readSync(filePath)) {
    fs.writeFileSync(filePath, "utf-8");
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data, null, 2);
};

const writeFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};
module.exports = {
  readfile,
  writeFile,
};
