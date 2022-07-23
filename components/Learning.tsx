import { useRouter } from 'next/router';
import { FC } from 'react';
import { trimCourseName } from '../utils/trimCourseName';

interface LearningProps {
  thumbnailUrl: string;
  thumbnailAltText: string;
  courseName: string;
  courseCreator: string;
  playlistId: string;
}

const Learning: FC<LearningProps> = ({
  thumbnailUrl,
  thumbnailAltText,
  courseCreator,
  courseName,
  playlistId,
}) => {
  const router = useRouter();
  const navigateHandler = () => {
    router.push(`/learning/${playlistId}`);
  };

  return (
    <div className='mx-4 md:mx-0' onClick={navigateHandler}>
      <div className='bg-gray-100 p-2 h-full cursor-pointer'>
        <img
          src={thumbnailUrl}
          alt={thumbnailAltText}
          height={'50%'}
          width={'100%'}
          className='text-center bg-gray-700 duration-200 hover:opacity-80 '
        />
        <h3 className='font-bold text-lg my-2'>{trimCourseName(courseName)}</h3>
        <span className='text-gray-900/100'>{courseCreator}</span>
      </div>
    </div>
  );
};

export default Learning;
