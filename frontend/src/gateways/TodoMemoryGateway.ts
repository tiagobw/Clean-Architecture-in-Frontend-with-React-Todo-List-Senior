import TodoGateway from './TodoGateway';

export default class TodoMemoryGateway implements TodoGateway {
  todos: any[];

  constructor() {
    this.todos = [
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
    return this.todos;
  }

  async addItem(item: any): Promise<any> {
    this.todos.push(item);
  }

  async updateItem(item: any): Promise<any> {
    const todo = this.todos.find((todo) => todo.id === item.id);
    if (todo) todo.done = item.done;
  }

  async removeItem(id: string): Promise<any> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) this.todos.splice(this.todos.indexOf(todo), 1);
  }

  generateId() {
    return 'id' + Math.random().toString(16).slice(2);
  }
}
