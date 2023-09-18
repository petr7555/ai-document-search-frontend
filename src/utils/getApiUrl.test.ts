import getApiUrl from './getApiUrl';

it('returns the correct API URL for development', () => {
  Object.defineProperty(window, 'location', {
    value: {
      hostname: 'localhost'
    }
  });
  expect(getApiUrl()).toEqual('http://localhost:8000');
});
/*
it('returns the correct API URL for production', () => {
  Object.defineProperty(window, 'location', {
    value: {
      hostname: 'not-localhost'
    }
  });
  expect(getApiUrl()).toEqual(
    'https://ai-document-search-backend.azurewebsites.net'
  );
});
*/
