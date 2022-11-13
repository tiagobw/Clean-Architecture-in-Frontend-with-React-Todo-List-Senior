import { useCallback, useEffect, useState } from 'react';
import TodoGateway from '../gateways/TodoGateway';

function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}

type TodoListViewProps = {
  todoGateway: TodoGateway;
};

const TodoListView = ({ todoGateway }: TodoListViewProps) => {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState<
    { id: string; description: string; done: boolean }[]
  >([]);

  useEffect(() => {
    (async () => {
      const fetchedTodos = await todoGateway.getTodos();
      setTodos(fetchedTodos);
    })();
  }, []);

  async function addItem(description: string) {
    if (!description) return;
    if (todos.some((item: any) => item.description === description)) return;
    if (todos.filter((item: any) => !item.done).length > 4) return;
    const item = {
      id: generateId(),
      description,
      done: false,
    };
    setTodos((previousTodos) => {
      return [...previousTodos, item];
    });
    setDescription('');
    await todoGateway.addItem(item);
  }

  async function removeItem(item: any) {
    setTodos((previousTodos) => {
      const newTodos = [...previousTodos];
      newTodos.splice(todos.indexOf(item), 1);
      return newTodos;
    });
    await todoGateway.removeItem(item.id);
  }

  async function toggleDone(item: any) {
    const toggledItem = {
      id: item.id,
      description: item.description,
      done: !item.done,
    };
    setTodos((previousItems) => {
      return previousItems.map((previousItem) =>
        previousItem.id === item.id ? toggledItem : previousItem,
      );
    });
    await todoGateway.updateItem(toggledItem);
  }

  const completed = useCallback(() => {
    const total = todos.length;
    const done = todos.filter((item: any) => item.done).length;
    return Math.round((done / total) * 100);
  }, [todos]);

  return (
    <>
      {todos.length === 0 && <div>No Item</div>}
      <span
        data-testid='completed'
        className='completed'
      >{`${completed()}%`}</span>
      {todos.map((item: any) => (
        <div key={item.id}>
          <span style={{ textDecoration: item.done ? 'line-through' : '' }}>
            {item.description}
          </span>
          <button onClick={() => toggleDone(item)}>Done/Undone</button>
          <button onClick={() => removeItem(item)}>Remove</button>
        </div>
      ))}
      <hr />
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') addItem(description);
        }}
      />
    </>
  );
};

export default TodoListView;
