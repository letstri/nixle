---
outline: deep
---

# Getting Started

## Installation

::: code-group

```sh [npm]
npm i nixle
```

```sh [pnpm]
pnpm i nixle
```

```sh [yarn]
yarn add nixle
```

```sh [bun]
bun i nixle
```

:::

## Quick Start

### Create base

```ts
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
const express = require('express');
const { createApp } = require('nixle');
const { expressProvider } = require('@nixle/express');
const { usersModule } = require('./usersModule');

const app = express();

const server = createApp({
  provider: expressProvider(app),
  modules: [usersModule],
});

server.listen(4000);
```

```ts [Fastify]
const fastify = require('fastify');
const { createApp } = require('nixle');
const { fastifyProvider } = require('@nixle/fastify');
const { usersModule } = require('./usersModule');

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

[Or create your own provider.](/providers/custom)

### Try it

```ts
const data = fetch('http://localhost:4000/users').then((res) => res.text());

console.log(data); // Hello World!
```
