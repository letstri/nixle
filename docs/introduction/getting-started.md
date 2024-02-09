---
outline: deep
---

# Getting Started

Nixle is a framework for building HTTP servers. It is designed to be simple, fast, and extensible. It is built on top of existing frameworks, such as Express, Fastify, and Nuxt.

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

Before you can create a server, you need to create a base. A base is a collection routes that form the foundation of your server. Once you have created a base, you can proceed to create [services](/overview/services) or explore other topics in the [Overview](/overview/app) section.

<!-- prettier-ignore-start -->
```ts
// usersRouter.ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello World!'),
]);
```
<!-- prettier-ignore-end -->

### Choose a provider

Each provider provides the same functionality, but with different frameworks. You can choose from the following providers:

::: code-group

```ts [Nuxt]
import { createApp } from 'nixle';
import { nitroProvider } from '@nixle/nitro';
import { usersRouter } from './usersRouter';

export default defineNitroPlugin((nitroApp) => {
  createApp({
    provider: nitroProvider(nitroApp),
    routers: [usersRouter],
  });
});
```

```ts [Express]
import express from 'express';
import { createApp } from 'nixle';
import { expressProvider } from '@nixle/express';
import { usersRouter } from './usersRouter';

const { app } = createApp({
  provider: expressProvider(express()),
  routers: [usersRouter],
});

app.listen(3000);
```

```ts [Fastify]
import fastify from 'fastify';
import { createApp } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';
import { usersRouter } from './usersRouter';

const { app } = createApp({
  provider: fastifyProvider(app),
  routers: [usersRouter],
});

app.listen({ port: 3000 });
```

```ts [Elysia]
import { Elysia } from 'elysia';
import { createApp } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';
import { usersRouter } from './usersRouter';

const { app } = createApp({
  provider: honoProvider(new Elysia()),
  routers: [usersRouter],
});

app.listen(3000);
```

```ts [Hono]
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createApp } from 'nixle';
import { honoProvider } from '@nixle/hono';
import { usersRouter } from './usersRouter';

const { app } = createApp({
  provider: honoProvider(app),
  routers: [usersRouter],
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
```

:::

Or [create](/providers/custom) your own provider.

### Try it

After successfully creating the server, you can try it out to send a request to the server.

```ts
const data = fetch('http://localhost:3000/users').then((res) => res.text());

console.log(data); // Hello World!
```

## Next Steps

Take a look at the [Overview](/overview/app) section to learn more about available features. To create clean and maintainable code you can use our services, which are described in the [Services](/overview/services) section. Also we have [logger](/overview/logger) and [plugins](/plugins/custom).
