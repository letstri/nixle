import { createPlugin } from 'nixle';
import { ofetch, type FetchOptions, type $Fetch } from 'ofetch';

declare global {
  namespace Nixle {
    interface ServiceOptions {
      ofetch: $Fetch;
    }
  }
}

export const ofetchPlugin = (options?: FetchOptions) =>
  createPlugin('ofetch', ({ addServiceOptions }) => {
    addServiceOptions({ ofetch: ofetch.create(options || {}) });
  });
