import { render, waitFor } from '@testing-library/react';
import TodoListView from '../components/TodoListView';
import TodoHttpGateway from '../gateways/TodoHttpGateway';
import TodoMemoryGateway from '../gateways/TodoMemoryGateway';
import AxiosAdapter from '../infra/AxiosAdapter';

test('Deve testar a tela de todo list', async function () {
  // const baseUrl = 'http://localhost:3000';
  // const httpClient = new AxiosAdapter();
  // const todoGateway = new TodoHttpGateway(httpClient, baseUrl);
  const todoGateway = new TodoMemoryGateway();
  const wrapper = render(<TodoListView todoGateway={todoGateway} />);

  await waitFor(() => {
    expect(wrapper.getByTestId('completed').innerHTML).toBe('33%');
  });
});

export {};
