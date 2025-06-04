export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: [
          "rounded-lg font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
          "transition-colors",
        ],
      },
      defaultVariants: {
        size: "lg",
      },
    },

    input: {
      slots: {
        base: [
          "w-full rounded-lg border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors",
        ],
      },
      defaultVariants: {
        size: "lg",
      },
    },

    select: {
      defaultVariants: {
        size: "lg",
      },
    },

    selectMenu: {
      defaultVariants: {
        size: "lg",
      },
    },

    colors: {
      primary: "primary",
      neutral: "neutral",
    },
  },
});
