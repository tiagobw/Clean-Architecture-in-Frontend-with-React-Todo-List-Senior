import { prettyDOM, render, screen } from '@testing-library/react';
import TodoListView from '../components/TodoListView';

function sleep(mili: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, mili);
  });
}

test('Deve testar a tela de todo list', async function () {
  const wrapper = render(<TodoListView />);
  await sleep(100);
  console.log(prettyDOM(wrapper.container));
});

export {};
