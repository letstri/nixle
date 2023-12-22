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

<!-- prettier-ignore-start -->
```ts
import express from 'express';
import { createApp, createRouter } from 'nixle';
import { expressProvider } from '@nixle/express';

const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello Express!'),
]);

const { app } = createApp({
  provider: expressProvider(express()),
  routers: [usersRouter],
});

app.listen(4000);
```
<!-- prettier-ignore-end -->

---

[Example](https://github.com/letstri/nixle/blob/main/examples/express/index.mjs)
