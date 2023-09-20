import axios from 'axios';

const API_URL_PROD = 'http://127.0.0.1:8000/auth';

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string> => {

  const form = new FormData();
  form.append('username', username);
  form.append('password', password)
  const response = await axios.post(`${API_URL_PROD}/token`, form);

  //check if the response is valid
  if (response.status !== 200) {
    throw new Error('Invalid response from server!');
  }

  return response.data.token;
};
