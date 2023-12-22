import express from 'express';
import { createApp, createRouter, createService } from 'nixle';
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

const usersRouter = createRouter('/users', {
  services: {
    usersService,
  },
  routes: ({ route }, { usersService }) => [
    route.get('/', {
      handler: () => usersService.create(),
    }),
  ],
});

const { app } = createApp({
  provider: expressProvider(express()),
  routers: [usersRouter],
});

app.listen(4000);
