const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

const filePath = path.join(__dirname, "data.json");

const readData = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
  const items = readData();
  res.status(200).send(items);
});

app.post("/items", (req, res) => {
  console.log(req.body);
  const items = readData();
  const newItem = {
    id: Date.now(),
    ...req.body,
  };
  items.push(newItem);
  writeData(items);
  res.status(201).json({
    message: "items added",
    newItem,
  });
});

app.put("/:id", (req, res) => {
  const items = readData();
  const id = Number(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === id);
  if (!itemIndex) {
    res.status(404).json({ message: "user not found" });
  }
  items[itemIndex] = {
    ...items[itemIndex],
    ...req.body,
  };
  writeData(items);
  res.status(200).json({
    message: "the user updated",
    item: items[itemIndex],
  });
});

app.listen(8000);
