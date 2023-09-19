import axios from 'axios';

const API_URL_PROD = 'https://api.example.com';

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await axios.post(`${API_URL_PROD}/token`, {
    username,
    password
  });

  //check if the response is valid
  if (response.status !== 200) {
    throw new Error('Invalid response from server!');
  }

  return response.data.token;
};
