---
outline: deep
---

# Services

Services are optional, but highly recommended, components that provide additional functionality to your application. With services, you can separate your application's logic into smaller, more manageable pieces.

## Usage

To create a service, you need to use the `createService` function. This function takes two arguments, which are a name and a function that returns an object with the service's methods.

```ts
import { createService } from 'nixle';

export const usersService = createService('users', () => {
  const getUsers = async () => {
    return ['John', 'Jane'];
  };

  return { getUsers };
});
```

## Using a Service

To use a service, you need to import it into your router and then call the service's methods.

```ts
import { createRouter, route } from 'nixle';
import { usersService } from './usersService';

export const usersRouter = createRouter('/users', ({ route }) => [
  route.get('/', () => {
    const users = await usersService.getUsers();

    return users;
  }),
]);
```

## Parameters

You can destruct the `params` object to get some useful parameters.

```ts
import { createRouter, route } from 'nixle';
import { usersService } from './usersService';

export const usersRouter = createRouter('/users', ({ route, log }) => [
  route.get('/', () => {
    log('Getting users...', { type: 'info' });
    const users = await usersService.getUsers();
    log('Users fetched!', { type: 'success' });

    return users;
  }),
]);
```
