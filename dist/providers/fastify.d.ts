import { type FastifyInstance } from 'fastify';
import { type Provider } from '../createApp';
export declare const fastifyProvider: (app: FastifyInstance) => Provider<FastifyInstance>;
