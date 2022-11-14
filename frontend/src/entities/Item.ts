type ConstructorParams = {
  id?: string;
  description: string;
  done?: boolean;
};

export default class Item {
  id: string;
  description: string;
  done: boolean;

  constructor({ id, description, done = false }: ConstructorParams) {
    if (id === undefined) this.id = generateId();
    else this.id = id;
    this.description = description;
    this.done = done;
  }
}

function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}
