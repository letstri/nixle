<p align="center">
  <a href="https://nixle.letstri.dev" target="_blank" rel="noopener noreferrer">
    <img height="50" src="https://nixle.letstri.dev/logo-with-text.svg" alt="Nixle logo">
  </a>
</p>
<p align="center">
  <strong>Universal server-side framework.</strong><br>Backend for everyone and everywhere.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nixle"><img src="https://img.shields.io/npm/v/nixle.svg?style=for-the-badge"></a>
  <a href="https://nixle.letstri.dev"><img src="https://img.shields.io/badge/you_want-nixle-blue?style=for-the-badge"></a>
</p>

## Overview

Nixle is a framework for building HTTP servers. It is designed to be simple, fast, and extensible. It is built on top of existing frameworks, such as Express, Fastify, and Nitro.

- ✨ Simple and intuitive API.
- 🚀 Supports multiple providers such as Express, Fastify, and Hono.
- 🌐 Supports SSR frameworks such as Nuxt.
- 💪 Incredible TypeScript support.
- 🎯 Easy to use and extend.

## Documentation

You can find the documentation [on the website](https://nixle.letstri.dev).

## Installation

```bash
npm install nixle
```

## Usage

To set up your app, use the `createApp` function. Create a module with the `createModule` function and import routes using the `createRouter` function. Additionally, you can create services with module-specific logic using the `createService` function.

```ts
import { createRouter, createService, createModule } from 'nixle';
import { zodPlugin } from '@nixle/zod';
import { ofetchPlugin } from '@nixle/ofetch';

declare global {
  namespace Nixle {
    interface Env {
      USERS_SERVICE: string;
    }
  }
}

const usersService = createService(({ log, env, ofetch }) => {
  const getUsers = async (limit: number) => {
    log.info('Getting users...');

    const users = await ofetch<{ name: string; email: string }[]>(`${env.USERS_SERVICE}/users`);

    log.success(`Got ${users.length} users`);

    return users;
  };

  return {
    getUsers,
  };
});

const usersRouter = createRouter('/users', {
  services: {
    usersService,
  },
  routes: ({ route, zodObject }, { usersService }) => [
    route.get('/', {
      queryValidation: zodObject({
        limit: zod.number().default(10),
      }).validate,
      handler: ({ query }) => {
        return usersService.getUsers(+query.limit);
      },
    }),
  ],
});

export const usersModule = createModule({
  plugins: [zodPlugin, ofetchPlugin()],
  routers: [usersRouter],
});
```

## Providers

We have several providers that you can use to create your app such as Nuxt, Express, Fastify, and Elysia (Bun). Choose the one that suits you best and install packages for it. More information about providers can be found in the [docs](https://nixle.letstri.dev/providers/what.html).

For example, if you want to use Fastify, install the `@nixle/fastify` package besides the `nixle` package:

```bash
npm install @nixle/fastify
```

Then, import the `fastifyProvider` function and pass it to the `createApp` function:

```ts
import fastify from 'fastify';
import { createApp, createRouter, createModule } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const server = createApp({
  provider: fastifyProvider(fastify()),
  modules: [usersModule],
});

server.listen({ port: 4000 });
```

## Author

© [letstri](https://letstri.dev), released under the [MIT](https://github.com/letstri/nixle/blob/main/LICENSE) license.
