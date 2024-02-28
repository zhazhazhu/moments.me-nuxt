// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // extends: ["@nuxt/ui-pro"],
  modules: ["@nuxt/content", "@nuxt/ui", "@vueuse/nuxt", "dayjs-nuxt"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: ["~/styles/index.css", "gitalk/dist/gitalk.css"],

  ui: {
    icons: [
      "mdi",
      "ph",
      "tabler",
      "vscode-icons",
      "icon-park-solid",
      "fluent-emoji",
      "material-symbols",
      "material-symbols-light",
    ],
  },

  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
  },

  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "vitesse-light",
        // Theme used if `html.dark`
        dark: "vitesse-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
    },
  },

  runtimeConfig: {
    public: {
      clientID: process.env.NUXT_CLIENT_ID,
      clientSecret: process.env.NUXT_CLIENT_SECRET,
    },
  },

  devtools: { enabled: true },
});
