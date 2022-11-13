import { render, screen } from '@testing-library/react';

import App from './App';

describe.skip('App', () => {
  it('renders headline', () => {
    render(<App />);

    screen.debug();

    // check if App components renders headline
  });
});
