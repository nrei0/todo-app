import "./TodoList.css";

function TodoList(props) {
  const { items, onItemClick } = props; // { items: [{  ... }, {... }] }

  // [1, 2, 3]
  // .map((item) => item + 1)
  // [2, 3, 4]

  const itemElements = items.map((item) => {
    return (
      <li
        key={item.id}
        className="todo-item"
        onClick={(e) => {
          onItemClick(item.id);
        }}
      >
        {item.name}
      </li>
    );
  });

  console.log(itemElements);

  return <ul className="todo-list">{itemElements}</ul>;
}

export default TodoList;
