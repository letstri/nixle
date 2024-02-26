import { createPlugin as u, createError as y, StatusCode as p } from "nixle";
import { z as t } from "zod";
const i = (e, s) => {
  const d = (() => {
    if (typeof e == "function") {
      const r = e(t);
      return r instanceof t.ZodObject || r instanceof t.ZodEffects ? r.parseAsync : t.object(r).parseAsync;
    }
    return e instanceof t.ZodObject ? e.parseAsync : t.object(e).parseAsync;
  })();
  return {
    validate: async (r) => {
      try {
        return await d(r);
      } catch (f) {
        const n = f, c = n.errors.filter(({ path: o }) => o).reduce(
          (o, a) => ({
            ...o,
            [a.path.join(".")]: a.message
          }),
          {}
        );
        throw y({
          message: s?.message || "Validation error",
          statusCode: s?.statusCode || p.BAD_REQUEST,
          details: {
            ...c ? { paths: c } : { errors: n.errors }
          }
        });
      }
    },
    $infer: {}
  };
}, j = u("zod", ({ extendServiceContext: e, extendRouterContext: s }) => {
  s({ zodObject: i }), e({ zodObject: i });
});
export {
  i as zodObject,
  j as zodPlugin
};
