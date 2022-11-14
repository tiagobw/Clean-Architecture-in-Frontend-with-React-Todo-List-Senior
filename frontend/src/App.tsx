import TodoListView from './components/TodoListView';
import TodoGateway from './gateways/TodoGateway';

type AppProps = {
  todoGateway: TodoGateway;
};

const App = ({ todoGateway }: AppProps) => {
  return <TodoListView todoGateway={todoGateway} />;
};

export default App;
