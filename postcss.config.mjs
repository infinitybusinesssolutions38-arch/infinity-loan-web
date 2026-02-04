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
};
export default config;
