import type { AppOptions, NixleApp } from '~/createApp';
import { log, contextLog } from '~/logger';
import { addRouterOptions } from '~/router/createRouter';
import { addServiceOptions } from '~/service/createService';

export const buildPlugins = <Server>(nixleApp: NixleApp<Server>, options: AppOptions<Server>) => {
  if (!options.plugins) {
    return;
  }

  options.plugins.forEach(([name, plugin]) => {
    const _log = contextLog(name, 'bgMagenta');

    plugin({ nixleApp, log: _log, addRouterOptions, addServiceOptions });

    log(`🚀 ${name.trim()} plugin successfully loaded`, { type: 'success' });
  });
};
