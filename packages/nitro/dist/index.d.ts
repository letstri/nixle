/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { NitroApp } from 'nitropack';
export interface Request extends IncomingMessage {
}
export interface Response extends ServerResponse<IncomingMessage> {
}
export declare const nitroProvider: (app: NitroApp) => import("nixle").Provider<NitroApp>;
