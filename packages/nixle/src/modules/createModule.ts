import type { Router } from '../router/createRouter';

export interface ModuleOptions {
  routers: Router[];
}

export interface Module {
  options: ModuleOptions;
}

export const createModule = (options: ModuleOptions): Module => ({ options });
