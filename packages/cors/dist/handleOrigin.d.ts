import type { RequestHandlerParams } from 'nixle';
import type { CorsConfig } from './types/CorsConfig';
import type { Origin } from './types/Origin';
export declare const handleOrigin: (params: RequestHandlerParams, config: CorsConfig, origins: Origin[] | undefined) => void;
