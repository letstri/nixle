---
outline: deep
next:
  text: 'Nuxt'
  link: '/providers/nuxt'
---

# Providers

When making HTTP requests, we leverage existing frameworks to avoid common mistakes and take advantage of their main functionality, such as `path` and `query` parameters.

To prevent repetitive code duplication across different frameworks, we have developed a set of providers. These providers help minimize the amount of copy-pasted code and promote code reusability.

## Switch

You can easily switch between providers by setting the `provider` option in the `createApp` function.

```ts
import { createApp } from 'nixle';
import { yourProvider } from '@nixle/provider-name';

createApp({
  provider: yourProvider(),
});
```

## Accessing the Framework

Each provider returns an instance of the framework it is built for. This means that you can continue using the framework as usual. For example, if you are using Express, you can add plugins, middlewares, or routes just like you normally would.

::: tip
Use it only when Nixle does not provide the functionality you need.
:::

```ts
import express from 'express';
import cors from 'cors';
import { createApp } from 'nixle';
import { expressProvider } from '@nixle/express';

const expressApp = express();

expressApp.use(cors());

const { app } = createApp({
  provider: expressProvider(expressApp),
});

// Not recommended
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Available Providers

- [Nuxt](/providers/nuxt)
- [Express](/providers/express)
- [Fastify](/providers/fastify)
- [Elysia (Bun)](/providers/elysia)
- [Hono](/providers/hono)
