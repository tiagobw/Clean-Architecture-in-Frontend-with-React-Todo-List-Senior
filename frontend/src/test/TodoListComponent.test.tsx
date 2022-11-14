import { render, waitFor, prettyDOM } from '@testing-library/react';
import TodoListComponent from '../components/TodoListComponent';
import TodoList from '../entities/TodoList';

test('Deve testar a tela de todo list', async function () {
  const todoList = new TodoList();
  todoList.addItem('a');
  todoList.addItem('b');
  todoList.addItem('c');

  const wrapper = render(<TodoListComponent todoList={todoList} />);
  console.log(prettyDOM(wrapper.container));

  await waitFor(() => {
    expect(wrapper.getByTestId('completed').innerHTML).toBe('0%');
  });
});

export {};
