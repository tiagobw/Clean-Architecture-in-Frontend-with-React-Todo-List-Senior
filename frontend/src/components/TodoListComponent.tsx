import { useState } from 'react';
import TodoList from '../entities/TodoList';

type TodoListComponentProps = {
  todoList: TodoList | null;
};

const TodoListComponent = ({ todoList }: TodoListComponentProps) => {
  const [description, setDescription] = useState('');

  return (
    <>
      {todoList?.items?.length === 0 && <div>No Item</div>}
      <span data-testid='completed'>{`${
        todoList?.getCompleted?.() ?? 0
      }%`}</span>
      {todoList?.items?.map((item: any) => (
        <div key={item.id}>
          <span style={{ textDecoration: item.done ? 'line-through' : '' }}>
            {item.description}
          </span>
          <button onClick={() => todoList?.toggleDone(item)}>
            Done/Undone
          </button>
          <button onClick={() => todoList?.removeItem(item)}>Remove</button>
        </div>
      ))}
      <hr />
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyUp={async (e) => {
          if (e.key === 'Enter') {
            const item = await todoList?.addItem(description);
            if (item) setDescription('');
          }
        }}
      />
    </>
  );
};

export default TodoListComponent;
