module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      exclude: /node_modules/,
      plugins: ['react-annotated'],
    },
  ],
};
