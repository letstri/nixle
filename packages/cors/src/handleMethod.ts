import type { HandlerParams } from 'nixle';
import type { CorsConfig } from './types/CorsConfig';

export const handleMethod = (params: HandlerParams, config: CorsConfig) => {
  if (!config.methods?.length) {
    return;
  }

  if (config.methods === '*') {
    params.setHeader('Access-Control-Allow-Methods', '*');
    return;
  }

  if (!Array.isArray(config.methods)) {
    params.setHeader('Access-Control-Allow-Methods', config.methods);
    return;
  }

  params.setHeader('Access-Control-Allow-Methods', config.methods.join(', '));
};
