import { createProvider as d } from "nixle";
const n = d((t) => ({
  request: (r, s, a) => t[r](s, async (o, e) => {
    e.send(await a({ req: o, res: e, setStatusCode: e.status, setHeader: e.setHeader }));
  }),
  server: t
}));
export {
  n as expressProvider
};
