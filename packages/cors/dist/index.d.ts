import type { CorsConfig } from './types/CorsConfig';
/**
 * CORS plugin for Nixle. Based on https://github.com/elysiajs/elysia-cors
 */
export declare const corsPlugin: (config?: CorsConfig) => import("nixle/dist/plugins/createPlugin").Plugin;
