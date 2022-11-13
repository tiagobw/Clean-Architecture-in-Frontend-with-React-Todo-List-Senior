const App = () => {
  const todos: any = [];

  return <div>{JSON.stringify(todos, null, 2)}</div>;
};

export default App;
