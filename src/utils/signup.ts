import axios from './axios';
interface SignupCredentials {
    username: string;
    password: string;
    confirmPassword: string;
  }
  
  export const signupUser = async ({ username, password,confirmPassword }: SignupCredentials) => {
    const response = await axios.post('/auth/signup', { username, password,confirmPassword });
    return response.data; // Assume the response returns user data
  };