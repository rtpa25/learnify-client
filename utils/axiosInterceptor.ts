import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

let axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

Session.addAxiosInterceptors(axiosInstance);

export default axiosInstance;
