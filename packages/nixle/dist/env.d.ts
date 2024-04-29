import dotenv from 'dotenv';
import type { RouteHandlerContext } from './router';
export declare const getEnv: () => RouteHandlerContext['env'];
export declare const buildEnv: (config?: dotenv.DotenvConfigOptions) => void;
