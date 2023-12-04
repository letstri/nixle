import type { AppOptions, NixleApp } from '~/createApp';
import { log, contextLog } from '~/logger';
import { extendRouterOptions } from '~/router/createRouter';
import { extendServiceOptions } from '~/service/createService';

export const buildPlugins = <Server>(nixleApp: NixleApp<Server>, options: AppOptions<Server>) => {
  if (!options.plugins) {
    return;
  }

  options.plugins.forEach(([name, plugin]) => {
    const _log = contextLog(name, 'bgMagenta');

    plugin({ nixleApp, log: _log, extendRouterOptions, extendServiceOptions });

    log(`🚀 ${name.trim()} plugin successfully loaded`, { type: 'success' });
  });
};
