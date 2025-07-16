module.exports = {
  preset: 'react-native',
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-redux|@reduxjs/toolkit|@react-native|@react-navigation|@testing-library|react-native|@react-native-firebase)/)"
  ],
};
