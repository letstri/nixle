const express = require('express');
const {
  createApp,
  expressProvider,
  createModule,
  createRouter,
} = require('../../');

const app = express();

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    method: 'get',
    handler() {
      return 'hello express';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const server = createApp(expressProvider(app), {
  modules: [usersModule],
});

server.listen(4000);
