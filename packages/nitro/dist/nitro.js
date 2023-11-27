import { fromNodeMiddleware as p } from "h3";
import { createProvider as m } from "scalex";
const h = m((o) => {
  const e = (r) => (d, s) => o.router[r](
    d,
    p((a, t) => (t.setHeader("x-powered-by", "ScaleX"), s({ req: a, res: t, setStatusCode: (c) => t.statusCode = c })))
  );
  return {
    methods: {
      get: e("get"),
      post: e("post"),
      patch: e("patch"),
      put: e("put"),
      delete: e("delete")
    },
    server: o
  };
});
export {
  h as nitroProvider
};
