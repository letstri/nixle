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
