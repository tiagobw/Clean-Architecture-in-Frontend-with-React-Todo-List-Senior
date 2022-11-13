import TodoListView from './components/TodoListView';
import TodoHttpGateway from './gateways/TodoHttpGateway';
import AxiosAdapter from './infra/AxiosAdapter';

const App = () => {
  const baseUrl = 'http://localhost:3000';
  const axiosAdapter = new AxiosAdapter();
  const todoGateway = new TodoHttpGateway(axiosAdapter, baseUrl);
  return <TodoListView todoGateway={todoGateway} />;
};

export default App;
