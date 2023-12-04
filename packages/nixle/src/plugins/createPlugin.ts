import type { addRouterOptions } from '~/router/createRouter';
import type { NixleApp } from '../createApp';
import type { log } from '../logger';
import type { addServiceOptions } from '~/service/createService';

interface PluginOptions<Server> {
  nixleApp: NixleApp<Server>;
  log: typeof log;
  addRouterOptions: typeof addRouterOptions;
  addServiceOptions: typeof addServiceOptions;
}

type PluginFunction<Server> = (options: PluginOptions<Server>) => void;

export type Plugin<Server> = [name: string, plugin: PluginFunction<Server>];

export const createPlugin = <Server = unknown>(
  name: string,
  plugin: PluginFunction<Server>,
): Plugin<Server> => [name, plugin];
