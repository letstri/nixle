---
outline: deep
---

# Hono

To use Hono as the main provider with Nixle, you need to install the `@nixle/hono` package. This package provides the necessary functionality for integrating Hono into your Nixle application.

## Install

You can install the `@nixle/hono` package using npm, pnpm, yarn, or bun:

::: code-group

```sh [npm]
npm i @nixle/hono
```

```sh [pnpm]
pnpm add @nixle/hono
```

```sh [yarn]
yarn add @nixle/hono
```

```sh [bun]
bun i @nixle/hono
```

:::

## Setup

<!-- prettier-ignore-start -->
```ts
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { createApp, createRouter } from 'nixle';
import { honoProvider } from '@nixle/hono';

const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello Hono!'),
]);

const { app } = createApp({
  provider: honoProvider(new Hono()),
  routers: [usersRouter],
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
```
<!-- prettier-ignore-end -->

---

[Example](https://github.com/letstri/nixle/blob/main/examples/hono/index.ts)
