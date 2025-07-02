import { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleNameMapper: {
    'react-i18next': '<rootDir>/__mocks__/react-i18next',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',
    ...pathsToModuleNameMapper(compilerOptions.paths)
  },
  modulePaths: ['<rootDir>', '<rootDir>/src'],
  roots: ['<rootDir>/src/'],
  rootDir: '.',
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  automock: false,
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: [
    'node_modules',
    'Webvitals.ts',
    '<rootDir>/src/index.tsx',
    '.mock.ts',
    'index.ts',
    '<rootDir>/src/shared/auto-order-json-translations.cjs'
  ],
  coverageReporters: ['lcov', 'text', 'html'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'Webvitals.ts',
    '<rootDir>/src/index.tsx',
    '.mock.ts',
    'index.ts',
    '<rootDir>/src/shared/auto-order-json-translations.cjs'
  ],
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: { metaObjectReplacement: { url: 'https://www.url.com' } }
            }
          ]
        }
      }
    ]
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$', 'node_modules/(?!variables/.*)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

export default config
