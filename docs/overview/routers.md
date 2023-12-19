---
outline: deep
---

# Routers

Routers are a fundamental and essential part of the Nixle framework. They allow you to register routes and define the logic to handle incoming requests.

## Usage

To create a router, you need to use the `createRouter` function.

<!-- prettier-ignore -->
```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter(({ route }) => [
  route.get('/', () => 'Hello World!'),
]);
```

<!-- prettier-ignore-end -->

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

## Routers

### Simple router

You can register simple routes by using the `route` object. The `route` object provides methods for different HTTP methods such as `get`, `post`, `delete`, etc. You can define the route path and the corresponding handler function to handle incoming requests for that route.

<!-- prettier-ignore -->
```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter(({ route }) => [
  route.get('/', () => 'Hello World!'),
]);
```

### Routes with base path

You can add a base path to a router by passing it as the first argument to the `createRouter` function.

```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello World!'),
]);
```

<!-- prettier-ignore-end -->

### Routes and services

You can use services in routes by passing them to the `services` object when creating a router.

```ts{3-9,12-14}
import { createRouter, createService } from 'nixle';

const usersService = createService(() => {
  const getUsers = () => {
    return ['John', 'Jane'];
  };

  return { getUsers };
});

export const usersRouter = createRouter('/users', {
  services: {
    usersService,
  },
  routes: ({ route }, { usersService }) => [
    route.get('/', () => {
      const users = await usersService.getUsers();

      return users;
    }),
  ],
});
```

## Routes

### Simple route

Simple routes are the most common type of routes. They allow you to register a route and define the logic to handle incoming requests.

```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter(({ route }) => [route.get('/', () => 'Hello World!')]);
```

### Route as an object

```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter(({ route }) => [
  route.get('/users', {
    handler: () => 'Hello World!',
  }),
]);
```

### Validation

You can validate the request body by using the `validate` method. For example, you can use the [`@nixle/zod`](/plugins/zod) plugin to validate the request information.

```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter(({ route, zodObject }) => [
  route.post('/users/:id', {
    paramsValidation: zodObject((z) => ({
      id: z.string(),
    })),
    queryValidation: zodObject((z) => ({
      page: z.string(),
    })),
    bodyValidation: zodObject((z) => ({
      name: z.string(),
    })),
    handler: () => 'Hello World!',
  }),
]);
```

### Parameters

In each route, you can use context parameters to get information about the request.

Available parameters:

- `params` - URL parameters (e.g. `/users/:id`)
- `body` - Request body (for now supports only JSON)
- `query` - Query parameters (e.g. `/users?name=John`)
- `url` - Request URL
- `method` - Request method
- `getCookie` - Function to get cookie
- `setCookie` - Function to set cookie
- `getHeader` - Function to get header
- `setHeader` - Function to set header
- `headers` - Request headers

```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter(({ route }) => [
  route.get(
    '/',
    ({ params, body, query, url, method, getCookie, setCookie, getHeader, setHeader, headers }) => {
      return 'Hello World!';
    },
  ),
]);
```

## Known issues

For now Nixle supports only JSON body. Support for other body types will be added in the future.
