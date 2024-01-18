import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb'
}

export default config
