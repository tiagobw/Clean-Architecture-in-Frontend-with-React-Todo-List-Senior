import { useEffect, useState } from 'react';
import axios from 'axios';

function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}

const TodoListView = () => {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState<
    { id: string; description: string; done: boolean }[]
  >([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:3000/todos');
      const fetchedTodos = response.data;
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
    await axios.post('http://localhost:3000/todos', item);
  }

  async function removeItem(item: any) {
    setTodos((previousTodos) => {
      const newTodos = [...previousTodos];
      newTodos.splice(todos.indexOf(item), 1);
      return newTodos;
    });
    await axios.delete(`http://localhost:3000/todos/${item.id}`);
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
    await axios.put(`http://localhost:3000/todos/${item.id}`, toggledItem);
  }

  return (
    <>
      {todos.length === 0 && 'No Item'}
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
