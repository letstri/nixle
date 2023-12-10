---
outline: deep
---

# Fastify

To use Fastify as the main provider with Nixle, you need to install the `@nixle/fastify` package. This package provides the necessary functionality for integrating Fastify into your Nixle application.

## Install

You can install the `@nixle/fastify` package using npm, pnpm, yarn, or bun:

::: code-group

```sh [npm]
npm i @nixle/fastify
```

```sh [pnpm]
pnpm add @nixle/fastify
```

```sh [yarn]
yarn add @nixle/fastify
```

```sh [bun]
bun i @nixle/fastify
```

:::

## Setup

```ts
import fastify from 'fastify';
import { createApp, createModule, createRouter, route } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const usersRouter = createRouter('/users', () => [route.get('/', () => 'Hello Fastify!')]);
const usersModule = createModule({
  routers: [usersRouter],
});
const { app } = createApp({
  provider: fastifyProvider(fastify()),
  modules: [usersModule],
});

app.listen({ port: 4000 });
```

---

[Example](https://github.com/letstri/nixle/blob/main/examples/fastify/index.mjs)
