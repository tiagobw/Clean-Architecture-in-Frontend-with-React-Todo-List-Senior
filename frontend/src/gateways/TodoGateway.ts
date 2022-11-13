import TodoList from '../entities/TodoList';

export default interface TodoGateway {
  getTodos(): Promise<TodoList>;
  addItem(item: any): Promise<any>;
  updateItem(item: any): Promise<any>;
  removeItem(id: string): Promise<any>;
}
