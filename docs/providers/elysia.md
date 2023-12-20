---
outline: deep
---

# Elysia

To use Elysia as the main provider with Nixle, you need to install the `@nixle/elysia` package. This package provides the necessary functionality for integrating Elysia into your Nixle application.

## Install

You can install the `@nixle/elysia` package using npm, pnpm, yarn, or bun:

::: code-group

```sh [npm]
npm i @nixle/elysia
```

```sh [pnpm]
pnpm add @nixle/elysia
```

```sh [yarn]
yarn add @nixle/elysia
```

```sh [bun]
bun i @nixle/elysia
```

:::

## Setup

<!-- prettier-ignore-start -->
```ts
import { Elysia } from 'elysia';
import { createApp, createModule, createRouter } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';

const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello Elysia!'),
]);

const usersModule = createModule({
  routers: [usersRouter],
});

const { app } = createApp({
  provider: elysiaProvider(new Elysia()),
  modules: [usersModule],
});

app.listen(4000);
```
<!-- prettier-ignore-end -->

---

[Example](https://github.com/letstri/nixle/blob/main/examples/elysia/index.ts)
