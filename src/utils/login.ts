// utils/api.ts
import axios from './axios';

interface LoginCredentials {
  username: string;
  password: string;
}

export const loginUser = async ({ username, password }: LoginCredentials) => {
  const response = await axios.post('/auth/login', { username, password });
  return response.data; // Assume the response returns user data
};
