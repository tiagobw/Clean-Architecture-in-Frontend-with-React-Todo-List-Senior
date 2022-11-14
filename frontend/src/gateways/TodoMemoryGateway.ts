import TodoList from '../entities/TodoList';
import TodoGateway from './TodoGateway';

export default class TodoMemoryGateway implements TodoGateway {
  todos: TodoList;

  constructor() {
    this.todos = new TodoList([
      {
        id: this.generateId(),
        description: 'Estudar TypeScript',
        done: true,
      },
      {
        id: this.generateId(),
        description: 'Fazer a prova online',
        done: false,
      },
      {
        id: this.generateId(),
        description: 'Cortar a grama',
        done: false,
      },
    ]);
  }

  async getTodos(): Promise<any> {
    return this.todos;
  }

  async addItem(item: any): Promise<any> {
    this.todos.addItem(item.description);
  }

  async updateItem(item: any): Promise<any> {
    this.todos.toggleDone(item);
  }

  async removeItem(id: string): Promise<any> {
    this.todos.removeItem({ id });
  }

  generateId() {
    return 'id' + Math.random().toString(16).slice(2);
  }
}
