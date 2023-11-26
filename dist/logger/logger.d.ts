export interface Logger {
    log(message: string): void;
}
export type LoggerType = 'info' | 'success' | 'error' | 'warn';
export declare let loggerInstance: Logger | null;
export declare const createLogger: (instance: Logger | null) => void;
export declare const log: (message: string, options?: {
    type?: LoggerType;
}) => void;
