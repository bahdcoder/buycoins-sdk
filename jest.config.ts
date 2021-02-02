export default {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/tests/helpers'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  restoreMocks: true,
  rootDir: './src',
  testEnvironment: 'node',
}
