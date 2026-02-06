// const config = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   },
// };

// export default config;


/** @type {import('postcss-load-config').Config} */
const config = {
    darkMode: false,
    daisyui: {
        themes: ["light"], // <— Only light theme will be used
    },
    plugins: {
        '@tailwindcss/postcss': {},
    },
    onWarning(warning) {
        // Suppress @property unknown at-rule warning from daisyUI
        if (warning.text?.includes('@property') || warning.reason?.includes('@property')) {
            return;
        }
        throw warning;
    }
};
export default config;
