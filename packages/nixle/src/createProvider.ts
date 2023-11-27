import type { HTTPMethod } from '.';

export interface Provider<Server> {
  request: (
    method: Lowercase<HTTPMethod>,
    path: string,
    handler: (params: {
      req: any;
      res: any;
      setStatusCode: (code: number) => void;
      setHeader: (key: string, value: string) => void;
    }) => Promise<any> | any,
  ) => void;
  server: Server;
}

export const createProvider = <Server>(config: (app: Server) => Provider<Server>) => config;
