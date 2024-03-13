import { createPlugin } from 'nixle';
import { ofetch, type FetchOptions, type $Fetch } from 'ofetch';

declare global {
  namespace Nixle {
    interface ServiceContext {
      ofetch: $Fetch;
    }
  }
}

export const ofetchPlugin = (options?: FetchOptions) => {
  const _ofetch = ofetch.create(options || {});

  return createPlugin('ofetch', ({ extendServiceContext }) => {
    extendServiceContext({ ofetch: _ofetch });
  });
};
