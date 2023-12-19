# Environment Variables

Environment variables are a way to pass configuration to your service. They are set in the `env` object passed to your service's factory function.

## Setup

### .env

To use environment variables, you must first define them in your .env file. For example:

```sh
SOME_SERVICE_URL=https://some-service.com
```

### TypeScript

If you are using TypeScript, you must also define the types for your environment variables. For example:

```ts
declare global {
  namespace Nixle {
    interface Env {
      SOME_SERVICE_URL: string;
    }
  }
}
```

### Options

You can also pass options to the `createApp`.

```ts
import { createApp } from 'nixle';

const app = createApp({
  env: {
    path: '.env',
    encoding: 'utf8',
    debug: false,
    override: false,
    processEnv: process.env,
    DOTENV_KEY: undefined,
  },
});
```

The options are defined as follows:

```ts
interface DotenvConfigOptions {
  /**
   * Default: `path.resolve(process.cwd(), '.env')`
   *
   * Specify a custom path if your file containing environment variables is located elsewhere.
   *
   * example: `{ path: '/custom/path/to/.env' }`
   */
  path?: string | URL;

  /**
   * Default: `utf8`
   *
   * Specify the encoding of your file containing environment variables.
   *
   * example: `{ encoding: 'latin1' })
   */
  encoding?: string;

  /**
   * Default: `false`
   *
   * Turn on logging to help debug why certain keys or values are not being set as you expect.
   *
   * example: `{ debug: process.env.DEBUG }`
   */
  debug?: boolean;

  /**
   * Default: `false`
   *
   * Override any environment variables that have already been set on your machine with values from your .env file.
   *
   * example: `{ override: true }`
   */
  override?: boolean;

  /**
   * Default: `process.env`
   *
   * Specify an object to write your secrets to. Defaults to process.env environment variables.
   *
   * example: `const processEnv = {}; { processEnv: processEnv }`
   */
  processEnv?: DotenvPopulateInput;

  /**
   * Default: `undefined`
   *
   * Pass the DOTENV_KEY directly to config options. Defaults to looking for process.env.DOTENV_KEY environment variable. Note this only applies to decrypting .env.vault files. If passed as null or undefined, or not passed at all, dotenv falls back to its traditional job of parsing a .env file.
   *
   * example: `{ DOTENV_KEY: 'dotenv://:key_1234…@dotenv.org/vault/.env.vault?environment=production' }`
   */
  DOTENV_KEY?: string;
}
```

## Usage

### Services

Then, you can access them in your service's factory function:

```ts
import { createService } from 'nixle';

const app = createService('users', ({ env }) => {
  const getUsers = async () => {
    const users = await fetch(`${env.SOME_SERVICE_URL}/users`).then((res) => res.json());

    return users;
  };

  return {
    getUsers,
  };
});
```

### Routes

You can also access environment variables in your routes:

```ts
import { createRouter } from 'nixle';

const app = createRoute('/users', ({ route, env }) => [
  route.get('/', () => {
    return env.SOME_SERVICE_URL;
  }),
]);
```
