import { createPlugin } from 'nixle';
import { ofetch, type FetchOptions, type $Fetch } from 'ofetch';

declare global {
  namespace Nixle {
    interface ServiceContext {
      ofetch: $Fetch;
    }
  }
}

export const ofetchPlugin = (options?: FetchOptions) =>
  createPlugin('ofetch', ({ extendServiceContext }) => {
    extendServiceContext({ ofetch: ofetch.create(options || {}) });
  });
