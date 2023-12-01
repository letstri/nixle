import mitt from 'mitt';
import type { Handler } from '~/createProvider';

type Events = {
  request: Parameters<Handler>[0];
  response: any;
  error: any;
};

export const emitter = mitt<Events>();
