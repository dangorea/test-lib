import babel from "rollup-plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import rollupTypescript from "@rollup/plugin-typescript";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        sourcemap: true,
        format: "cjs",
      },
      {
        file: packageJson.module,
        sourcemap: true,
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      babel({ exclude: "node_modules/**", presets: ["@babel/preset-react"] }),
      external(),
      resolve({
        jsnext: true,
        main: false,
      }),
      commonjs({ exclude: ["node_modules"] }),
      typescript({ tsconfig: "./tsconfig.json", sourceMap: false }),
      postcss(),
      rollupTypescript(),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/, "react", "react-dom", "wix-style-react"],
  },
];
