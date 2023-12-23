import type { ConsolaOptions } from 'consola';
import type dotenv from 'dotenv';
import type { Provider } from './provider/createProvider';
import type { Plugin } from './plugins/createPlugin';
import { type Router } from '.';
export interface AppOptions {
    provider: Provider;
    routers: Router[];
    plugins?: Plugin[];
    logger?: Partial<ConsolaOptions> | false;
    env?: dotenv.DotenvConfigOptions;
    globalPrefix?: string;
}
export type NixleApp = ReturnType<typeof createApp>;
export declare function createApp(options: AppOptions): {
    app: Nixle.Provider;
    events: {
        on: {
            <Key extends keyof {
                request: any;
                response: any;
                error: any;
            }>(type: Key, handler: import("mitt").Handler<{
                request: any;
                response: any;
                error: any;
            }[Key]>): void;
            (type: "*", handler: import("mitt").WildcardHandler<{
                request: any;
                response: any;
                error: any;
            }>): void;
        };
        emit: {
            <Key_1 extends keyof {
                request: any;
                response: any;
                error: any;
            }>(type: Key_1, event: {
                request: any;
                response: any;
                error: any;
            }[Key_1]): void;
            <Key_2 extends keyof {
                request: any;
                response: any;
                error: any;
            }>(type: undefined extends {
                request: any;
                response: any;
                error: any;
            }[Key_2] ? Key_2 : never): void;
        };
    };
};
