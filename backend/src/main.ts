import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const todos = [
  {
    id: generateId(),
    description: 'Estudar TypeScript',
    done: true,
  },
  {
    id: generateId(),
    description: 'Fazer a prova online',
    done: false,
  },
  {
    id: generateId(),
    description: 'Cortar a grama',
    done: false,
  },
];

app.get('/todos', function (req: Request, res: Response) {
  res.json(todos);
});

app.post('/todos', function (req: Request, res: Response) {
  todos.push(req.body);
  res.end();
});

app.delete('/todos/:id', function (req: Request, res: Response) {
  const todo = todos.find((todo) => todo.id === req.params.id);
  if (todo) todos.splice(todos.indexOf(todo), 1);
  res.end();
});

app.put('/todos/:id', function (req: Request, res: Response) {
  console.log('req:', req)
  const todo = todos.find((todo) => todo.id === req.params.id);
  if (todo) todo.done = req.body.done;
  res.end();
});

app.listen(3000);

function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}
