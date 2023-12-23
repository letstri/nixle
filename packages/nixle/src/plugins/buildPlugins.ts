import type { AppOptions } from '~/createApp';
import { log, contextLog } from '~/logger';
import { extendRouterContext } from '~/router/createRouter';
import { extendServiceContext } from '~/service/createService';
import type { Provider } from '..';
import { colorize } from 'consola/utils';

export const buildPlugins = (provider: Provider, options: AppOptions) => {
  if (!options.plugins) {
    return;
  }

  options.plugins.forEach(({ name, plugin }) => {
    const _log = contextLog(name, 'bgMagenta');

    plugin({ provider, log: _log, extendRouterContext, extendServiceContext });

    log.success(`🚀 ${colorize('bgBlue', ` ${name.trim()} `)} plugin successfully loaded`);
  });
};
