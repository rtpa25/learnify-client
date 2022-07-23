import { FC } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Loader: FC = () => {
  return (
    <div className='text-center'>
      <LoadingSpinner />
    </div>
  );
};

export default Loader;
