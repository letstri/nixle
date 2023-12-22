---
outline: deep
---

# Routers

Routers are a fundamental and essential part of the Nixle framework. They allow you to register routes and define the logic to handle incoming requests.

::: tip
Nixle currently supports only JSON bodies. Support for other body types will be added in future updates.
:::

## Usage

To create a router, you need to use the `createRouter` function.

<!-- prettier-ignore -->
```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello World!'),
]);
```

<!-- prettier-ignore-end -->

Connect it to `createApp` and try to send a request to the `/users` path.

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

export const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => 'Hello World!'),
]);
```

### Route as an object

```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', {
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

export const usersRouter = createRouter('/users', ({ route }) => [
  route.get(
    '/',
    ({ params, body, query, url, method, getCookie, setCookie, getHeader, setHeader, headers }) => {
      return 'Hello World!';
    },
  ),
]);
```

### Validation

You can validate the request body by using the `validate` method. For example, you can use the [`@nixle/zod`](/plugins/zod) plugin to validate the request information.

```ts
import { createRouter } from 'nixle';

export const usersRouter = createRouter('/users', ({ route, zodObject }) => [
  route.post('/:id', {
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

### Middleware

You can use middleware to execute code before the route handler. Context parameters are the same as in the route handler.

```ts
import { createRouter, StatusCode, createError } from 'nixle';

export const usersRouter = createRouter('/users', ({ route, log }) => [
  route.get('/', {
    middleware: async ({ getHeader }) => {
      log.info('Middleware executed');

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Some check function
    },
    handler: () => 'Hello World!',
  }),
]);
```

### Guards

Guards are used to protect routes. They are executed before the route handler. If the guard returns an error, the route handler will not be executed.

```ts
import { createRouter, StatusCode, createError, createGuard } from 'nixle';

const authGuard = createGuard('auth', async ({ getHeader }) => {
  const token = getHeader('Authorization');

  // Or you can use some library to verify the token

  if (!token) {
    createError('Unauthorized', StatusCode.UNAUTHORIZED);
  }
});

export const usersRouter = createRouter('/users', ({ route, log }) => [
  guards: [authGuard],
  route.get('/', () => 'Hello World!'),
]);
```

Or you can use the `guards` property in the route object.

```ts
export const usersRouter = createRouter('/users', ({ route, log }) => [
  route.get('/', {
    guards: [authGuard],
    handler: () => 'Hello World!',
  }),
]);
```
