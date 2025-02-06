import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.ts",
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
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
                        'useRemember',
                        'useForm',
                        'router',
                    ],
                },
            ],
            dirs: ["resources/js/Composables", "resources/js/Utils"],
            dts: ".inertia/imports.d.ts",
        }),
    ],
});
