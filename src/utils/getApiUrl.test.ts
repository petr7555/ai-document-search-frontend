import getApiUrl from './getApiUrl';

const realLocation = window.location;

afterEach(() => {
  jest.restoreAllMocks();
});

it('returns the correct API URL for development', () => {
  jest.spyOn(window, 'location', 'get').mockImplementation(() => ({
    ...realLocation,
    hostname: 'localhost'
  }));
  expect(getApiUrl()).toEqual('http://localhost:8000');
});

it('returns the correct API URL for production', () => {
  jest.spyOn(window, 'location', 'get').mockImplementation(() => ({
    ...realLocation,
    hostname: 'not-localhost'
  }));
  expect(getApiUrl()).toEqual(
    'https://ai-document-search-backend.azurewebsites.net'
  );
});
