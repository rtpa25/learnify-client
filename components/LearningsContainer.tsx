import { FC, useEffect, useState } from 'react';
import Learning from './Learning';

const LearningsContainer: FC = () => {
  const [learnings, setLearnings] = useState();
  useEffect(() => {}, []);
  return (
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
  );
};

export default LearningsContainer;
