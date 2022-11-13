import { useState } from 'react';

function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}

const App = () => {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([
    {
      id: generateId(),
      description: 'Estudar TypeScript',
      done: true,
    },
    {
      id: generateId(),
      description: 'Fazer a prova online',
      done: false,
    },
    {
      id: generateId(),
      description: 'Cortar a grama',
      done: false,
    },
  ]);

  function addItem(description: string) {
    if (!description) return;
    if (todos.some((item: any) => item.description === description)) return;
    if (todos.filter((item: any) => !item.done).length > 4) return;
    setTodos((previousTodos) => {
      return [
        ...previousTodos,
        {
          id: generateId(),
          description,
          done: false,
        },
      ];
    });
    setDescription('');
  }

  function removeItem(item: any) {
    setTodos((previousTodos) => {
      const newTodos = [...previousTodos];
      newTodos.splice(todos.indexOf(item), 1);
      return newTodos;
    });
  }

  function toggleDone(item: any) {
    setTodos((previousItems) => {
      return previousItems.map((previousItem) =>
        previousItem.id === item.id
          ? {
              id: previousItem.id,
              description: previousItem.description,
              done: !previousItem.done,
            }
          : previousItem,
      );
    });
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

export default App;
