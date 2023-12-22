---
outline: deep
---

# Logger

We integrated with [consola](https://github.com/unjs/consola) for better logging experience.

## Usage

You can you log anything inside routers and services everywhere in your application with different types.

Available types: `silent`, `fatal`, `error`, `warn`, `log`, `info`, `success`, `fail`, `ready`, `start`, `box`, `debug`, `trace`, `verbose`.

### Routers

Each router provides `log` function in context.

```ts{5}
import { createRouter, } from 'nixle';

const usersRouter = createRouter('/users', ({ route, log }) => [
  route.get('/', () => {
    log.debug('Some log for debug');

    return [];
  }),
]);
```

### Services

Each service provides `log` function in context.

```ts{5}
import { createService } from 'nixle';

const usersService = createService(({ log }) => {
  const getUsers = () => {
    log.debug('Some log for debug'});

    return [];
  };

  return { getUsers };
});
```

## Configuration

For more information about configuration, please visit [consola](https://github.com/unjs/consola) repository.

```ts
interface ConsolaOptions {
  reporters: ConsolaReporter[];
  types: Record<LogType, InputLogObject>;
  level: LogLevel;
  defaults: InputLogObject;
  throttle: number;
  throttleMin: number;
  stdout?: NodeJS.WriteStream;
  stderr?: NodeJS.WriteStream;
  mockFn?: (type: LogType, defaults: InputLogObject) => (...args: any) => void;
  prompt?: typeof prompt | undefined;
  formatOptions: FormatOptions;
}
```

### Setup

```ts
import { createApp } from 'nixle';
import { someProvider } from '@nixle/some-provider';

const { app } = createApp({
  provider: someProvider(),
  logger: {
    // Any consola options
  },
  router: [someRouter],
});
```
