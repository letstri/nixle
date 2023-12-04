---
outline: deep
---

# Express

To use Express as the main provider with Nixle, you need to install the `@nixle/express` package. This package provides the necessary functionality for integrating Express into your Nixle application.

## Install

You can install the `@nixle/express` package using npm, pnpm, yarn, or bun:

::: code-group

```sh [npm]
npm i @nixle/express
```

```sh [pnpm]
pnpm add @nixle/express
```

```sh [yarn]
yarn add @nixle/express
```

```sh [bun]
bun i @nixle/express
```

:::

## Setup

```ts
import { createApp, createModule, createRouter } from 'nixle';
import { expressProvider } from '@nixle/express';

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello Express!';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const server = createApp({
  provider: expressProvider(),
  modules: [usersModule],
});

server.listen(4000);
```

---

[Example](https://github.com/letstri/nixle/blob/main/examples/express/index.mjs)
