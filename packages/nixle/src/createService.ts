import { log } from './services/logger';

interface ServiceOptions {
  log: typeof log;
}

type ServiceMethods = Record<string, (name: string, ...args: any) => any>;

export const createService = <Methods extends ServiceMethods>(
  service: (options: ServiceOptions) => Methods,
) => service({ log });
