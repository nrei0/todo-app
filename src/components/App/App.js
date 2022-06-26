// const [value, setValue] = useState("Hello world");
// const [text, setText] = useState("My text");

// useEffect(() => {
//   console.log("Rendering every time when props changed");
// });

// useEffect(() => {
//   console.log("Rendering only at start");
// }, []);

// useEffect(() => {
//   console.log('Rendering only when changed "value"');
// }, [value]);

// useEffect(() => {
//   console.log('Rendering only when changed "text"');
// }, [text]);

// return (
//   <div
//     onClick={() => {
//       setValue("World hell");
//     }}
//   >
//     {value} - {text}
//   </div>
// );

import { useEffect, useState } from "react";
import axios from "axios";
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
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    const makeAsyncCall = async () => {
      const { data } = await axios.get("/todos");
      console.log(data);
    };

    makeAsyncCall();
  }, []);

  const onItemClick = (id) => {
    setSelectedId(id);
  };

  const onItemBlur = () => {
    setSelectedId(-1);
  };

  const onItemChange = (id, value) => {
    setItems(
      items.map((item) => ({
        ...item,
        name: item.id === id ? value : item.name,
      }))
    );
  };

  const onItemAdd = () => {
    const id = items.length
    const newItem = {
      name: 'New item',
      id
    }
    setItems(
      [...items, newItem]
    );
    setSelectedId(id)
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoList
        items={items}
        onItemClick={onItemClick}
        onItemBlur={onItemBlur}
        onItemChange={onItemChange}
        onItemAdd={onItemAdd}
        selectedId={selectedId}
      />
    </div>
  );
}

export default App;
