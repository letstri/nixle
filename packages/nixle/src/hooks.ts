import { createHooks } from 'hookable';

export const hooks = createHooks<{
  request: any;
  response: any;
  error: any;
}>();
