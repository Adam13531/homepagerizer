module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        // This is needed so that we don't have awkward spacing between our
        // "labels" for the edit modal.
        auto1fr: "auto 1fr auto",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
