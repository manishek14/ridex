// Tailwind v4 — فقط @tailwindcss/postcss لازمه
// autoprefixer نباید اینجا باشه چون با Tailwind v4 تداخل داره
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
