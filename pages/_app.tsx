import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import { frontendConfig } from '../config/frontendConfig';
import { Provider } from 'react-redux';
import { store } from '../store';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SuperTokensWrapper>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SuperTokensWrapper>
  );
}

export default MyApp;
