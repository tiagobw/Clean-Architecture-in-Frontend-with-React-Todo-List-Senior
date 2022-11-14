import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TodoHttpGateway from './gateways/TodoHttpGateway';
import './index.css';
import AxiosAdapter from './infra/AxiosAdapter';

const baseUrl = 'http://localhost:3000/todos';
const axiosAdapter = new AxiosAdapter();
const todoGateway = new TodoHttpGateway(axiosAdapter, baseUrl);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App todoGateway={todoGateway} />
  </React.StrictMode>,
);
