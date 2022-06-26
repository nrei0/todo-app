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

function App() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/todos")
      .then((result) => {
        const loadedTodoItems = (result.data || {}).todoItems || [];

        if (loadedTodoItems.length) {
          setItems(
            loadedTodoItems.map((item) => {
              return {
                id: item.id,
                name: item.value,
              };
            })
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onItemClick = (id) => {
    setSelectedId(id);
  };

  const onItemBlur = (id) => {
    setLoading(true);

    const value = items.find((item) => item.id === id).name;

    if (!value) {
      onItemRemove(id);
      return;
    }

    // `/todo/${id}` => /todo/1
    axios
      .patch(`/todo/${id}`, { value })
      .then(({ data = {} }) => {
        const { id, value } = data;

        if (id) {
          setItems(
            items.map((item) => ({
              ...item,
              name: item.id === id ? value : item.name,
            }))
          );
          setSelectedId(-1);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
    setLoading(true);
    axios
      .post("/todo")
      .then(({ data = {} }) => {
        const { id, value } = data;

        if (id) {
          setItems([...items, { id, name: value }]);
          setSelectedId(id);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onItemRemove = (id) => {
    setLoading(true);

    axios
      .delete(`/todo/${id}`)
      .then(({ data = {} }) => {
        const { id } = data;

        if (id) {
          setItems(items.filter((item) => item.id !== id));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <TodoList
          items={items}
          selectedId={selectedId}
          onItemClick={onItemClick}
          onItemBlur={onItemBlur}
          onItemChange={onItemChange}
          onItemAdd={onItemAdd}
          onItemRemove={onItemRemove}
        />
      )}
    </div>
  );
}

export default App;
