export type NixleTypeError<T extends string> = {
    $nixleTypeError: T;
};
export type ValidPath<P extends string> = P extends '/' ? P : P extends `/${string}` ? P extends `${string}/` ? NixleTypeError<'Path must not end with /'> & string : P : NixleTypeError<'Path must start with /'> & string;
