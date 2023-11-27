import "fastify";
import { createProvider as c } from "nixle";
const n = c((o) => {
  const t = (r) => (s, d) => o[r](s, async (a, e) => {
    e.header("x-powered-by", "Nixle"), e.send(await d({ req: a, res: e, setStatusCode: e.status }));
  });
  return {
    methods: {
      get: t("get"),
      post: t("post"),
      patch: t("patch"),
      put: t("put"),
      delete: t("delete")
    },
    server: o
  };
});
export {
  n as fastifyProvider
};
