const config = {
  transform: {
    // We need to transform both ts and js files to support node_modules ES6
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest'],
    '^.+\\.svg$': 'jest-transform-stub'
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|js|tsx)',
    '**/?(*.)+(test).+(ts|js|tsx)',
    '!**/test-data.+(ts|tsx)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@common(.*)$': '<rootDir>/src/common$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@api(.*)$': '<rootDir>/src/api$1',
    '^@views(.*)$': '<rootDir>/src/views$1',
    '^@static(.*)$': '<rootDir>/src/static$1',
    '^@root(.*)$': '<rootDir>/src$1',
    '\\.(css|css.ts|css.js)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/configs/tests/jest.setup.ts']
};

module.exports = config;
