import {
  Google,
  init,
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appInfo';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      init({
        signInAndUpFeature: {
          providers: [Google.init()],
          signUpForm: {
            formFields: [
              {
                id: 'username',
                label: 'Username',
                placeholder: 'Username',
              },
            ],
          },
        },
        palette: {
          primary: '#000000',
        },
      }),
      SessionReact.init(),
    ],
  };
};
