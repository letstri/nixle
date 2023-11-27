import { createProvider as p } from "nixle";
const l = p((t) => {
  const e = (o) => (s, d) => t[o](s, ({ request: a, set: r }) => (r.headers["x-powered-by"] = "Nixle", d({ req: a, res: null, setStatusCode: (c) => r.status = c })));
  return {
    methods: {
      get: e("get"),
      post: e("post"),
      patch: e("patch"),
      put: e("put"),
      delete: e("delete")
    },
    server: t
  };
});
export {
  l as elysiaProvider
};
