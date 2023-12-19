import { joinURL } from 'ufo';

export const pick = <O extends Record<string, any>, K extends keyof O>(
  obj: O,
  fields: K[],
): Pick<O, K> =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => fields.includes(key as K))) as Pick<
    O,
    K
  >;

export const omit = <O extends Record<string, any>, K extends keyof O>(
  obj: O,
  fields: K[],
): Omit<O, K> =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => !fields.includes(key as K))) as Omit<
    O,
    K
  >;

export const isPrimitive = (val: any) => val !== Object(val);

export const joinPath = (...paths: string[]) => {
  const path = joinURL('', ...paths);
  const _path = path.startsWith('/') ? path : `/${path}`;

  return _path.endsWith('/') ? _path.slice(0, -1) : _path;
};

export const tryToParse = (value: string) => {
  try {
    const parsed = JSON.parse(value);

    return typeof parsed === 'number' ||
      typeof parsed === 'boolean' ||
      parsed === undefined ||
      parsed === null
      ? parsed
      : value;
  } catch (err) {
    return value;
  }
};

export const parseObject = (obj: Record<string, any>) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, tryToParse(value)])) as Record<
    string,
    any
  >;
