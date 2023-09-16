import { API_URL_DEV, API_URL_PROD } from '../constants';

const getApiUrl = () => {
  if (window.location.hostname === 'localhost') {
    return API_URL_DEV;
  }
  return API_URL_PROD;
};

export default getApiUrl;
