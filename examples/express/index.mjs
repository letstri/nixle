import express from 'express';
import { createApp, createModule, createRouter } from 'nixle';
import { expressProvider } from '@nixle/express';

const usersRouter = createRouter('/users', ({ route }) => [route.get('/', () => 'Hello Express!')]);
const usersModule = createModule({
  routers: [usersRouter],
});
const { app } = createApp({
  provider: expressProvider(express()),
  modules: [usersModule],
});

app.listen(4000);
