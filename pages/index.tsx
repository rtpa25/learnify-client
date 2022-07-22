import type { NextPage } from 'next';
import { useState } from 'react';
import {
  AddLearningModal,
  Learning,
  MainHeader,
  NavBar,
} from '../components/zExporter';
import { Add } from '@material-ui/icons';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <NavBar />
      <div className='py-4 px-8'>
        <MainHeader heading={'My Learnings'} />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-4'>
          <Learning
            thumbnailUrl={
              'https://www.freecodecamp.org/news/content/images/2021/07/reactcourse.png'
            }
            thumbnailAltText={'react-course'}
            courseName={'ReactJS the complete developers guide'}
            courseCreator={'freecodecamp'}
          />
          <Learning
            thumbnailUrl={
              'https://www.freecodecamp.org/news/content/images/2021/07/reactcourse.png'
            }
            thumbnailAltText={'react-course'}
            courseName={'ReactJS the complete developers guide'}
            courseCreator={'freecodecamp'}
          />
          <Learning
            thumbnailUrl={
              'https://www.freecodecamp.org/news/content/images/2021/07/reactcourse.png'
            }
            thumbnailAltText={'react-course'}
            courseName={'ReactJS the complete developers guide'}
            courseCreator={'freecodecamp'}
          />
          <Learning
            thumbnailUrl={
              'https://www.freecodecamp.org/news/content/images/2021/07/reactcourse.png'
            }
            thumbnailAltText={'react-course'}
            courseName={'ReactJS the complete developers guide'}
            courseCreator={'freecodecamp'}
          />
          <Learning
            thumbnailUrl={
              'https://www.freecodecamp.org/news/content/images/2021/07/reactcourse.png'
            }
            thumbnailAltText={'react-course'}
            courseName={'ReactJS the complete developers guide'}
            courseCreator={'freecodecamp'}
          />
        </div>
      </div>
      <AddLearningModal show={showModal} onClose={() => setShowModal(false)} />
      <button
        className='fixed bottom-0 right-0 p-4 mx-12 my-8 bg-rose-600 text-white rounded-full duration-150 hover:bg-rose-800 shadow-xl'
        onClick={() => {
          setShowModal(true);
        }}>
        <Add />
      </button>
    </div>
  );
};

export default Home;
