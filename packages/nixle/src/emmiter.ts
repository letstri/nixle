import mitt from 'mitt';
import type { HandlerParams } from '~/provider/RequestHandler';

type Events = {
  request: HandlerParams;
  response: any;
  error: any;
};

export const emitter = mitt<Events>();
