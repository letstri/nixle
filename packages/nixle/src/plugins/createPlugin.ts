import type { extendRouterOptions } from '~/router/createRouter';
import type { extendServiceOptions } from '~/service/createService';
import type { log } from '../logger';
import type { Provider } from '..';

interface PluginOptions {
  provider: Provider;
  log: typeof log;
  extendRouterOptions: typeof extendRouterOptions;
  extendServiceOptions: typeof extendServiceOptions;
}

type PluginFunction = (options: PluginOptions) => void;

export interface Plugin {
  name: string;
  plugin: PluginFunction;
}

export const createPlugin = (name: string, plugin: PluginFunction): Plugin => ({
  name,
  plugin,
});
