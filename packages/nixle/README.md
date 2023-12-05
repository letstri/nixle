<p align="center">
  <a href="https://nixle.letstri.dev" target="_blank" rel="noopener noreferrer">
    <img height="50" src="https://nixle.letstri.dev/logo-with-text.svg" alt="Nixle logo">
  </a>
</p>
<p align="center">
  Universal server-side framework.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nixle"><img src="https://img.shields.io/npm/v/nixle.svg?style=for-the-badge"></a>
  <a href="https://nixle.letstri.dev"><img src="https://img.shields.io/badge/you_want-nixle-blue?style=for-the-badge"></a>
</p>

## Installation

```bash
npm install nixle
```

## Usage

Base setup for each provider.

```ts
const usersRouter = createRouter('/users', () => [
  {
    path: '/',
    handler() {
      return 'Hello from provider!';
    },
  },
]);

const usersModule = createModule({
  routers: [usersRouter],
});
```

### [Nuxt](https://github.com/letstri/nixle/tree/main/examples/nuxt)

```ts
import { createApp, createRouter, createModule } from 'nixle';
import { nitroProvider } from '@nuxt/nitro';

export default defineNitroPlugin((nitroApp) => {
  createApp({
    provider: nitroProvider(nitroApp),
    modules: [usersModule],
  });
});
```

### [Express](https://github.com/letstri/nixle/tree/main/examples/express)

```ts
const express = require('express');
const { createApp, createRouter, createModule } = require('nixle');
const { expressProvider } = require('@nixle/express');

const app = express();

const server = createApp({
  provider: expressProvider(app),
  modules: [usersModule],
});

server.listen(4000);
```

### [Elysia (Bun)](https://github.com/letstri/nixle/tree/main/examples/elysia)

```ts
import { Elysia } from 'elysia';
import { createApp, createModule, createRouter } from 'nixle';
import { elysiaProvider } from '@nixle/elysia';

const app = new Elysia();

const server = createApp({
  provider: elysiaProvider(app),
  modules: [usersModule],
});

server.listen(4000);
```

## Author

© [letstri](https://letstri.dev), released under the [MIT](https://github.com/letstri/nixle/blob/main/LICENSE) license.
