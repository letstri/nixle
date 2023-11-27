import type { ApiMethods } from './createApp';
export interface Provider<Server> {
    methods: ApiMethods;
    server: Server;
}
export declare const createProvider: <Server>(config: (app: Server) => Provider<Server>) => (app: Server) => Provider<Server>;
