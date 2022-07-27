import { __isProd__ } from '../utils/isProd';

export const appInfo = {
  appName: 'learnify',
  apiDomain: __isProd__ ? '' : 'http://localhost:8080',
  websiteDomain: __isProd__ ? '' : 'http://localhost:3000',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
};
