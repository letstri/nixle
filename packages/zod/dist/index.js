import { createPlugin as u, createError as y, StatusCode as d } from "nixle";
import { z as s } from "zod";
const p = (t, o) => {
  const i = (r, { partial: n }) => {
    if (typeof t == "function") {
      const e = t(s);
      return e instanceof s.ZodObject ? n ? e.partial().parseAsync(r) : e.parseAsync(r) : e instanceof s.ZodEffects ? (n && console.warn("Partial validation is not supported with ZodEffects"), e.parseAsync(r)) : n ? s.object(e).partial().parseAsync(r) : s.object(e).parseAsync(r);
    }
    return t instanceof s.ZodObject ? n ? t.partial().parseAsync(r) : t.parseAsync(r) : n ? s.object(t).partial().parseAsync(r) : s.object(t).parseAsync(r);
  }, a = async (r) => {
    try {
      return await r();
    } catch (n) {
      const e = n, f = e.errors.filter(({ path: c }) => c).reduce(
        (c, l) => ({
          ...c,
          [l.path.join(".")]: l.message
        }),
        {}
      );
      throw y({
        message: o?.message || "Validation error",
        statusCode: o?.statusCode || d.BAD_REQUEST,
        details: {
          ...f ? { paths: f } : { errors: e.errors }
        }
      });
    }
  };
  return {
    validate: async (r) => a(() => i(r, { partial: !1 })),
    validateOptional: async (r) => a(() => i(r, { partial: !0 })),
    $infer: {},
    $inferOptional: {}
  };
}, O = () => u("zod", ({ extendServiceContext: t, extendRouterContext: o }) => {
  o({ zodObject: p }), t({ zodObject: p });
});
export {
  p as zodObject,
  O as zodPlugin
};
