const path = require("path");
const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const port = 8001;
const app = express();

const todoItems = {};

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/todos", (req, res) => {
  console.log("hey");
  // [{ id: 0, value: 'My todo 0' }, ...]
  const values = [];

  // [0, 1, 2]
  Object.keys(todoItems).forEach((key) => {
    values.push({
      id: key,
      value: todoItems[key],
    });
  });

  // console.log(req.query, req.params)
  res.send({
    todoItems: values,
  });
});

app.post("/todo", (req, res) => {
  const id = crypto.randomBytes(20).toString("hex");
  const value = "Input yours todo...";

  if (todoItems[id]) {
    res.status(400).send();
    return;
  }

  todoItems[id] = value;

  res.send({
    id,
    value,
  });
});

app.patch("/todo/:id", (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  if (!todoItems[id]) {
    res.status(400).send();
    return;
  }

  todoItems[id] = value;

  res.send({
    id,
    value,
  });
});

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;

  if (!(id in todoItems)) {
    res.status(400).send();
    return;
  }

  delete todoItems[id];

  res.send({
    id,
  });
});

app.listen(port, () => {
  console.log("server started at :" + port);
});
