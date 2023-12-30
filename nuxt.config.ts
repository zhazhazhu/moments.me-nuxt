// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // extends: ["@nuxt/ui-pro"],
  modules: ["@nuxt/content", "@nuxt/ui", "@vueuse/nuxt", "dayjs-nuxt"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: ["~/styles/index.css"],

  ui: {
    icons: ["mdi", "ph", "tabler", "vscode-icons", "icon-park-solid"],
  },

  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "github-light",
        // Theme used if `html.dark`
        dark: "github-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
    },
  },

  devtools: { enabled: true },
});
