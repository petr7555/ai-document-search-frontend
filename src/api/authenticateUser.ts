import axios from 'axios';

type AuthSuccess = {
  access_token: string;
  token_type: string;
};

export type AuthResponse =
  | {
      ok: true;
      access_token: string;
      token_type: string;
    }
  | {
      ok: false;
      detail: string;
    };

export const authenticateUser = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const form = new FormData();
  form.append('username', username);
  form.append('password', password);

  try {
    const response = await axios.post<AuthSuccess>('/auth/token', form);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
    return {
      ok: true,
      ...response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        detail: 'Invalid credentials'
      };
    } else {
      return {
        ok: false,
        detail: 'Unknown error'
      };
    }
  }
};
