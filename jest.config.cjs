module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
		// setupFiles: ["/home/File-Timestamp-App/jest.setup.ts"],
    setupFiles: ["<rootDir>/jest.setup.ts"],
  };
