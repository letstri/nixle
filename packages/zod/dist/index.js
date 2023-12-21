import { createPlugin as m, createError as u, StatusCode as l } from "nixle";
import * as o from "zod";
const a = (e, t) => {
  const s = o.object(typeof e == "function" ? e(o.z) : e);
  return {
    validate: async (c) => {
      try {
        return await s.parseAsync(c);
      } catch (n) {
        const d = n;
        u({
          message: t?.message || "Validation error",
          statusCode: t?.statusCode || l.BAD_REQUEST,
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
}, z = m("zod", ({ extendServiceOptions: e, extendRouterOptions: t }) => {
  t({ zodObject: a }), e({ zodObject: a });
});
export {
  a as zodObject,
  z as zodPlugin
};
