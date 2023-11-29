# Elysia

To use Elysia with Nixle, you need to install the `@nixle/elysia` package.

## Install

::: code-group

```sh [npm]
npm i @nixle/elysia
```

```sh [pnpm]
pnpm i @nixle/elysia
```

```sh [yarn]
yarn add @nixle/elysia
```

```sh [bun]
bun i @nixle/elysia
```

:::

## Usage

```ts
import { Elysia } from 'elysia';
import { createApp, createModule, createRouter } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';

const app = new Elysia();

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello Elysia!';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const server = createApp({
  provider: elysiaProvider(app),
  modules: [usersModule],
});

server.listen(4000);
```

---

[Example](https://github.com/letstri/nixle/tree/main/examples/elysia)
