---
outline: deep
---

# CORS

In nearest future, we won't implement CORS support as separate plugin. Instead, you should use CORS plugin depends on framework you use.

## Example

For example if you use [Fastify](/providers/fastify) provider, you can use [@fastify/cors](https://github.com/fastify/fastify-cors) plugin:

```ts
import fastify from 'fastify';
import cors from '@fastify/cors';
import { createApp } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const fastifyApp = fastify();

fastifyApp.register(cors, {
  // CORS options
});

const { app } = createApp({
  provider: fastifyProvider(fastifyApp),
});

app.listen({ port: 3000 });
```
