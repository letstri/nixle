---
outline: deep
---

# Create a custom provider

If our list of providers does not include the one you need, you can create your own custom provider. An example can be found in our repository, such as [fastify](https://github.com/letstri/nixle/blob/main/packages/fastify/src/index.ts).

In short, you need to import the `createProvider` function from `nixle` and call it with the required fields.

For TypeScript, you should extend the `Nixle.Provider`, `Nixle.Request`, and `Nixle.Response` interfaces to add your own types.

```ts
import { createProvider, type RouteHandlerContext } from 'nixle';

declare global {
  namespace Nixle {
    interface Provider extends YourProvider {}
    interface Request extends YourRequest {}
    interface Response extends YourResponse {}
  }
}

const provider = createProvider((app) => {
  const formatHandler = (context): RouteHandlerContext => {};

  return {
    app,
    createMiddleware: (handler) => {
      app.beforeEach(async (context) => {
        const response = await handler(formatHandler(context));

        if (response) {
          return response;
        }
      });
    },
    createRoute: ({ method, path, middleware, handler }) => {
      if (middleware) {
        const response = await middleware(formatHandler(context));

        if (response) {
          return response;
        }
      }

      return handler(formatHandler(context));
    },
  };
});
```
