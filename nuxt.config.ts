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
  css: ["~/assets/css/global.css", "~/assets/css/main.css"],

  // Nuxt plugins
  plugins: ["~/plugins/session.server.ts"],

  // Environment variables
  runtimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },

  // Nuxt App configuration
  app: {
    // Set default configuration for <head> on every page
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },

  // Nuxt Icons
  icon: {
    customCollections: [
      {
        prefix: "oeplan",
        dir: "./assets/icons",
      },
    ],
  },

  // Color mode
  colorMode: {
    dataValue: "theme",
    storageKey: "theme",
  },

  modules: ["@nuxt/icon", "@nuxt/ui"],
});
