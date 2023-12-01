---
outline: deep
---

# Create a custom provider

If our list of providers does not include the one you need, you can create your own custom provider. An example can be found in our repository, such as [fastify](https://github.com/letstri/nixle/blob/main/packages/fastify/src/index.ts).

In short, you need to import the `createProvider` function from `nixle` and call it with the required fields.

<!-- prettier-ignore -->
```js
import { createProvider } from 'nixle';

const provider = createProvider<YourApp>((app) => {
  return {
    app,
    request: (method, path, handler) =>
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
