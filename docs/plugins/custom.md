---
outline: deep
---

# Plugins

To extend Nixle, you can create a plugin. The plugin is a function that extends the functionality of the application. It is defined by a pair: a name (a string) and a plugin function.

## Creating a plugin

To create a plugin, you need to create a function that accepts an application and returns a new application. The plugin function can be asynchronous.

```ts
import { createPlugin } from 'nixle';

export const myPlugin = createPlugin('myPlugin', async ({ nixleApp, log }) => {
  log.info('Hello from my plugin!');
});
```

Available options:

- `nixleApp` - the application instance
- `log` - a function that logs a message to the console

### Extending the application

There are two ways to extend the application:

#### Router

You can extend the router options by using function `extendRouterContext`:

```ts
import { createPlugin } from 'nixle';

// To create TypeScript definitions
declare global {
  namespace Nixle {
    interface RouterContext {
      someOption: string;
    }
  }
}

export const myPlugin = createPlugin('myPlugin', async ({ extendRouterContext }) => {
  extendRouterContext({ someOption: 'someValue' });
});
```

And then you can use the `someOption` in the router:

```ts
import { createRouter } from 'nixle';

const app = createRouter('/users', ({ route, log, someOption }) => [
  route.get('/', () => {
    log.info(someOption);
  }),
]);
```

#### Services

You can extend the services by using function `extendServiceContext`:

```ts
import { createPlugin } from 'nixle';

// To create TypeScript definitions
declare global {
  namespace Nixle {
    interface ServiceContext {
      someOption: string;
    }
  }
}

export const myPlugin = createPlugin('myPlugin', async ({ extendServiceContext }) => {
  extendServiceContext({ someOption: 'someValue' });
});
```

And then you can use the `someOption` in the service:

```ts
import { createService } from 'nixle';

const app = createService('users', ({ log, someOption }) => {
  const getUsers = async () => {
    log.info(someOption);
  };

  return {
    getUsers,
  };
});
```

## Using a plugin

To use a plugin, you need to import it and pass it to the `plugins` option of the `createApp` function.

```ts
import { createApp } from 'nixle';
import { myPlugin } from './myPlugin';

createApp({
  plugins: [myPlugin],
});
```
