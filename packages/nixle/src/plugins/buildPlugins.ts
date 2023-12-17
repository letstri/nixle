import type { AppOptions } from '~/createApp';
import { log, contextLog } from '~/logger';
import { extendRouterOptions } from '~/router/createRouter';
import { extendServiceOptions } from '~/service/createService';
import type { Provider } from '..';

export const buildPlugins = (provider: Provider, options: AppOptions) => {
  if (!options.plugins) {
    return;
  }

  options.plugins.forEach(({ name, plugin }) => {
    const _log = contextLog(name, 'bgMagenta');

    plugin({ provider, log: _log, extendRouterOptions, extendServiceOptions });

    log(`🚀 ${name.trim()} plugin successfully loaded`, { type: 'success' });
  });
};
