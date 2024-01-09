import { createPlugin as m, createError as u, StatusCode as l } from "nixle";
import * as o from "zod";
const a = (t, e) => {
  const s = o.object(typeof t == "function" ? t(o.z) : t);
  return {
    validate: async (c) => {
      try {
        return await s.parseAsync(c);
      } catch (n) {
        const d = n;
        throw u({
          message: e?.message || "Validation error",
          statusCode: e?.statusCode || l.BAD_REQUEST,
          details: d.errors.reduce(
            (i, r) => ({
              ...i,
              [r.path.join(".")]: r.message
            }),
            {}
          )
        });
      }
    },
    $infer: {}
  };
}, z = m("zod", ({ extendServiceContext: t, extendRouterContext: e }) => {
  e({ zodObject: a }), t({ zodObject: a });
});
export {
  a as zodObject,
  z as zodPlugin
};
