import { FC } from 'react';

interface MainHeaderProps {
  heading: string;
}

const MainHeader: FC<MainHeaderProps> = ({ heading }) => {
  return (
    <div className='bg-gradient-to-r from-red-500 to-red-800 py-4 text-transparent bg-clip-text'>
      <h1 className='font-bold text-5xl text-center md:text-left'>{heading}</h1>
    </div>
  );
};

export default MainHeader;
