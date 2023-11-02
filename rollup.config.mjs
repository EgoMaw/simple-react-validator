import dev from "rollup-plugin-dev";
import copy from "rollup-plugin-copy";
import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { uglify } from "rollup-plugin-uglify";

import { glob } from "glob";
import path from "node:path";
import { camelCase, upperFirst } from "lodash-es";
import pack from "./package.json" assert { type: "json" };


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
                configFile: "./.babelrc",
                babelHelpers: "bundled",
            }),
            uglify({
                mangle: true,
                output: {
                    comments: function (node, comment) {
                        if (comment.type === "comment2") {
                            // multiline comment
                            return /@preserve|@license|@cc_on|simple react validator/i.test(comment.value);
                        }

                        return false;
                    },
                },
            }),
        ],
    };
});

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
                configFile: "./.babelrc",
                babelHelpers: "bundled",
            }),
            uglify({
                mangle: true,
                output: {
                    comments: function (node, comment) {
                        if (comment.type === "comment2") {
                            // multiline comment
                            return /@preserve|@license|@cc_on|simple react validator/i.test(comment.value);
                        }

                        return false;
                    },
                },
            }),
            dev({ dirs: ["dist/umd", "docs"], spa: "docs/index.html" }),
        ],
    },
    ...localeConfigs,
];
