---
outline: deep
---

# Modules

Modules are a fundamental and essential part of the Nixle framework. They establish a connection with the application and then register routers with the server.

## Usage

To create a module, you need to use the `createModule` function. This function takes a single argument, which is an object with the following properties:

- `routers` - An array of routers to register with the server.

```ts
import { createModule } from 'nixle';

export const usersModule = createModule({
  routers: [],
});
```
