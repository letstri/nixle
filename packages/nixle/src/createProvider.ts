import type { ApiMethods } from '~/createApp';

export interface Provider<Server> {
  methods: ApiMethods;
  server: Server;
}

export const createProvider = <Server>(config: (app: Server) => Provider<Server>) => config;
