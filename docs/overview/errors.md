---
outline: deep
---

# Errors

Nixle provides a simple way to throw exceptions.

## Overview

To throw an exception in Nixle, you can use the `createError` function. This function accepts a string as the message and an optional second parameter as the status code or an object with the following properties:

- `message` - A string with additional information. Example: `You are unauthorized!`.
- `statusCode` - An HTTP status code. Example: `401`. You can use the `StatusCode` enum from `nixle`.
- `code` - Custom error code. Example: `USER_UNAUTHORIZED_ERROR`.
- `details` - An object with additional details. Example: `{ userId: 1 }`.

::: tip
To set the status code, you can use the `StatusCode` enum.
:::

```ts
import { createError, StatusCode } from 'nixle';

export const usersService = createService(() => {
  const getUsers = async () => {
    if (Math.random() > 0.5) {
      if (Math.random() > 0.5) {
        throw createError('You are unauthorized!');
      } else {
        throw createError('You are unauthorized!', StatusCode.FORBIDDEN);
      }
    } else {
      throw createError({
        message: 'You are unauthorized!',
        statusCode: StatusCode.UNAUTHORIZED,
        code: 'USER_UNAUTHORIZED_ERROR',
        details: { userId: 1 },
      });
    }

    // This code will never be executed.
    return ['John', 'Jane'];
  };

  return { getUsers };
});
```

## Check error

To check an error, you can use the `isNixleError` function. This function takes an error and returns a boolean.

```ts
import { createService, createError, isNixleError } from 'nixle';

const usersService = createService('users', () => {
  const getUsers = async () => {
    try {
      throw createError('You are unauthorized!');
    } catch (error) {
      if (isNixleError(error)) {
        // Handle Nixle error.
      } else {
        // Handle another error.
      }
    }
  };

  return { getUsers };
});
```
