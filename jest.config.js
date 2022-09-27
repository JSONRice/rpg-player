/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/common/**/*.{js,jsx,ts,tsx}',
    '**/pages/**/*.{js,jsx,ts,tsx}',
    '!**/common/**/index.ts',
    '!**/pages/**/index.ts',
    '!**/*.d.ts',
    '!**/.next/**',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/assets/lang*.js',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 39,
      branches: 41,
      lines: 39,
      functions: 36,
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(jsx|ts|tsx)$': 'babel-jest',
  },
  testTimeout: 20000,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['node_modules', '.cache'],
  moduleDirectories: ['node_modules', 'src'],
};
