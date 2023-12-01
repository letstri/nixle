import { createPlugin as c } from "nixle";
const n = c("cors", ({ app: r, log: o }) => (o("cors plugin loaded"), r));
export {
  n as corsPlugin
};
