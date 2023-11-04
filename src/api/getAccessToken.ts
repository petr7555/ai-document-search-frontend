import axios from 'axios';
import { ApiResponse } from './utils/apiResponse';
import handleApiError from './utils/handleApiError';

export type AccessToken = {
  access_token: string;
  token_type: string;
};

export const getAccessToken = async (
  username: string,
  password: string
): Promise<ApiResponse<AccessToken>> => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  try {
    const response = await axios.post<AccessToken>('/auth/token', formData);
    return {
      ok: true,
      data: response.data
    };
  } catch (error) {
    return handleApiError(error, 'logging in', 'Invalid credentials');
  }
};
