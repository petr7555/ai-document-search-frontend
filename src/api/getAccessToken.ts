import axios from 'axios';
import { ApiResponse } from '../types/apiResponse';

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
    console.log(error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        detail: 'Invalid credentials'
      };
    } else {
      return {
        ok: false,
        detail: 'Unknown error when logging in'
      };
    }
  }
};
