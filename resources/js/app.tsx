import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import { ThemeProvider } from "./components/theme-provider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        function NewApp() {
            // hacky, but there is no normal app component, works
            return (
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <App {...props}></App>
                </ThemeProvider>
            );
        }

        root.render(<NewApp />);
    },
    progress: {
        color: "#4B5563",
    },
});
