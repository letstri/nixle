import { type HTTPMethod } from './server';

export interface Route {
  method: Lowercase<HTTPMethod>;
  path: string;
  handler: (params: { req: any; res: any }) => any;
}

export const routers = new Map<string, () => Route[]>([]);

export const createRouter = (path: string, routes: () => Route[]) => {
  return [path, routes] as [string, () => Route[]];
};
