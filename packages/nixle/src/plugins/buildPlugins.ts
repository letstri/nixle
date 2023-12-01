import type { AppOptions, NixleApp } from '~/createApp';
import { contextLog } from '~/services/logger';

export const buildPlugins = <Server>(nixleApp: NixleApp<Server>, options: AppOptions<Server>) => {
  options.plugins?.forEach(([name, plugin]) => {
    const log = contextLog(name);

    plugin({ nixleApp, log });

    log(`🚀 ${name} plugin loaded`, { type: 'success' });
  });
};
