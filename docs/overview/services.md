---
outline: deep
---

# Services

Services are optional, but highly recommended, components that provide additional functionality to your application. With services, you can separate your application's logic into smaller, more manageable pieces.

## Creating

To create a service, you need to use the `createService` function. This function one argument, which a function that returns an object with the service's methods.

```ts
import { createService } from 'nixle';

export const usersService = createService('users', () => {
  const getUsers = () => {
    return ['John', 'Jane'];
  };

  return { getUsers };
});
```

## Usage

To use a service, you need to call the returned function from the `createService` function.

```ts
import { createRouter } from 'nixle';
import { usersService } from './usersService';

export const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => {
    const users = await usersService().getUsers();

    return users;
  }),
]);
```

## Parameters

You can destruct the `params` object to get some useful parameters.

```ts
import { createService } from 'nixle';

export const usersService = createService('users', ({ log, env }) => {
  const getUsers = () => {
    log.info('Getting users from site', env.SITE_URL);
    return ['John', 'Jane'];
  };

  return { getUsers };
});
```

### More

To use more parameters, you can install additional plugins. For example, the `@nixle/zod` plugin adds the `zodObject` parameter that allows you to validate any object.

```ts
import { createService } from 'nixle';

export const usersService = createService('users', ({ zodObject }) => {
  const getUsers = (user) => {
    const { validate } = zodObject((zod) => ({
      email: zod.string().email(),
      password: zod.string().min(8),
    }));

    return validate(user);
  };

  return { getUsers };
});
```

## TypeScript

```ts
import { createService } from 'nixle';

export const usersService = createService('users', () => {
  const getUsers = () => {
    return ['John', 'Jane'];
  };

  return { getUsers };
});

type UsersServiceReturns = typeof usersService.$inferMethods;
// type UsersServiceReturns = {
//   getUsers: () => string[];
// }

type UsersServiceReturns = typeof usersService.$inferReturns;
// type UsersServiceReturns = {
//   getUsers: string[];
// }
```
