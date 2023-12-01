---
outline: deep
---

# Getting Started

Nixle is a framework for building HTTP servers. It is designed to be simple, fast, and extensible. It is built on top of existing frameworks, such as Express, Fastify, and Nitro.

## Installation

You can install the `nixle` package using npm, pnpm, yarn, or bun:

::: code-group

```sh [npm]
npm i nixle
```

```sh [pnpm]
pnpm add nixle
```

```sh [yarn]
yarn add nixle
```

```sh [bun]
bun i nixle
```

:::

## Quick Start

::: tip Compatibility Note
Nixle requires [Node.js](https://nodejs.org/en/) version 18+. 20+.
:::

### Create base

Before you can create a server, you need to create a base. A base is a collaboration of modules and routes that make up your server.

```ts
// usersModule.ts
import { createModule, createRouter } from 'nixle';

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello World!';
    },
  },
]);

const usersModule = createModule({
  routers: [usersRouter],
});
```

### Choose a provider

Each provider provides the same functionality, but with different frameworks. You can choose from the following providers:

::: code-group

```ts [Nuxt]
import { createApp } from 'nixle';
import { nitroProvider } from '@nixle/nitro';
import { usersModule } from './usersModule';

export default defineNitroPlugin((nitroApp) => {
  createApp({
    provider: nitroProvider(nitroApp),
    modules: [usersModule],
  });
});
```

```ts [Express]
import express from 'express';
import { createApp } from 'nixle';
import { expressProvider } from '@nixle/express';
import { usersModule } from './usersModule';

const app = express();

const server = createApp({
  provider: expressProvider(app),
  modules: [usersModule],
});

server.listen(4000);
```

```ts [Fastify]
import fastify from 'fastify';
import { createApp } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';
import { usersModule } from './usersModule';

const app = fastify();

const server = createApp({
  provider: fastifyProvider(app),
  modules: [usersModule],
});

server.listen({ port: 4000 });
```

```ts [Elysia]
import { Elysia } from 'elysia';
import { createApp } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';
import { usersModule } from './usersModule';

const app = new Elysia();

const server = createApp({
  provider: elysiaProvider(app),
  modules: [usersModule],
});

server.listen(4000);
```

:::

Or [create](/providers/custom) your own provider.

### Try it

After successfully creating the server, you can try it out to send a request to the server.

```ts
const data = fetch('http://localhost:4000/users').then((res) => res.text());

console.log(data); // Hello World!
```
