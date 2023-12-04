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
  createPlugin('ofetch', ({ extendServiceOptions }) => {
    extendServiceOptions({ ofetch: ofetch.create(options || {}) });
  });
