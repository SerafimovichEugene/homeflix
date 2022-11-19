module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // https://huafu.github.io/ts-jest/user/config/tsConfig
    },
  },
  // collectCoverageFrom: ['src_migrate/**/*.ts'],
  // coverageReporters: ['lcov', 'text'],
  // coverageThreshold: {
  //   global: {
  //     statements: 0,
  //     branches: 0,
  //     functions: 0,
  //     lines: 0,
  //   },
  // },
  // globalSetup: '<rootDir>/.bin/jest-global-setup',
  // globalTeardown: '<rootDir>/.bin/jest-global-teardown',
  // setupFiles: ['<rootDir>/.bin/jest-setup-env'],
  roots: ['<rootDir>/src_migrate/'],
  testEnvironment: 'node',
  testRegex: '.+\\.test\\.ts$',
  resetModules: true,
  resetMocks: true,
  restoreMocks: false,
  testTimeout: 80000,
};
