// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  ui: {
    icons: ["mdi"],
  },
  css: ["~/styles/index.css"],
  modules: ["@nuxt/ui"],
  devtools: { enabled: true },
});
