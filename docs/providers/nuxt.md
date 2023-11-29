---
title: Nuxt as backend framework
---

# Nuxt

To use Nuxt with Nixle, you need to install the `@nixle/nitro` package.

## Install

::: code-group

```sh [npm]
npm i @nixle/nitro
```

```sh [pnpm]
pnpm i @nixle/nitro
```

```sh [yarn]
yarn add @nixle/nitro
```

```sh [bun]
bun i @nixle/nitro
```

:::

## Usage

```ts
// server/plugins/nixle.ts
import { createApp, createRouter, createModule } from 'nixle';
import { nitroProvider } from '@nixle/nitro';

const usersRouter = createRouter('users', () => [
  {
    path: '/',
    handler() {
      return 'Hello Nuxt!';
    },
  },
]);

const usersModule = createModule({
  routers: [usersRouter],
});

export default defineNitroPlugin((nitroApp) => {
  createApp({
    provider: nitroProvider(nitroApp),
    modules: [usersModule],
  });
});
```

---

[Example](https://github.com/letstri/nixle/tree/main/examples/nuxt)
