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

<!-- prettier-ignore-start -->
```ts
import fastify from 'fastify';
import { createApp, createRouter } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello Fastify!'),
]);

const { app } = createApp({
  provider: fastifyProvider(fastify()),
  routers: [usersRouter],
});

app.listen({ port: 4000 });
```
<!-- prettier-ignore-end -->

---

[Example](https://github.com/letstri/nixle/blob/main/examples/fastify/index.mjs)
