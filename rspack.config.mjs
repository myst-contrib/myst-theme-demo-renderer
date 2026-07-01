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
    uniqueName: "custom_heading_renderer",
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
      excludeChunks: ["custom_heading_renderer"],
    }),
    new rspack.container.ModuleFederationPlugin({
      // A unique name
      name: "custom_heading_renderer",
      // List of exposed modules
      exposes: {
        ".": "./src/index",
      },

      // list of shared modules
      shared: [
        {
          react: {
            singleton: true, // must be specified in each config
          },
        },
      ],
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
