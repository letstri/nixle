const express = require('express');
const { createApp, createModule, createRouter } = require('nixle');
const { expressProvider } = require('@nixle/express');

const app = express();

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello Express!';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const server = createApp({
  provider: expressProvider(app),
  modules: [usersModule],
});

server.listen(4000);
