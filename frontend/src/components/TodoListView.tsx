import { useCallback, useEffect, useState } from 'react';
import Observer from '../entities/Observer';
import TodoList from '../entities/TodoList';
import TodoGateway from '../gateways/TodoGateway';

type TodoListViewProps = {
  todoGateway: TodoGateway;
};

const TodoListView = ({ todoGateway }: TodoListViewProps) => {
  const [description, setDescription] = useState('');
  const [data, setData] = useState({
    todoList: new TodoList(),
  });

  useEffect(() => {
    (async () => {
      const todoList = await todoGateway.getTodos();

      todoList.register(
        new Observer('addItem', async function (item: any) {
          await todoGateway.addItem(item);
        }),
      );

      todoList.register(
        new Observer('removeItem', async function (item: any) {
          await todoGateway.removeItem(item.id);
        }),
      );

      todoList.register(
        new Observer('toggleDone', async function (item: any) {
          await todoGateway.updateItem(item);
        }),
      );

      setData({ todoList });
    })();
  }, []);

  return (
    <>
      {data?.todoList?.items?.length === 0 && <div>No Item</div>}
      <span data-testid='completed'>{`${
        data?.todoList?.getCompleted?.() ?? 0
      }%`}</span>
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
