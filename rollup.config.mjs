import copy from "rollup-plugin-copy";
import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { minify } from "rollup-plugin-esbuild";
import serve from "rollup-plugin-serve";

import { glob } from "glob";
import path from "node:path";
import { camelCase, upperFirst } from "lodash-es";
import pack from "./package.json" assert { type: "json" };

const isDev = process.env.BUILD === "development";


const defaultBuildOptions = {
    entryFileNames: "[name].js",
    globals: {
        react: "react",
    },
    banner: `/** Simple React Validator v${pack.version} | Created By Dockwa | Edited by EgoMaw | MIT License | 2017 - Present */`,
};


function capitalizeFilename(file) {
    return upperFirst(camelCase(path.basename(file, ".js")));
}


const localeConfigs = glob.sync("src/locale/*.js").map((file) => {
    return {
        input: file,
        external: [/simple-react-validator/],
        output: [
            {
                dir: "dist/umd/locale",
                name: `SimpleReactValidatorLocale${capitalizeFilename(file)}`,
                globals: function (id) {
                    return id.endsWith("simple-react-validator") ? "SimpleReactValidator" : id;
                },
                format: "umd",
            },
            {
                dir: "dist/esm/locale",
                format: "es",
            },
        ],
        plugins: [
            babel({
                exclude: "node_modules/**",
                babelHelpers: "bundled",
            }),
            minify({
                banner: `/** Simple React Validator v${pack.version} | Created By Dockwa | Edited by EgoMaw | MIT License | 2017 - Present */`
            }),
        ],
    };
});
/**
 * @type {import('rollup').RollupOptions}
 */
export default [
    {
        input: "src/simple-react-validator.js",
        external: ["react", /@babel\/runtime/],
        output: [
            {
                dir: "dist/umd",
                name: "SimpleReactValidator",
                format: "umd",
                ...defaultBuildOptions,
            },
            {
                dir: "dist/esm",
                format: "es",
                ...defaultBuildOptions,
            },
        ],
        plugins: [
            replace({
                __VERSION__: pack.version,
                preventAssignment: true,
            }),
            copy({
                targets: [{ src: "src/index.d.ts", dest: "dist" }],
            }),
            babel({
                exclude: "node_modules/**",
                babelHelpers: "bundled",
            }),
            minify({
                banner: `/** Simple React Validator v${pack.version} | Created By Dockwa | Edited by EgoMaw | MIT License | 2017 - Present */`
            }),
            isDev && serve({ contentBase: ['docs', 'dist'], verbose: true }),
        ],
    },
    ...localeConfigs,
];
