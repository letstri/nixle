import { createPlugin as d, createError as i, StatusCode as m } from "nixle";
import * as r from "zod";
const s = async (t, e) => {
  try {
    return await r.object(typeof t == "function" ? t(r.z) : t).parseAsync(t);
  } catch (a) {
    const c = a;
    i({
      message: e?.message || "Validation error",
      statusCode: e?.statusCode || m.BAD_REQUEST,
      details: c.errors.reduce(
        (n, o) => ({
          ...n,
          [o.path.join(".")]: o.message
        }),
        {}
      )
    });
  }
}, g = d("zod", ({ extendServiceOptions: t, extendRouterOptions: e }) => {
  t({ zodObject: s }), e({ zodObject: s });
});
export {
  s as zodObject,
  g as zodPlugin
};
