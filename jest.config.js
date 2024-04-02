// jest.config.js
module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.js",
    ],
    // Directorio donde se guardarán los informes de cobertura
    coverageDirectory: "coverage",
    // Ignorar archivos en pruebas
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/index.js'],
    // Ignorar archivos en cobertura de código
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/index.js']
}
  