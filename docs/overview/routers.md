---
outline: deep
---

# Routers

Routers are second fundamental and essential part of the Nixle framework. With routers, you can register routes to answer requests with your logic.

## Usage

To create a router, you need to use the `createRouter` function. This function takes two arguments, which are a base path and a function that returns an array of routes.

```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter('/users', () => [
  {
    path: '/',
    handler() {
      return 'Hello World!';
    },
  },
]);
```

After that, you call the `createModule` function to create a module and register the router with the server.

```ts
import { createModule } from 'nixle';

export const usersModule = createModule({
  routers: [usersRouter],
});
```

And try to send a request to the `/users` path.

```ts
fetch('http://localhost:4000/users')
  .then((res) => res.text())
  .then(console.log);

// Hello World!
```
