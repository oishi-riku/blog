/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  clearMocks: true,
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src/'],
  globalSetup: '<rootDir>/jest.setupEnv.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
