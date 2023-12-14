import { createPlugin as n, createError as d, StatusCode as i } from "nixle";
import * as r from "zod";
const m = async (t, e) => {
  try {
    return await r.object(typeof t == "function" ? t(r.z) : t).parseAsync(t);
  } catch (s) {
    const a = s;
    d({
      message: e?.message || "Validation error",
      statusCode: e?.statusCode || i.BAD_REQUEST,
      details: a.errors.reduce(
        (c, o) => ({
          ...c,
          [o.path.join(".")]: o.message
        }),
        {}
      )
    });
  }
}, g = n("zod", ({ extendServiceOptions: t }) => {
  t({ zodObject: m });
});
export {
  m as zodObject,
  g as zodPlugin
};
