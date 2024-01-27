import { createPlugin as f, createError as u, StatusCode as y } from "nixle";
import { z as r } from "zod";
const n = (e, o) => {
  const c = (() => {
    if (typeof e == "function") {
      const t = e(r);
      return t instanceof r.ZodObject || t instanceof r.ZodEffects ? t.parseAsync : r.object(t).parseAsync;
    }
    return e instanceof r.ZodObject ? e.parseAsync : r.object(e).parseAsync;
  })();
  return {
    validate: async (t) => {
      try {
        return await c(t);
      } catch (a) {
        const i = a;
        throw u({
          message: o?.message || "Validation error",
          statusCode: o?.statusCode || y.BAD_REQUEST,
          details: i.errors.reduce(
            (d, s) => ({
              ...d,
              [s.path.join(".")]: s.message
            }),
            {}
          )
        });
      }
    },
    $infer: {}
  };
}, j = f("zod", ({ extendServiceContext: e, extendRouterContext: o }) => {
  o({ zodObject: n }), e({ zodObject: n });
});
export {
  n as zodObject,
  j as zodPlugin
};
