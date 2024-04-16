module.exports = {
  presets: ["module:@react-native/babel-preset"],
  // -------------> imports
  // plugins: [
  //   [
  //     "module:react-native-dotenv",
  //     {
  //       moduleName: "@env",
  //       path: ".env",
  //     },
  //   ],
  // ],
  // --->
  // -------------> process.env
  plugins: [
    ["module:react-native-dotenv"]
  ]
  // --->
};