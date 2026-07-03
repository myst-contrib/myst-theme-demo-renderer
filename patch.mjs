import { readFileSync, writeFileSync, cpSync } from "node:fs";
import path from "node:path";

const buildPath = path.join(import.meta.dirname, "demo", "_build", "site");
const configPath = path.join(buildPath, "config.json");
const config = JSON.parse(readFileSync(configPath));
config.remotes = [
  {
    name: "mf_demo_anywidget",
    entry: "/anywidget/mf_demo_anywidget.js",
  },
  {
    name: "mf_demo_basic_div",
    entry: "/basic-div/mf_demo_basic_div.js",
  },
];
writeFileSync(configPath, JSON.stringify(config));

const publicPath = path.join(buildPath, "public");
cpSync(
  path.join(import.meta.dirname, "anywidget", "dist"),
  path.join(publicPath, "anywidget"),
  { recursive: true },
);

cpSync(
  path.join(import.meta.dirname, "basic-div", "dist"),
  path.join(publicPath, "basic-div"),
  { recursive: true },
);
