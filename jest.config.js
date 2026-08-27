const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};
// Add this line pointing to your setup file
    setupFilesAfterEnv: ['<rootDir>/force-app/test/jest-mocks/jest.setup.js']
