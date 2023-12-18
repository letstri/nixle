import express from 'express';
import { createApp, createModule, createRouter, createService } from 'nixle';
import { expressProvider } from '@nixle/express';

const usersService = createService(({ log }) => {
  const create = async () => {
    log.info('Creating user');

    return {};
  };

  return {
    create,
  };
});

const usersRouter = createRouter('/user', {
  services: {
    users: usersService,
  },
  routes: ({ route }, { users }) => [
    route.get('/', {
      handler: () => users.create(),
    }),
  ],
});

const usersModule = createModule({
  routers: [usersRouter],
});

const { app } = createApp({
  provider: expressProvider(express()),
  modules: [usersModule],
});

app.listen(4000);
