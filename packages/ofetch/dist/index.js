import { createPlugin as c } from "nixle";
import { ofetch as r } from "ofetch";
const n = (t) => {
  const o = r.create(t || {});
  return c("ofetch", ({ extendServiceContext: e }) => {
    e({ ofetch: o });
  });
};
export {
  n as ofetchPlugin
};
