/// <reference types="node" />
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
