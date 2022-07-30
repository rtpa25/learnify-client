import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

let axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
});

Session.addAxiosInterceptors(axiosInstance);

export default axiosInstance;
