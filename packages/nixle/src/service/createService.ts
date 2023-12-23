import { contextLog, type log } from '../logger';
import { env } from '~/env';

let serviceContext: Nixle.ServiceContext = {};

export const extendServiceContext = (options: Record<string, unknown>) => {
  Object.assign(serviceContext, options);
};

interface ServiceContext extends Nixle.ServiceContext {
  log: typeof log;
  env: Nixle.Env;
}

interface ServiceMethodsHandler<
  M extends unknown,
  S extends Record<string, Service> = Record<string, Service>,
> {
  (context: ServiceContext, services: { [K in keyof S]: ReturnType<S[K]> }): M;
}

interface ServiceOptions<M extends unknown, S extends Record<string, Service>> {
  services?: S;
  methods: ServiceMethodsHandler<M, S>;
}

export interface Service<M extends unknown = unknown> {
  (context: string): M;
}

export function createService<
  M extends unknown = unknown,
  S extends Record<string, Service> = Record<string, Service>,
>(options: ServiceOptions<M, S>): Service<M>;
export function createService<M extends unknown = unknown>(
  methods: ServiceMethodsHandler<M>,
): Service<M>;

export function createService<
  M extends unknown = unknown,
  S extends Record<string, Service> = Record<string, Service>,
>(optionsOrMethods: ServiceOptions<M, S> | ServiceMethodsHandler<M, S>): Service<M> {
  return (context: string) => {
    const methods =
      typeof optionsOrMethods === 'function' ? optionsOrMethods : optionsOrMethods.methods;
    const _services =
      typeof optionsOrMethods === 'function' ? ({} as S) : optionsOrMethods.services || ({} as S);

    return methods(
      {
        log: contextLog(context, 'bgCyan'),
        env,
        ...serviceContext,
      },
      Object.entries(_services).reduce(
        (acc, [key, service]) => ({
          ...acc,
          [key]: service(key),
        }),
        {} as { [K in keyof S]: ReturnType<S[K]> },
      ),
    );
  };
}
