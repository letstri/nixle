import { createProvider as i } from "nixle";
const v = i((t) => ({
  request: (s, o, a) => t[s](o, ({ request: d, set: e }) => a({
    req: d,
    res: e,
    setStatusCode: (r) => e.status = r,
    setHeader: (r, u) => e.headers[r] = u
  })),
  server: t
}));
export {
  v as elysiaProvider
};
