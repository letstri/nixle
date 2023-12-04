import type { AppOptions, NixleApp } from '~/createApp';
import { log, contextLog } from '~/services/logger';

export const buildPlugins = <Server>(nixleApp: NixleApp<Server>, options: AppOptions<Server>) => {
  if (!options.plugins) {
    return;
  }

  options.plugins.forEach(([name, plugin]) => {
    const _log = contextLog(name, 'bgMagenta');

    plugin({ nixleApp, log: _log });

    log(`🚀 ${name.trim()} plugin successfully loaded`, { type: 'success' });
  });
};
