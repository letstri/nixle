import { fromNodeMiddleware as c } from "h3";
import { createProvider as i } from "nixle";
const h = i((o) => {
  const e = (r) => (d, s) => o.router[r](
    d,
    c((p, t) => (t.setHeader("x-powered-by", "Nixle"), s({ req: p, res: t, setStatusCode: (a) => t.statusCode = a })))
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
