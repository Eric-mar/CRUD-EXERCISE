const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const DataFile = path.join(__dirname, "data.json");

const readData = () => {
  try {
    if (!fs.existsSync(DataFile)) {
      fs.writeFileSync(DataFile, "[]");
    }
    const data = fs.readFileSync(DataFile, "utf-8");
    return JSON.parse(data || []);
  } catch (error) {
    return [];
  }
};
const writeData = (data) => {
  fs.writeFileSync(DataFile, JSON.stringify(data, null, 2));
};

app.get("/items", (req, res) => {
  const items = readData();
  res.status(200).json(items);
});

// app.get("/data", (req, res) => {
//   const items = readFile();
//   const newItem = {
//     id: uuidv4(),
//     ...req.body,
//   };
//   items.push
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log("the server is Running");
});
