import { type Logger, createLogger, log } from './logger/logger';
import { type Module } from './modules/createModule';
import { type HTTPMethod } from './utils/HTTPMethod';
import { buildModules } from './modules/buildModules';
import type { Provider } from './createProvider';

export type MethodHandler = (
  path: string,
  handler: (params: {
    request: any;
    response: any;
    setStatusCode: (code: number) => void;
    setHeader: (key: string, value: string) => void;
    setCookie: (key: string, value: string) => void;
  }) => Promise<any> | any,
) => void;
export type ApiMethods = Record<Lowercase<HTTPMethod>, MethodHandler>;

export interface AppOptions<Server> {
  provider: Provider<Server>;
  modules: Module[];
  logger?: Logger | null;
}

export const createApp = <Server>({
  provider,
  logger: _logger,
  ...options
}: AppOptions<Server>) => {
  if (_logger !== undefined) {
    createLogger(_logger);
  }

  log('Starting an application...');
  buildModules(provider, options.modules);
  log('Application successfully started');

  return provider.server;
};
