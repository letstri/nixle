---
outline: deep
---

# App

App is the entry point of your application. It is a wrapper around the provider and provides a way to register modules.

## Usage

Create an app with the `createApp` function. This function takes a config object with the following properties:

- `globalPrefix` - A prefix that will be used for all routes.
- `provider` - A provider that will be used to create a store.
- `modules` - An array with modules.
- `logger` - A [consola](/overview/logger) config that will be used to update options of the logger.
- `env` - A [dotenv](/overview/env) config that will be used to load environment variables.
- `plugins` - An array of plugins that will be used to extend the app.

```ts
import { createApp } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';
import { usersModule } from './users';

export const app = createApp({
  globalPrefix: '/api',
  provider: fastifyProvider(),
  modules: [usersModule],
  logger: {
    level: 3,
  },
  env: {
    path: '.env',
  },
});
```

## Returns

The `createApp` function returns an object with the following properties:

- `app` - An instance of the app.
- `events` - An object with the following properties:
  - `on` - A function that takes an event name and a handler function.
  - `emit` - A function that takes an event name and an event data.
