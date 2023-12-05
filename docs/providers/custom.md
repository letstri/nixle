---
outline: deep
---

# Create a custom provider

If our list of providers does not include the one you need, you can create your own custom provider. An example can be found in our repository, such as [fastify](https://github.com/letstri/nixle/blob/main/packages/fastify/src/index.ts).

In short, you need to import the `createProvider` function from `nixle` and call it with the required fields.

For TypeScript, you should extend the `Nixle.Provider`, `Nixle.Request`, and `Nixle.Response` interfaces to add your own types.

```ts
import { createProvider } from 'nixle';

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
    createRoute: (method, path, handler) =>
      app.router[method](path, (options) => {
        return handler({
          request: options.req,
          response: options.res,
          params: options.params || {},
          query: options.query || {},
          setStatusCode: (code) => options.setStatusCode(code),
          setHeader: (key, value) => options.setHeader(key, value),
          getHeader: (key) => options.getHeader(key) || null,
          setCookie: (name, value, options) => options.setCookie(name, value, options),
          getCookie: (name) => options.getCookie(event, name) || null,
        });
      }),
  };
});
```
