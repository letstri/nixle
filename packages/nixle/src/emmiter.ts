import mitt from 'mitt';

type Events = {
  request: any;
  response: any;
  error: any;
};

export const emitter = mitt<Events>();
