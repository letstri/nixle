import { createPlugin as m, createError as u, StatusCode as l } from "nixle";
import * as r from "zod";
const a = (t, e) => {
  const s = r.object(typeof t == "function" ? t(r.z) : t);
  return {
    validate: async (c) => {
      try {
        return await s.parseAsync(c);
      } catch (n) {
        const d = n;
        u({
          message: e?.message || "Validation error",
          statusCode: e?.statusCode || l.BAD_REQUEST,
          details: d.errors.reduce(
            (i, o) => ({
              ...i,
              [o.path.join(".")]: o.message
            }),
            {}
          )
        });
      }
    }
  };
}, f = m("zod", ({ extendServiceOptions: t, extendRouterOptions: e }) => {
  t({ zodObject: a }), e({ zodObject: a });
});
export {
  a as zodObject,
  f as zodPlugin
};
