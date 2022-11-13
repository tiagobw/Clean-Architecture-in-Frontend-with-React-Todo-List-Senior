import { useCallback, useEffect, useState } from 'react';
import TodoList from '../entities/TodoList';
import TodoGateway from '../gateways/TodoGateway';

function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}

type TodoListViewProps = {
  todoGateway: TodoGateway;
};

// await todoGateway.addItem(item);
// await todoGateway.removeItem(item.id);
// await todoGateway.updateItem(toggledItem);

const TodoListView = ({ todoGateway }: TodoListViewProps) => {
  const [description, setDescription] = useState('');
  const [data, setData] = useState({
    todoList: new TodoList(),
  });

  useEffect(() => {
    (async () => {
      const fetchedTodos = await todoGateway.getTodos();
      setData({ todoList: fetchedTodos });
    })();
  }, []);

  return (
    <>
      {data?.todoList?.items?.length === 0 && <div>No Item</div>}
      <span
        data-testid='completed'
      >{`${data?.todoList?.getCompleted?.() ?? 0}%`}</span>
      {data?.todoList?.items?.map((item: any) => (
        <div key={item.id}>
          <span style={{ textDecoration: item.done ? 'line-through' : '' }}>
            {item.description}
          </span>
          <button
            onClick={async () =>
              setData({ todoList: await data.todoList.toggleDone(item) })
            }
          >
            Done/Undone
          </button>
          <button
            onClick={async () =>
              setData({ todoList: await data.todoList.removeItem(item) })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <hr />
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyUp={async (e) => {
          if (e.key === 'Enter') {
            const newTodoList = await data.todoList.addItem(description);
            if (newTodoList) {
              setData({ todoList: newTodoList });
              setDescription('');
            }
          }
        }}
      />
    </>
  );
};

export default TodoListView;
