import { createPlugin } from 'nixle';
import type { CorsConfig } from './types/CorsConfig';
import { handleOrigin } from './handleOrigin';
import { handleMethod } from './handleMethod';

/**
 * CORS plugin for Nixle. Based on https://github.com/elysiajs/elysia-cors
 */
export const corsPlugin = (
  config: CorsConfig = {
    origin: true,
    methods: '*',
    allowedHeaders: '*',
    exposedHeaders: '*',
    credentials: false,
    maxAge: 5,
    preflight: true,
  },
) =>
  createPlugin('CORS', ({ nixleApp }) => {
    const _config = {
      origin: true,
      methods: '*',
      allowedHeaders: '*',
      exposedHeaders: '*',
      credentials: false,
      maxAge: 5,
      preflight: true,
      ...config,
    };

    const origins =
      typeof origin === 'boolean' ? undefined : Array.isArray(origin) ? origin : [origin];

    if (_config.preflight)
      nixleApp.createRoute('options', '/', (params) => {
        handleOrigin(params, config, origins);
        handleMethod(params, config);

        if (_config.exposedHeaders.length)
          params.setHeader(
            'Access-Control-Allow-Headers',
            typeof _config.allowedHeaders === 'string'
              ? _config.allowedHeaders
              : _config.allowedHeaders.join(', '),
          );

        if (_config.maxAge) {
          params.setHeader('Access-Control-Max-Age', _config.maxAge.toString());
        }

        params.setStatusCode(204);

        return '';
      });

    nixleApp.createRoute('options', '/*', (params) => {
      handleOrigin(params, config, origins);
      handleMethod(params, config);

      if (_config.exposedHeaders.length)
        params.setHeader(
          'Access-Control-Allow-Headers',
          typeof _config.allowedHeaders === 'string'
            ? _config.allowedHeaders
            : _config.allowedHeaders.join(', '),
        );

      if (_config.maxAge) params.setHeader('Access-Control-Max-Age', _config.maxAge.toString());

      params.setStatusCode(204);

      return '';
    });

    nixleApp.events.on('request', (params) => {
      handleOrigin(params, config, origins);
      handleMethod(params, config);

      if (_config.allowedHeaders.length)
        params.setHeader(
          'Access-Control-Allow-Headers',
          typeof _config.allowedHeaders === 'string'
            ? _config.allowedHeaders
            : _config.allowedHeaders.join(', '),
        );

      if (_config.exposedHeaders.length)
        params.setHeader(
          'Access-Control-Exposed-Headers',
          typeof _config.exposedHeaders === 'string'
            ? _config.exposedHeaders
            : _config.exposedHeaders.join(', '),
        );

      if (_config.credentials) {
        params.setHeader('Access-Control-Allow-Credentials', 'true');
      }
    });
  });
