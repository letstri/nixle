---
outline: deep
---

# Errors

Nixle provides a simple way to throw exceptions.

## Overview

To throw an exception, you have a possibility to use the `createError` function. This function takes a string with cause or an object with the following properties:

- `message` - A string with info.
- `statusCode` - An error code.

Or any other fields that you want to add.

```ts
import { createError, StatusCode } from 'nixle';

export const usersService = createService('users', () => {
  const getUsers = async () => {
    if (Math.random() > 0.5) {
      createError('You are unauthorized!');
    } else {
      createError({ message: 'You are unauthorized!', statusCode: StatusCode.UNAUTHORIZED });
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
      createError('You are unauthorized!');
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
