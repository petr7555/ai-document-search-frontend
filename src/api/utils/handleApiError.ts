import axios from 'axios';
import { FailedApiResponse } from './apiResponse';

const handleApiError = (
  error: unknown,
  activity: string,
  unauthorizedMessage = 'Please log in again'
): FailedApiResponse => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    return {
      ok: false,
      detail: unauthorizedMessage
    };
  } else {
    return {
      ok: false,
      detail: `Unknown error when ${activity}`
    };
  }
};

export default handleApiError;
