import type { AppOptions } from '~/createApp';
import { contextLog } from '~/logger';
import { extendRouterContext } from '~/router/createRouter';
import { extendServiceContext } from '~/service/createService';
import type { Provider } from '..';

export const buildPlugins = (provider: Provider, options: AppOptions) => {
  if (!options.plugins) {
    return;
  }

  options.plugins.forEach(({ name, plugin }) => {
    const log = contextLog(name, 'bgMagenta');

    plugin({ provider, log, extendRouterContext, extendServiceContext });
  });
};
