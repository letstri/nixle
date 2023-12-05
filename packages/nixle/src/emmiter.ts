import mitt from 'mitt';
import type { RequestHandlerParams } from './provider/RequestHandler';

type Events = {
  request: RequestHandlerParams;
  response: any;
  error: any;
};

export const emitter = mitt<Events>();
