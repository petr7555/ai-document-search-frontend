# AI Document Search Frontend

[![Lint and test](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/lint-and-test.yml)
[![Azure Static Web Apps CI/CD](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/azure-static-web-apps-polite-meadow-040edd103.yml/badge.svg)](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/azure-static-web-apps-polite-meadow-040edd103.yml)

The frontend is deployed at https://polite-meadow-040edd103.3.azurestaticapps.net.
The deployment is automatic on push to the `master` branch.

## How to run locally

- `npm install`
- `npm start`

The frontend will be running on http://localhost:3000/.

## Testing

### Unit tests

- `npm test`

### Cypress E2E tests

- start the frontend locally (see above)
- `npm run cypress:open`
  - opens the Cypress application for manual running of E2E tests in the browser
  - if you want to run the tests in the headless mode, use `npm run cypress:run` instead
