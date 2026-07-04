// @ts-check
import path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('@rspack/core').Configuration} */

export default defineConfig({
  entry: "./src/index.js",
  context: import.meta.dirname,
  output: {
    // set uniqueName explicitly to make react-refresh works
    uniqueName: "mf_demo_anywidget",
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        include: path.resolve(import.meta.dirname, "src"),
        use: {
          loader: "builtin:swc-loader",
          options: {
            detectSyntax: "auto",
            jsc: {
              transform: {
                react: {
                  runtime: "automatic",
                  refresh: !isProduction,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // exclude container entry from html, to use the correct HMR handler
      excludeChunks: ["mf_demo_anywidget"],
    }),
    new rspack.container.ModuleFederationPlugin({
      // A unique name
      name: "mf_demo_anywidget",
      // List of exposed modules
      exposes: {
        ".": "./src/index",
      },

      // list of shared modules
      // generated from book thrmr package.json via
      // jq '.dependencies | to_entries | map({key: .key, value: {singleton:true,import:false}}) | from_entries' package.json | wl-copy
      shared: {
        "@myst-theme/anywidget": {
          singleton: true,
          import: false,
        },
        "@myst-theme/common": {
          singleton: true,
          import: false,
        },
        "@myst-theme/frontmatter": {
          singleton: true,
          import: false,
        },
        "@myst-theme/icons": {
          singleton: true,
          import: false,
        },
        "@myst-theme/jupyter": {
          singleton: true,
          import: false,
        },
        "@myst-theme/landing-pages": {
          singleton: true,
          import: false,
        },
        "@myst-theme/providers": {
          singleton: true,
          import: false,
        },
        "@myst-theme/search": {
          singleton: true,
          import: false,
        },
        "@myst-theme/search-minisearch": {
          singleton: true,
          import: false,
        },
        "@myst-theme/site": {
          singleton: true,
          import: false,
        },
        "@myst-theme/styles": {
          singleton: true,
          import: false,
        },
        "myst-spec-ext": {
          singleton: true,
          import: false,
        },
        "myst-to-react": {
          singleton: true,
          import: false,
        },
        "myst-common": {
          singleton: true,
          import: false,
        },
        "myst-config": {
          singleton: true,
          import: false,
        },
        "myst-migrate": {
          singleton: true,
          import: false,
        },
        "thebe-core": {
          singleton: true,
          import: false,
        },
        react: {
          singleton: true,
          import: false,
        },
      },
    }),
    !isProduction && new ReactRefreshRspackPlugin(),
  ],
  devServer: {
    port: 8081,
    // add CORS header for HMR chunk (xxx.hot-update.json and xxx.hot-update.js)
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
