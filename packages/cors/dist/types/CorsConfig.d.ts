import type { HTTPMethod } from 'nixle';
import type { Origin } from './Origin';
export interface CorsConfig {
    /**
     * @default `true`
     *
     * Assign the **Access-Control-Allow-Origin** header.
     *
     * Value can be one of the following:
     * - `string` - String of origin which will be directly assign to `Access-Control-Allow-Origin`
     *
     * - `boolean` - If set to true, `Access-Control-Allow-Origin` will be set to `*` (accept all origin)
     *
     * - `RegExp` - Pattern to use to test with request's url, will accept origin if matched.
     *
     * - `Array<string | RegExp | Function>` - Will try to find truthy value of all options above. Will accept request if one is `true`.
     */
    origin?: Origin | boolean | Origin[];
    /**
     * @default `*`
     *
     * Assign **Access-Control-Allow-Methods** header.
     *
     * Value can be one of the following:
     * Accept:
     * - `undefined | null | ''` - Ignore all methods.
     *
     * - `*` - Accept all methods.
     *
     * - `HTTPMethod` - Will be directly set to **Access-Control-Allow-Methods**.
     * - Expects either a single method or a comma-delimited string (eg: 'GET, PUT, POST')
     *
     * - `HTTPMethod[]` - Allow multiple HTTP methods.
     * - eg: ['GET', 'PUT', 'POST']
     */
    methods?: undefined | null | '' | '*' | HTTPMethod | HTTPMethod[];
    /**
     * @default `*`
     *
     * Assign **Access-Control-Allow-Headers** header.
     *
     * Allow incoming request with the specified headers.
     *
     * Value can be one of the following:
     * - `string`
     *     - Expects either a single method or a comma-delimited string (eg: 'Content-Type, Authorization').
     *
     * - `string[]` - Allow multiple HTTP methods.
     *     - eg: ['Content-Type', 'Authorization']
     */
    allowedHeaders?: string | string[];
    /**
     * @default `*`
     *
     * Assign **Access-Control-Exposed-Headers** header.
     *
     * Return the specified headers to request in CORS mode.
     *
     * Value can be one of the following:
     * - `string`
     *     - Expects either a single method or a comma-delimited string (eg: 'Content-Type, 'X-Powered-By').
     *
     * - `string[]` - Allow multiple HTTP methods.
     *     - eg: ['Content-Type', 'X-Powered-By']
     */
    exposedHeaders?: string | string[];
    /**
     * @default `false`
     *
     * Assign **Access-Control-Allow-Credentials** header.
     *
     * Allow incoming requests to send `credentials` header.
     *
     * - `boolean` - Available if set to `true`.
     */
    credentials?: boolean;
    /**
     * @default `5`
     *
     * Assign **Access-Control-Max-Age** header.
     *
     * Allow incoming requests to send `credentials` header.
     *
     * - `number` - Duration in seconds to indicates how long the results of a preflight request can be cached.
     */
    maxAge?: number;
    /**
     * @default `true`
     *
     * Add `[OPTIONS] /*` handler to handle preflight request which response with `HTTP 204` and CORS hints.
     *
     * - `boolean` - Available if set to `true`.
     */
    preflight?: boolean;
}
