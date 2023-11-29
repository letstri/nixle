<p align="center">
  <a href="https://nixle.letstri.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://nixle.letstri.dev/logo.svg" alt="Nixle logo">
  </a>
</p>
<br/>
<h1 align="center">
  <a href="https://nixle.letstri.dev" alt="Nixle site">Nixle</a>
</h1>
<p align="center">
  <strong>Universal server-side architectural framework.</strong>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nixle">
    <img src="https://img.shields.io/npm/v/nixle.svg">
  </a>
  <a href="https://nixle.letstri.dev">
    <img src="https://img.shields.io/badge/you_want-this-blue">
  </a>
</p>

## Installation

```bash
npm install nixle
```

## Usage

Base setup for each provider.

```ts
const usersRouter = createRouter('users', () => [
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
import { nitroProvider } from '@nixle/nitro';

export default defineNitroPlugin((nitroApp) => {
  createApp(nitroProvider(nitroApp), {
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

const server = createApp(expressProvider(app), {
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

const server = createApp(elysiaProvider(app), {
  modules: [usersModule],
});

server.listen(4000);
```

## Author

© [letstri](https://letstri.dev), released under the [MIT](https://github.com/letstri/nixle/blob/main/LICENSE) license.
