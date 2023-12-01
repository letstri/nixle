---
outline: deep
---

# Errors

To throw an exception, you have a possibility to use the `createError` function. This function takes a string with cause or an object with the following properties:

- `message` - A string with info.
- `statusCode` - An error code.

Or any other fields that you want to add.

```ts
import { createError } from 'nixle';

export const usersService = createService('users', () => {
  const getUsers = async () => {
    if (Math.random() > 0.5) {
      createError('You are unauthorized!');
    } else {
      createError({ message: 'You are unauthorized!', statusCode: 401 });
    }

    // This code will never be executed.
    return ['John', 'Jane'];
  };

  return { getUsers };
});
```
