import { useState } from "react";
import TodoList from "../TodoList/TodoList";
import "./App.css";

const DEFAULT_ITEMS = [
  {
    name: "My item #1",
    id: 0,
  },
  {
    name: "My item #2",
    id: 1,
  },
  {
    name: "My item #3",
    id: 2,
  },
];

function App() {
  const [items, setItems] = useState(DEFAULT_ITEMS);

  const onItemClick = (id) => {
    console.log("You clicked an item id: " + id);

    if (id === 0) {
      items[0].name = Math.random();
      setItems([...items]);
    }
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoList items={items} onItemClick={onItemClick} />
    </div>
  );
}

export default App;
