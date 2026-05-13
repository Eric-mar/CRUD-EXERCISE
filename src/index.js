const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data.json");

const ensureFileExists = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
};

const readData = () => {
  ensureFileExists();
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data || "[]");
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get("/items", (req, res) => {
  const items = readData();
  res.status(200).json(items);
});

app.get("/items/:id", (req, res) => {
  const items = readData();
  const item = items.find((i) => i.id === req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item);
});

app.post("/items", (req, res) => {
  const items = readData();

  const newItem = {
    id: uuidv4(),
    ...req.body,
  };

  items.push(newItem);
  writeData(items);

  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const items = readData();
  const { id } = req.params;

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  items[index] = {
    ...items[index],
    ...req.body,
    id,
  };

  writeData(items);

  res.status(200).json(items[index]);
});

app.delete("/items/:id", (req, res) => {
  const items = readData();
  const { id } = req.params;

  const newItems = items.filter((item) => item.id !== id);

  if (newItems.length === items.length) {
    return res.status(404).json({ message: "Item not found" });
  }

  writeData(newItems);

  res.status(200).json({ message: "Item deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
