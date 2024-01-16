/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { FastifyInstance } from 'fastify';
export interface Request extends IncomingMessage {
}
export interface Response extends ServerResponse<IncomingMessage> {
}
export declare const fastifyProvider: (app: FastifyInstance<import("fastify").RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>) => import("nixle").Provider<FastifyInstance<import("fastify").RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>>;
