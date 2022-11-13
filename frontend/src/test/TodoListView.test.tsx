import { render, waitFor } from '@testing-library/react';
import TodoListView from '../components/TodoListView';

test('Deve testar a tela de todo list', async function () {
  const wrapper = render(<TodoListView />);

  await waitFor(() => {
    expect(wrapper.getByTestId('completed').innerHTML).toBe('33%');
  });
});

export {};
