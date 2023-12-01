import { log } from './services/logger';

interface PluginOptions<Server> {
  app: Server;
  log: typeof log;
}

export const createPlugin =
  <Server>(name: string, plugin: (options: PluginOptions<Server>) => Server) =>
  (app: Server) =>
    [name, plugin({ app, log })] as const;
