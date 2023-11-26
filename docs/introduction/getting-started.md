---
outline: deep
---

# Getting Started

## Installation

::: code-group

```sh [npm]
npm i scalex
```

```sh [pnpm]
pnpm i scalex
```

```sh [yarn]
yarn add scalex
```

```sh [bun]
bun i scalex
```

:::

## Quick Start

### Create base

```ts
import { createModule, createRouter } from 'scalex';

const usersModule = createModule({
  routers: [
    createRouter('users', () => [
      {
        path: '/',
        method: 'GET',
        handler() {
          return 'Hello World!';
        },
      },
    ]),
  ],
});
```

### Choose a provider

::: code-group

```ts [Nuxt]
import { nitroProvider } from 'scalex';
import { usersModule } from './usersModule';

export default defineNitroPlugin((nitroApp) => {
  createApp(nitroProvider(nitroApp), {
    modules: [usersModule],
  });
});
```

```ts [Express]
const express = require('express');
const { expressProvider } = require('scalex');
const { usersModule } = require('./usersModule');

const app = express();

const server = createApp(expressProvider(app), {
  modules: [usersModule],
});

server.listen(4000);
```

```ts [Fastify]
const fastify = require('fastify');
const { fastifyProvider } = require('scalex');
const { usersModule } = require('./usersModule');

const app = fastify();

const server = createApp(fastifyProvider(app), {
  modules: [usersModule],
});

server.listen({ port: 4000 });
```

```ts [Elysia]
import { Elysia } from 'elysia';
import { elysiaProvider } from 'scalex';
import { usersModule } from './usersModule';

const app = new Elysia();

const server = createApp(elysiaProvider(app), {
  modules: [usersModule],
});

server.listen(4000);
```

:::

[Or create your own provider.](http://localhost:5173/providers/custom.html)

### Try it

```ts
const data = fetch('http://localhost:4000/users').then((res) => res.text());

console.log(data); // Hello World!
```
