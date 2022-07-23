import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
  AddLearningModal,
  MainHeader,
  NavBar,
  LearningsContainer,
} from '../components/zExporter';
import { Add } from '@material-ui/icons';
import { ThirdPartyEmailPasswordAuth } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {
  doesSessionExist,
  getUserId,
} from 'supertokens-auth-react/recipe/session';
import { User } from '../interfaces/user.interface';
import { useAppDispatch } from '../hooks/redux';
import { setCurrentUserData } from '../store/slices/currentUser.slice';
import axios from 'axios';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    setShowModal(false);
    enableBodyScroll(document.querySelector('#modal-root')!);
  };

  const openModalHandler = () => {
    setShowModal(true);
    disableBodyScroll(document.querySelector('#modal-root')!);
  };

  useEffect(() => {
    async function getUserInfo() {
      if (await doesSessionExist()) {
        const supertokensId = await getUserId();
        const { data } = await axios.get<User>(
          `http://localhost:8080/users/me?supertokensId=${supertokensId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setCurrentUserData({ user: data }));
      }
    }
    getUserInfo();
  }, []);

  return (
    <ThirdPartyEmailPasswordAuth>
      <NavBar />
      <div className='py-4 px-8'>
        <MainHeader heading={'My Learnings'} />
        <LearningsContainer />
      </div>
      <AddLearningModal show={showModal} onClose={closeModalHandler} />
      <button
        className='fixed bottom-0 right-0 p-4 mx-12 my-8 bg-rose-600 text-white rounded-full duration-150 hover:bg-rose-800 shadow-xl'
        onClick={openModalHandler}>
        <Add />
      </button>
    </ThirdPartyEmailPasswordAuth>
  );
};

export default Home;
