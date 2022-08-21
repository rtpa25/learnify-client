import { FC, useState } from 'react';
import { PowerSettingsNew } from '@material-ui/icons';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Loader from './Loader';

const NavBar: FC = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);

  async function logoutHandler() {
    setLogoutLoading(true);
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('SUPERTOKENS ERROR', error);
    }
    setLogoutLoading(false);
  }

  return (
    <div className='flex justify-between bg-rose-600 text-white py-4 px-8 z-10 h-fit'>
      <h3
        className='text-xl semi cursor-pointer'
        onClick={() => {
          window.location.href = '/';
        }}>
        Learnify
      </h3>
      <div className='cursor-pointer' onClick={logoutHandler}>
        {logoutLoading ? <Loader /> : <PowerSettingsNew />}
      </div>
    </div>
  );
};

export default NavBar;
