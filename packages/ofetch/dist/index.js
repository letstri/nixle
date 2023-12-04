import { createPlugin as e } from "nixle";
import { ofetch as c } from "ofetch";
const h = (o) => e("ofetch", ({ extendServiceOptions: t }) => {
  t({ ofetch: c.create(o || {}) });
});
export {
  h as ofetchPlugin
};
