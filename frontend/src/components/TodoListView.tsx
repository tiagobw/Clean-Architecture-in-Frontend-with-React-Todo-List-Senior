import TodoGateway from '../gateways/TodoGateway';
import { useTodoList } from '../hooks/useTodoList';
import TodoListComponent from './TodoListComponent';

type TodoListViewProps = {
  todoGateway: TodoGateway;
};

const TodoListView = ({ todoGateway }: TodoListViewProps) => {
  const { todoList } = useTodoList(todoGateway);

  return <TodoListComponent todoList={todoList} />;
};

export default TodoListView;
