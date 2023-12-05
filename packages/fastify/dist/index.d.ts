/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { FastifyInstance } from 'fastify';
declare global {
    namespace Nixle {
        interface Provider extends FastifyInstance {
        }
        interface Request extends IncomingMessage {
        }
        interface Response extends ServerResponse<IncomingMessage> {
        }
    }
}
export declare const fastifyProvider: (app: Nixle.Provider) => import("nixle").Provider;
