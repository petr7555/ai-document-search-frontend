import axios from 'axios';

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string> => {
  const form = new FormData();
  form.append('username', username);
  form.append('password', password);

  try {
    const response = await axios.post('/auth/token', form);

    return response.data.token;
  } catch (error) {
    return JSON.stringify(error, null, 2);
  }
};
