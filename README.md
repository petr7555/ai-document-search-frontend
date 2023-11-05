# AI Document Search Frontend

[![Lint and test](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/lint-and-test.yml)
[![Azure Static Web Apps CI/CD](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/azure-static-web-apps-polite-meadow-040edd103.yml/badge.svg)](https://github.com/petr7555/ai-document-search-frontend/actions/workflows/azure-static-web-apps-polite-meadow-040edd103.yml)

The frontend is deployed at https://polite-meadow-040edd103.3.azurestaticapps.net.
The deployment is automatic on push to the `master` branch.

## How to run locally

- `npm install`
- `npm start`
- When using [MSW](#mocking), log in with username `user` and password `pass`. When not using MSW, log in with username and password configured on the backend.

The frontend will be running on http://localhost:3000/.

## Testing

### Unit tests

- `npm test`

### Cypress E2E tests

- start the frontend locally (see above)
- `npm run cypress:open`
    - opens the Cypress application for manual running of E2E tests in the browser
    - if you want to run the tests in the headless mode, use `npm run cypress:run` instead

## Linting

- `npm run lint` - checks code using ESLint and Prettier
- `npm run lint:fix` - runs ESLint and Prettier and fixes all fixable errors

## Project structure and design

### Component library

The frontend uses [MUI](https://mui.com/) React component library.
The components are located in the [`src/pages`](src/pages) and [`src/components`](src/components) directories.
All styling is done using the `sx` prop. The usage of basic HTML elements is replaced by MUI `Box` component which has the `sx` prop.

The theme is defined in the [`src/utils/theme.ts`](src/utils/theme.ts) file.
The message bubbles colors are defined in the [`src/utils/constants.ts`](src/utils/constants.ts) file.

### Mocking

The frontend is using [MSW](https://mswjs.io/) for mocking API calls. The mocks are configured in the [`src/mocks/handlers.ts`](src/mocks/handlers.ts) file.
The mock service worker is enabled only in the development mode and if the `useMswInDev` variable is set to `true` (see [`src/index.tsx`](src/index.tsx)).

### Authentication

The frontend uses Bearer token to authenticate with the backend. The token is stored in the local storage.
See the [`src/hooks/useAuth.tsx`](src/hooks/useAuth.tsx) file for more details.

The token is automatically sent in the `Authorization` header with every API call (see [`src/index.tsx`](src/index.tsx)).

### API communication

The frontend uses [axios](https://axios-http.com/) HTTP client instead of the built-in `fetch` API.
The base URL is set in the [`src/index.tsx`](src/index.tsx) file and is dependent on the environment.
Therefore, the API calls need to specify only path (e.g. `/conversation`).

All API calls are defined in the [`src/api`](src/api) directory.
They all return generic [`ApiResponse<T>`](src/api/utils/apiResponse.ts).
This makes it easy to handle responses and errors in the components.

For OpenAPI specification of the backend API, see https://ai-document-search-backend.azurewebsites.net/docs.

### Error handling

The frontend uses [`src/hooks/useError.tsx`](src/hooks/useError.tsx) hook to handle errors.
On details on how to use it, see e.g. [`src/pages/LoginPage.tsx`](src/pages/LoginPage.tsx).
Setting the error will display a unified alert modal at the top of the page that will be automatically closed after 4 seconds (see [`src/components/ApiErrorSnackbar.tsx`](src/components/ApiErrorSnackbar.tsx)).

### Testing

**Unit tests** use [Jest](https://jestjs.io/).
Currently, there is only one unit test ([`src/utils/getApiUrl.test.ts`](src/utils/getApiUrl.test.ts)).

**Component tests** use Jest and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).
Currently, there is only one component test ([`src/App.test.tsx`](src/App.test.tsx)).

The main focus is on **E2E tests** which leverage [Cypress](https://www.cypress.io/).
They are located in the [`cypress/e2e`](cypress/e2e) directory.
According to the Cypress best practices, the tests use `cy.getBySel` to locate page elements by their `data-cy` attribute.
See [`cypress/support/commands.ts`](cypress/support/commands.ts) for more details.

MSW is in use even when running the E2E tests. This is useful because we can reuse the same mocks during development and testing.
The limitation is that the `cy.intercept` does not work properly, and it is not possible, for example, to intercept a `GET` request to `/conversation` and wait for it to complete.

### CI/CD

On every push, GitHub Actions run linting, unit tests, and E2E tests (see [`.github/workflows/lint-and-test.yml`](.github/workflows/lint-and-test.yml)).

On every push to the `master` branch, GitHub Actions deploy the frontend to Azure Static Web Apps.
On every pull request, GitHub Actions deploy the frontend to a temporary URL to Azure Static Web Apps.
The temporary URL is displayed as a pull request comment.
See [`.github/workflows/azure-static-web-apps-polite-meadow-040edd103.yml`](.github/workflows/azure-static-web-apps-polite-meadow-040edd103.yml).

### PWA

The application can be installed as a progressive web application. The layout is responsive and works well on mobile devices.
