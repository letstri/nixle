# Fastify

To use Fastify with Nixle, you need to install the `@nixle/fastify` package.

## Install

::: code-group

```sh [npm]
npm i @nixle/fastify
```

```sh [pnpm]
pnpm i @nixle/fastify
```

```sh [yarn]
yarn add @nixle/fastify
```

```sh [bun]
bun i @nixle/fastify
```

:::

## Usage

```ts
const fastify = require('fastify');
const { createApp, createModule, createRouter } = require('nixle');
const { fastifyProvider } = require('@nixle/fastify');

const app = fastify();

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello Fastify!';
    },
  },
]);
const usersModule = createModule({
  routers: [usersRouter],
});
const server = createApp(fastifyProvider(app), {
  modules: [usersModule],
});

server.listen({ port: 4000 });
```

---

[Example](https://github.com/letstri/nixle/tree/main/examples/fastify)
