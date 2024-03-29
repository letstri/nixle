---
outline: deep
title: Nuxt as backend framework
---

# Nuxt

Nuxt uses [Nitro](https://nitro.unjs.io/) as the backend framework for building server-side applications.

To use Nitro as the main provider with Nixle, you need to install the `@nixle/nitro` package. This package provides the necessary functionality for integrating Nitro into your Nixle application.

## Install

You can install the `@nixle/nitro` package using npm, pnpm, yarn, or bun:

::: code-group

```sh [npm]
npm i @nixle/nitro
```

```sh [pnpm]
pnpm add @nixle/nitro
```

```sh [yarn]
yarn add @nixle/nitro
```

```sh [bun]
bun i @nixle/nitro
```

:::

## Setup

<!-- prettier-ignore-start -->
```ts
// server/plugins/nixle.ts
import { createApp, createRouter } from 'nixle';
import { nitroProvider } from '@nixle/nitro';

const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello Nuxt!'),
]);

export default defineNitroPlugin((nitroApp) => {
  createApp({
    provider: nitroProvider(nitroApp),
    routers: [usersRouter],
  });
});
```
<!-- prettier-ignore-end -->

---

[Example](https://github.com/letstri/nixle/tree/main/examples/nuxt)
