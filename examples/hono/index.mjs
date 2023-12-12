import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createApp, createModule, createRouter, route } from 'nixle';
import { honoProvider } from '@nixle/hono';

const usersRouter = createRouter('/users', () => [route.get('/', () => 'Hello Hono!')]);
const usersModule = createModule({
  routers: [usersRouter],
});
const { app } = createApp({
  provider: honoProvider(new Hono()),
  modules: [usersModule],
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
