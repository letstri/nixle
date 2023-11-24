/// <reference types="node" />
import { type FastifyInstance } from 'fastify';
import type { ApiMethods } from '../server';
export declare const fastifyProvider: (app: FastifyInstance) => {
    methods: ApiMethods;
    server: FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>;
};
