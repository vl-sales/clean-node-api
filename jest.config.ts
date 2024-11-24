import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/**/protocols/*',
    '!<rootDir>/src/**/protocols/*',
    '!<rootDir>/src/domain/models/**',
    '!<rootDir>/src/domain/useCases/**',
    '!<rootDir>/src/presentation/helpers/validators/validation.ts',
    '!<rootDir>/src/data/protocols/**',
    '!<rootDir>/src/**/*-protocols.ts'
  ],
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
