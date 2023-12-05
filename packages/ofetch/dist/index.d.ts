import { type FetchOptions, type $Fetch } from 'ofetch';
declare global {
    namespace Nixle {
        interface ServiceOptions {
            ofetch: $Fetch;
        }
    }
}
export declare const ofetchPlugin: (options?: FetchOptions) => import("nixle/dist/plugins/createPlugin").Plugin;
