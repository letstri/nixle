import dotenv from 'dotenv';
import type { RouteHandlerContext } from './router';
export declare const env: Nixle.Env;
export declare const getEnv: () => RouteHandlerContext['env'];
export declare const buildEnv: (config?: dotenv.DotenvConfigOptions) => void;
