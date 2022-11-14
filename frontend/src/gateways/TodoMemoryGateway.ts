import Item from '../entities/Item';
import TodoList from '../entities/TodoList';
import TodoGateway from './TodoGateway';

export default class TodoMemoryGateway implements TodoGateway {
  todos: TodoList;

  constructor() {
    this.todos = new TodoList([
      new Item({
        description: 'Estudar TypeScript',
        done: true,
      }),
      new Item({
        description: 'Fazer a prova online',
        done: false,
      }),
      new Item({
        description: 'Cortar a grama',
        done: false,
      }),
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
}
