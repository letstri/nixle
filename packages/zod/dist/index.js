import { createPlugin as y, createError as p, StatusCode as d } from "nixle";
import { z as s } from "zod";
const u = (t, o) => {
  const a = (r, { partial: n }) => {
    if (typeof t == "function") {
      const e = t(s);
      return e instanceof s.ZodObject ? n ? e.partial().parseAsync(r) : e.parseAsync(r) : e instanceof s.ZodEffects ? (n && console.warn("Partial validation is not supported with ZodEffects"), e.parseAsync(r)) : n ? s.object(e).partial().parseAsync(r) : s.object(e).parseAsync(r);
    }
    return t instanceof s.ZodObject ? n ? t.partial().parseAsync(r) : t.parseAsync(r) : n ? s.object(t).partial().parseAsync(r) : s.object(t).parseAsync(r);
  }, i = async (r) => {
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
      throw p({
        message: o?.message || "Validation error",
        statusCode: o?.statusCode || d.BAD_REQUEST,
        details: {
          ...f ? { paths: f } : { errors: e.errors }
        }
      });
    }
  };
  return {
    validate: async (r) => i(() => a(r, { partial: !1 })),
    validatePartial: async (r) => i(() => a(r, { partial: !0 })),
    $infer: {},
    $inferPartial: {}
  };
}, P = () => y("zod", ({ extendServiceContext: t, extendRouterContext: o }) => {
  o({ zodObject: u }), t({ zodObject: u });
});
export {
  u as zodObject,
  P as zodPlugin
};
