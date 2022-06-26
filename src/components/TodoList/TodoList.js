import { useRef, useEffect } from "react";

import "./TodoList.css";

function TodoList(props) {
  const {
    items,
    selectedId,
    onItemClick,
    onItemBlur,
    onItemChange,
    onItemAdd,
    onItemRemove,
  } = props; // { items: [{  ... }, {... }] }

  const inputRef = useRef(null); // { current: InputElement }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedId]);

  const itemElements = items.map((item) => {
    const isSelected = selectedId === item.id;

    return (
      <li key={item.id} className="todo-item">
        <div className="row">
          <div className="col-11">
            <div
              className="todo-item-content"
              onClick={(e) => {
                e.stopPropagation();

                onItemClick(item.id);
              }}
            >
              {isSelected ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={item.name}
                  onBlur={(e) => {
                    e.stopPropagation();
                    onItemBlur(item.id);
                  }}
                  onChange={(e) => {
                    onItemChange(item.id, e.target.value);
                  }}
                />
              ) : (
                item.name
              )}
            </div>
          </div>
          <div className="col-1">
            <div
              className="todo-item-remove"
              onClick={() => {
                onItemRemove(item.id);
              }}
            >
              X
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="todo-list">
      <ul>{itemElements}</ul>
      <div className="todo-add-item" onClick={onItemAdd}>
        Add new item
      </div>
    </div>
  );
}

export default TodoList;
