# Plugins

To extend Nixle, you can create a plugin. The plugin is a function that extends the functionality of the application. It is defined by a pair: a name (a string) and a plugin function.

## Creating a plugin

To create a plugin, you need to create a function that accepts an application and returns a new application. The plugin function can be asynchronous.

```ts
import { createPlugin } from 'nixle';

export const myPlugin = createPlugin('myPlugin', async ({ nixleApp, log }) => {
  log('Hello from my plugin!');
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
