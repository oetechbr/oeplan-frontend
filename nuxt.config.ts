// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  // Enable Nuxt devtools for development.
  devtools: {
    enabled: true,
  },

  // Development server configuration
  devServer: {
    port: 4712,
  },

  // Style files
  css: ["~/assets/css/global.css"],

  modules: ["@nuxt/icon"],
});
