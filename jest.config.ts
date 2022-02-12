process.env.TZ = 'UTC';

export default {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@spec/(.*)$': '<rootDir>/src/spec/$1',
  },
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**'],
  coveragePathIgnorePatterns: ['index.ts', 'interfaces', 'persistence', 'config'],
  setupFiles: ['<rootDir>/src/spec/setup.ts'],
};
