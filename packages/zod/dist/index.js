import { createPlugin as u, createError as m, StatusCode as g } from "nixle";
import * as r from "zod";
const s = (t, e) => {
  const a = r.object(typeof t == "function" ? t(r.z) : t);
  return async (c) => {
    try {
      return await a.parseAsync(c);
    } catch (n) {
      const d = n;
      m({
        message: e?.message || "Validation error",
        statusCode: e?.statusCode || g.BAD_REQUEST,
        details: d.errors.reduce(
          (i, o) => ({
            ...i,
            [o.path.join(".")]: o.message
          }),
          {}
        )
      });
    }
  };
}, f = u("zod", ({ extendServiceOptions: t, extendRouterOptions: e }) => {
  t({ zodObject: s }), e({ zodObject: s });
});
export {
  s as zodObject,
  f as zodPlugin
};
