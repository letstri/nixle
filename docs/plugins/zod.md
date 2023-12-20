---
outline: deep
---

# Zod

[zod](https://www.npmjs.com/package/zod) is a TypeScript-first schema declaration and validation library. It is used to validate the request body, query, and params.

## Install

You can install the `@nixle/zod` package using npm, pnpm, yarn, or bun:

::: code-group

```sh [npm]
npm i @nixle/zod
```

```sh [pnpm]
pnpm add @nixle/zod
```

```sh [yarn]
yarn add @nixle/zod
```

```sh [bun]
bun i @nixle/zod
```

:::

## Setup

To use zod validation, you need to add the `zodPlugin` to the `plugins` array when creating the app.

```ts
import { createApp } from 'nixle';
import { zodPlugin } from '@nixle/zod';

const app = createApp({
  plugins: [zodPlugin],
});
```

## Usage

To use zod validation, you can use the `zodObject` parameter.

### Routers

In the router, you can use the `zodObject` parameter to validate the request information.

```ts
import { createRouter } from 'nixle';

const usersRouter = createRouter('/users', ({ route, zodObject }) => [
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
    handler: ({ params, query, body }) => 'Hello World!',
  }),
]);
```

### Services

In the service, you can use the `zodObject` parameter to validate any object.

```ts
import { createService } from 'nixle';

const usersService = createService(({ zodObject }) => {
  const updateUser = async (user) => {
    const { validate } = zodObject((z) => ({
      id: z.string(),
      name: z.string(),
    }));

    const validatedUser = await validate(user);

    // Save the user to the database

    return validatedUser;
  };

  return {
    updateUser,
  };
});
```
