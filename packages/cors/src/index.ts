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
    const {
      origin = true,
      methods = '*',
      allowedHeaders = '*',
      exposedHeaders = '*',
      credentials = false,
      maxAge = 5,
      preflight = true,
    } = config;

    const origins =
      typeof origin === 'boolean' ? undefined : Array.isArray(origin) ? origin : [origin];

    if (preflight)
      nixleApp.createRoute('options', '/', (params) => {
        handleOrigin(params, config, origins);
        handleMethod(params, config);

        if (exposedHeaders.length)
          params.setHeader(
            'Access-Control-Allow-Headers',
            typeof allowedHeaders === 'string' ? allowedHeaders : allowedHeaders.join(', '),
          );

        if (maxAge) {
          params.setHeader('Access-Control-Max-Age', maxAge.toString());
        }

        params.setStatusCode(204);

        return '';
      });

    nixleApp.createRoute('options', '/*', (params) => {
      handleOrigin(params, config, origins);
      handleMethod(params, config);

      if (exposedHeaders.length)
        params.setHeader(
          'Access-Control-Allow-Headers',
          typeof allowedHeaders === 'string' ? allowedHeaders : allowedHeaders.join(', '),
        );

      if (maxAge) params.setHeader('Access-Control-Max-Age', maxAge.toString());

      params.setStatusCode(204);

      return '';
    });

    nixleApp.events.on('request', (params) => {
      handleOrigin(params, config, origins);
      handleMethod(params, config);

      if (allowedHeaders.length)
        params.setHeader(
          'Access-Control-Allow-Headers',
          typeof allowedHeaders === 'string' ? allowedHeaders : allowedHeaders.join(', '),
        );

      if (exposedHeaders.length)
        params.setHeader(
          'Access-Control-Exposed-Headers',
          typeof exposedHeaders === 'string' ? exposedHeaders : exposedHeaders.join(', '),
        );

      if (credentials) {
        params.setHeader('Access-Control-Allow-Credentials', 'true');
      }
    });
  });
