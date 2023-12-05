/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { Express } from 'express';
declare global {
    namespace Nixle {
        interface Provider extends Express {
        }
        interface Request extends IncomingMessage {
        }
        interface Response extends ServerResponse<IncomingMessage> {
        }
    }
}
export declare const expressProvider: (app: Nixle.Provider) => import("nixle").Provider;
