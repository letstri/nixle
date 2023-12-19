export declare const pick: <O extends Record<string, any>, K extends keyof O>(obj: O, fields: K[]) => Pick<O, K>;
export declare const omit: <O extends Record<string, any>, K extends keyof O>(obj: O, fields: K[]) => Omit<O, K>;
export declare const isPrimitive: (val: any) => boolean;
export declare const joinPath: (...paths: string[]) => string;
export declare const tryToParse: (value: string) => any;
export declare const parseObject: (obj: Record<string, any>) => Record<string, any>;
