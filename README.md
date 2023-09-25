# AI Document Search Frontend

[![Lint and test](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/lint-and-test.yml)
[![Azure Static Web Apps CI/CD](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/azure-static-web-apps-polite-meadow-040edd103.yml/badge.svg)](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/azure-static-web-apps-polite-meadow-040edd103.yml)

The frontend is deployed at https://polite-meadow-040edd103.3.azurestaticapps.net.
The deployment is automatic on push to the `master` branch.

## How to run locally
- `npm install`
- `npm start`

The frontend will be running on http://localhost:3000/.

## Run unit tests
- `npm test`

## Run Component tests in terminal
- `npx cypress run --component`

## Run E2E tests in terminal
- `npx cypress run`

Runs Cypress end-to-end tests in the terminal. Make sure the frontend is running before testing.

## Manual testing (run Cypress application)
- `npx cypress open`

Opens the Cypress application for manual running of E2E tests and Component tests in the browser. Make sure the frontend is running before testing.
