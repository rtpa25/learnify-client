import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { Learning } from '../interfaces/learning.interface';
import { setCurrentLearningData } from '../store/slices/currentLearning.slice';
import { trimCourseName } from '../utils/trimCourseName';

interface LearningProps {
  learning: Learning;
}

const LearningElement: FC<LearningProps> = ({ learning }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const navigateHandler = () => {
    dispatch(setCurrentLearningData({ learning: learning }));
    router.push(`/learning/${learning._id}`);
  };

  return (
    <div className='mx-4 md:mx-0' onClick={navigateHandler}>
      <div className='bg-gray-100 p-2 h-full cursor-pointer'>
        <img
          src={learning.thumbnail}
          alt={learning.name}
          height={'50%'}
          width={'100%'}
          className='text-center bg-gray-700 duration-200 hover:opacity-80 '
        />
        <h3 className='font-bold text-lg my-2'>
          {trimCourseName(learning.name)}
        </h3>
        <span className='text-gray-900/100'>{learning.channelTitle}</span>
      </div>
    </div>
  );
};

export default LearningElement;
