// const { pathsToModuleNameMapper } = require('ts-jest')
import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest'
import { Config } from '@jest/types'
import i18next from 'i18next';

i18next.init();

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    moduleNameMapper: { "react-i18next": "<rootDir>/__mocks__/react-i18next", '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy', ...pathsToModuleNameMapper(compilerOptions.paths) },
    modulePaths: [
        '<rootDir>',
        '<rootDir>/src',
    ],
    roots: [
        "<rootDir>/src/"
    ],
    rootDir: ".",
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
    automock: false,
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"
    ],
    testPathIgnorePatterns: [
        "node_modules",
        "Webvitals.ts",
        "<rootDir>/src/index.tsx",
        ".mock.ts",
        "index.ts"
    ],
    coveragePathIgnorePatterns: [
        "node_modules",
        "Webvitals.ts",
        "<rootDir>/src/index.tsx",
        ".mock.ts",
        "index.ts"
    ],
    transform: {
        "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
    },
    transformIgnorePatterns: [
        '^.+\\.module\\.(css|sass|scss)$',
    ]
}

export default config