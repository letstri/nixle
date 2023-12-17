import { createPlugin } from 'nixle';

export const corsPlugin = (config = {}) =>
  createPlugin('CORS', ({ provider }) => {
    // TODO
  });
