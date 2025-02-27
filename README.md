# Auto-importing InertiaJS (Vue)

A basic showcase of how to implement auto-import files in an InertiaJS (Vue) project with Laravel.

## Overview

This setup allows you to automatically import Vue components, composables, and utilities in your InertiaJS project without manually specifying imports in each file.

## Important Files to Check

### 1. `vite.config.js`

Configures Vite to automatically scan and import components, composables, and utilities. This file integrates the auto-import plugin to handle component registration.

### 2. `package.json`

Lists the dependencies required for auto-importing functionality, including `unplugin-vue-components` and `unplugin-auto-import`. Make sure these plugins are installed.

### 3. `tsconfig.json`

Ensures TypeScript recognizes the auto-imported components and functions, enabling full type support and IDE autocompletion.

### 4. `.inertia`

This folder contains files generated by Vite for auto-importing. These files manage the internal mapping of components, making them available globally in your project.

## Setup Instructions

1. **Install Required Packages**

    ```bash
    npm install -D unplugin-vue-components unplugin-auto-import
    ```

2. **Configure Vite**
   Modify your `vite.config.js` to include the auto-import setup:

    ```js
    import Components from "unplugin-vue-components/vite";
    import AutoImport from "unplugin-auto-import/vite";

    export default defineConfig({
        plugins: [
            //...
            Components({
                dirs: ["resources/js/Components"],
                extensions: ["vue"],
                deep: true,
                dts: ".inertia/components.d.ts",
                directoryAsNamespace: true,
                resolvers: [
                    (name) => {
                        if (name.startsWith("Inertia")) {
                            return {
                                name,
                                importName: name.replace("Inertia", ""),
                                path: "@inertiajs/vue3",
                            };
                        }
                    },
                ],
            }),
            AutoImport({
                imports: [
                    "vue",
                    {
                        "@inertiajs/vue3": [
                            "usePage",
                            "useRemember",
                            "useForm",
                            "router",
                        ],
                    },
                ],
                dirs: ["resources/js/Composables", "resources/js/Utils"],
                dts: ".inertia/imports.d.ts",
            }),
        ],
    });
    ```

3. **Update `tsconfig.json`**
   Add the generated type declarations to TypeScript configuration:

    ```json
    {
        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
                "@/*": ["./resources/js/*"],
            },
            "types": [
                "vite/client",
                "vue",
                "./.inertia/index.d.ts"
            ]
        },
        "include": [
            // ...
            ".inertia/index.d.ts",
            ".inertia/shims-vue.d.ts",
        ]
    }
    ```

4. **Run Your Project**
   Start the development server to generate the auto-import files:
    ```bash
    npm run dev
    ```

## Usage

After completing the setup, you can use your components and composables without explicitly importing them.
