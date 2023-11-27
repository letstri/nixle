import { createProvider as c } from "nixle";
const h = c((o) => {
  const e = (s) => (r, d) => o[s](r, async (a, t) => {
    t.setHeader("x-powered-by", "Nixle"), t.send(await d({ req: a, res: t, setStatusCode: t.status }));
  });
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
  h as expressProvider
};
