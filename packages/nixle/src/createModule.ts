import type { Router } from '~/router';

export interface ModuleOptions<R extends Router[]> {
  routers: R;
}

export interface Module<N extends string = string, R extends Router[] = Router[]> {
  routers: R;
  name: Lowercase<N>;
}

export function createModule<Name extends string, Routers extends Router[]>(
  name: Lowercase<Name>,
  options: ModuleOptions<Routers>,
): Module<Name, Routers> {
  return { name, ...options };
}
