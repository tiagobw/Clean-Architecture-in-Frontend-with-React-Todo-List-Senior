import TodoList from '../entities/TodoList';
import TodoGateway from './TodoGateway';

export default class TodoMemoryGateway implements TodoGateway {
  constructor(readonly todoList: TodoList) {
    this.todoList = todoList;
    this.todoList.items = [
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
    ];
  }

  async getTodos(): Promise<any> {
    return this.todoList;
  }

  async addItem(item: any): Promise<any> {
    this.todoList.items.push(item);
  }

  async updateItem(item: any): Promise<any> {
    const todo = this.todoList.items.find((todo) => todo.id === item.id);
    if (todo) todo.done = item.done;
  }

  async removeItem(id: string): Promise<any> {
    const todo = this.todoList.items.find((todo) => todo.id === id);
    if (todo) this.todoList.items.splice(this.todoList.items.indexOf(todo), 1);
  }

  generateId() {
    return 'id' + Math.random().toString(16).slice(2);
  }
}
