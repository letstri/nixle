---
outline: deep
---

# ofetch

[ofetch](https://github.com/unjs/ofetch) is a HTTP client for Node.js and browsers. We created a plugin for easily connect ofetch to your services and sending HTTP requests for your needs.

## Install

You can install the `@nixle/ofetch` package using npm, pnpm, yarn, or bun:

::: code-group

```sh [npm]
npm i @nixle/ofetch
```

```sh [pnpm]
pnpm add @nixle/ofetch
```

```sh [yarn]
yarn add @nixle/ofetch
```

```sh [bun]
bun i @nixle/ofetch
```

:::

## Setup

To use ofetch in your services, you need to add the `ofetchPlugin` to the `plugins` array when creating the app.

```ts
import { createApp } from 'nixle';
import { ofetchPlugin } from '@nixle/ofetch';

const app = createApp({
  plugins: [
    ofetchPlugin({
      // Any ofetch options such as base url, headers, etc.
    }),
  ],
});
```

## Usage

To use ofetch in your services, you can use the `ofetch` function that is available in the service context.

```ts
import { createService } from 'nixle';

const usersService = createService('users', ({ ofetch }) => {
  const getUsers = async () => {
    const data = await ofetch('/users');

    return data;
  };

  return {
    getUsers,
  };
});
```
