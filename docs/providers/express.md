# Express

To use Express with Nixle, you need to install the `@nixle/express` package.

## Install

::: code-group

```sh [npm]
npm i @nixle/express
```

```sh [pnpm]
pnpm i @nixle/express
```

```sh [yarn]
yarn add @nixle/express
```

```sh [bun]
bun i @nixle/express
```

:::

## Usage

```ts
const express = require('express');
const { createApp, createModule, createRouter } = require('nixle');
const { expressProvider } = require('@nixle/express');

const app = express();

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
const server = createApp(expressProvider(app), {
  modules: [usersModule],
});

server.listen(4000);
```

---

[Example](https://github.com/letstri/nixle/tree/main/examples/express)
