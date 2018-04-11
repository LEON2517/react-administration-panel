module.exports = {
  rootDir: '..',
  collectCoverageFrom: [
    'src/**/*.js',
    'back/**/*.js',
    '!**/node_modules/**',
    '!**/*.stories.js',
    '!**/*.spec.js',
  ],
  modulePaths: ['src', 'back', 'common'],
  setupFiles: [
    'raf/polyfill',
    './test/common.js',
  ],
};
