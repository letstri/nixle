---
outline: deep
---

# Create a custom provider

If our list of providers does not include the one you need, you can create your own custom provider. An example can be found in our repository, such as [fastify](https://github.com/letstri/nixle/blob/main/packages/fastify/src/index.ts).

In short, you need to import the `createProvider` function from `nixle` and call it with the required fields.

For TypeScript, you should extend the `Nixle.Provider`, `Nixle.Request`, and `Nixle.Response` interfaces to add your own types.

```ts
import {
  createProvider,
  type RouteHandlerContext,
  type GlobalMiddlewareHandlerContext,
} from 'nixle';

declare global {
  namespace Nixle {
    interface Provider extends YourProvider {}
    interface Request extends YourRequest {}
    interface Response extends YourResponse {}
  }
}

const provider = createProvider((app) => {
  return {
    app,
    globalMiddleware: (middleware) =>
      app.use(async (request, response, next) => {
        const formattedContext: GlobalMiddlewareHandlerContext = {};

        await middleware(formattedContext);

        next();
      }),
    createRoute: ({ method, path, handler }) =>
      app[method](path, async (request, response) => {
        const formattedContext: RouteHandlerContext = {};

        return handler(formattedContext);
      }),
  };
});
```
