import { createPlugin } from 'nixle';

export const corsPlugin = createPlugin('cors', ({ app, log }) => {
  log('cors plugin loaded');

  return app;
});
