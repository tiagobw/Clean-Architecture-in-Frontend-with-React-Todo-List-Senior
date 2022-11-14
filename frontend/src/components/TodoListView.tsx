import { useEffect, useRef, useState } from 'react';
import Observer from '../entities/Observer';
import TodoList from '../entities/TodoList';
import TodoGateway from '../gateways/TodoGateway';

type TodoListViewProps = {
  todoGateway: TodoGateway;
};

const TodoListView = ({ todoGateway }: TodoListViewProps) => {
  const [description, setDescription] = useState('');
  const [, setItems] = useState<any[]>([]);
  const todoListRef = useRef<TodoList | null>(null);

  const handleUpdateItems = () => {
    if (todoListRef.current) {
      setItems([...todoListRef.current.items]);
    }
  };

  useEffect(() => {
    (async () => {
      todoListRef.current = await todoGateway.getTodos();

      todoListRef.current.register(
        new Observer('addItem', async function (item: any) {
          await todoGateway.addItem(item);
          handleUpdateItems();
          setDescription('');
        }),
      );

      todoListRef.current.register(
        new Observer('removeItem', async function (item: any) {
          await todoGateway.removeItem(item.id);
          handleUpdateItems();
        }),
      );

      todoListRef.current.register(
        new Observer('toggleDone', async function (item: any) {
          await todoGateway.updateItem(item);
          handleUpdateItems();
        }),
      );

      handleUpdateItems();
    })();
  }, []);

  return (
    <>
      {todoListRef?.current?.items?.length === 0 && <div>No Item</div>}
      <span data-testid='completed'>{`${
        todoListRef.current?.getCompleted?.() ?? 0
      }%`}</span>
      {todoListRef?.current?.items?.map((item: any) => (
        <div key={item.id}>
          <span style={{ textDecoration: item.done ? 'line-through' : '' }}>
            {item.description}
          </span>
          <button onClick={() => todoListRef?.current?.toggleDone(item)}>
            Done/Undone
          </button>
          <button onClick={() => todoListRef?.current?.removeItem(item)}>
            Remove
          </button>
        </div>
      ))}
      <hr />
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            todoListRef?.current?.addItem(description);
          }
        }}
      />
    </>
  );
};

export default TodoListView;
