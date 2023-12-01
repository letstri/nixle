import type { HandlerParams } from 'nixle';
import type { CorsConfig } from './types/CorsConfig';
import type { Origin } from './types/Origin';

const processOrigin = (origin: Origin, from: string) => {
  switch (typeof origin) {
    case 'string':
      // eslint-disable-next-line no-case-declarations
      const protocolStart = from.indexOf('://');

      // Malform URL, invalid protocol
      if (protocolStart === -1) return false;

      return origin === from.slice(protocolStart + 3);
    case 'object':
      return origin.test(from);
  }
};

export const handleOrigin = (
  params: HandlerParams,
  config: CorsConfig,
  origins: Origin[] | undefined,
) => {
  // origin === `true` means any origin
  if (config.origin === true) {
    params.setHeader('Vary', '*');
    params.setHeader('Access-Control-Allow-Origin', params.getHeader('Origin') || '*');
    return;
  }

  if (!origins?.length) return;

  const headers: string[] = [];

  if (origins.length) {
    const from = params.getHeader('Origin') ?? '';

    for (let i = 0; i < origins.length; i++) {
      const value = processOrigin(origins[i]!, from);

      if (value === true) {
        params.setHeader('Vary', origin ? 'Origin' : '*');
        params.setHeader('Access-Control-Allow-Origin', params.getHeader('Origin') || '*');
        return;
      }

      // value can be string (truthy value) but not `true`
      if (value) {
        headers.push(value);
      }
    }
  }

  params.setHeader('Vary', 'Origin');
  params.setHeader('Access-Control-Allow-Origin', headers.join(', '));
};
