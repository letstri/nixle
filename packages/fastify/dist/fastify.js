import { createProvider as d } from "nixle";
const n = d((t) => ({
  request: (r, a, s) => t[r](a, async (o, e) => {
    e.send(await s({ req: o, res: e, setStatusCode: e.status, setHeader: e.header }));
  }),
  server: t
}));
export {
  n as fastifyProvider
};
