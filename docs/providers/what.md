---
outline: deep
next:
  text: 'Nitro (Nuxt)'
  link: '/providers/nitro'
---

# Providers

When making HTTP requests, we leverage existing frameworks to avoid common mistakes and take advantage of their main functionality, such as `path` and `query` parameters.

To prevent repetitive code duplication across different frameworks, we have developed a set of providers. These providers help minimize the amount of copy-pasted code and promote code reusability.

## Switch

You can easily switch between providers by setting the `provider` option in the `createApp` function.

```ts
import { createApp } from 'nixle';
import { providerNameProvider } from '@nixle/{provider-name}';

createApp({
  provider: providerNameProvider(),
});
```

## Available Providers

- [Nitro (Nuxt)](/providers/nitro)
- [Express](/providers/express)
- [Fastify](/providers/fastify)
- [Elysia (Bun)](/providers/elysia)
