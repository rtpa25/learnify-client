import { FC } from 'react';
import { PowerSettingsNew } from '@material-ui/icons';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

const NavBar: FC = () => {
  async function logoutHandler() {
    await signOut();
    window.location.href = '/';
  }

  return (
    <div className='flex justify-between bg-rose-600 text-white py-4 px-8 sticky'>
      <h3 className='text-xl semi'>Learnify</h3>
      <div className='cursor-pointer' onClick={logoutHandler}>
        <PowerSettingsNew />
      </div>
    </div>
  );
};

export default NavBar;
