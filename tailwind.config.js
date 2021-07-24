module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        192: "48rem",
      },
      gridTemplateRows: {
        // This is needed so that we don't have awkward spacing between our
        // "labels" for the edit modal.
        auto1fr: "auto 1fr auto",
      },
      cursor: {
        grab: "grab",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
