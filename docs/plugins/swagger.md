---
outline: deep
---

# Swagger

In nearest future, we won't implement Swagger support as separate plugin. Instead, you should use Swagger plugin depends on framework you use.

## Example

For example if you use [Fastify](/providers/fastify) provider, you can use [@fastify/swagger](https://github.com/fastify/fastify-swagger) plugin:

```ts
import fastify from 'fastify';
import swagger from '@fastify/swagger';
import { createApp } from 'nixle';
import { fastifyProvider } from '@nixle/fastify';

const fastifyApp = fastify();

fastifyApp.register(swagger, {
  swagger: {
    // Swagger options
  },
});

const { app } = createApp({
  provider: fastifyProvider(fastifyApp),
});

app.listen({ port: 3000 });
```
