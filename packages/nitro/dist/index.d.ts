/// <reference types=".pnpm/@types+node@20.10.3/node_modules/@types/node/http" />
/// <reference types=".pnpm/@types+node@18.18.13/node_modules/@types/node/http" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { NitroApp } from 'nitropack';
declare global {
    namespace Nixle {
        interface Provider extends NitroApp {
        }
        interface Request extends IncomingMessage {
        }
        interface Response extends ServerResponse<IncomingMessage> {
        }
    }
}
export declare const nitroProvider: (app: Nixle.Provider) => import("nixle").Provider;
