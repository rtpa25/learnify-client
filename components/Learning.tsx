import { FC } from 'react';

interface LearningProps {
  thumbnailUrl: string;
  thumbnailAltText: string;
  courseName: string;
  courseCreator: string;
}

const Learning: FC<LearningProps> = ({
  thumbnailUrl,
  thumbnailAltText,
  courseCreator,
  courseName,
}) => {
  return (
    <div className='mx-4 md:mx-0'>
      <div className='bg-gray-100 p-2 cursor-pointer'>
        <img
          src={thumbnailUrl}
          alt={thumbnailAltText}
          height={'50%'}
          width={'100%'}
          className='text-center bg-gray-700 duration-200 hover:opacity-80 '
        />
        <h3 className='font-bold text-lg my-2'>{courseName}</h3>
        <span className='text-gray-900/100'>{courseCreator}</span>
      </div>
    </div>
  );
};

export default Learning;
