<h1 align="center">
  <a href="https://scalex.letstri.dev" alt="ScaleX site">ScaleX</a>
</h1>
<p align="center">
  <b>Universal server-side architectural framework.<br/>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/scalex">
    <img src="https://img.shields.io/npm/v/scalex.svg">
  </a>
  <a href="https://scalex.letstri.dev">
    <img src="https://img.shields.io/badge/you_want-this-blue">
  </a>
</p>

## Installation

```bash
npm install scalex
```

## Usage

Base setup for each provider.

```ts
const usersRouter = createRouter('users', () => [
  {
    path: '/',
    method: 'get',
    handler() {
      return 'Hello from provider!';
    },
  },
]);

const usersModule = createModule({
  routers: [usersRouter],
});
```

### [Nuxt](https://github.com/letstri/scalex/tree/main/examples/nuxt)

```ts
import { createApp, createRouter, createModule, nitroProvider } from 'scalex';

export default defineNitroPlugin((nitroApp) => {
  createApp(nitroProvider(nitroApp), {
    modules: [usersModule],
  });
});
```

### [Express](https://github.com/letstri/scalex/tree/main/examples/express)

```ts
const express = require('express');
const { createApp, createRouter, createModule, expressProvider } = require('scalex');

const app = express();

const server = createApp(expressProvider(app), {
  modules: [usersModule],
});

server.listen(4000);
```

### [Elysia (Bun)](https://github.com/letstri/scalex/tree/main/examples/elysia)

```ts
import { Elysia } from 'elysia';
import { createApp, createModule, createRouter, elysiaProvider } from 'scalex';

const app = new Elysia();

const server = createApp(elysiaProvider(app), {
  modules: [usersModule],
});

server.listen(4000);
```

## Author

© [letstri](https://letstri.dev), released under the [MIT](https://github.com/letstri/scalex/blob/main/LICENSE) license.
