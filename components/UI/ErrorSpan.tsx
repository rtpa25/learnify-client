import { FC } from 'react';

const ErrorSpan: FC<{ message: string }> = ({ message }) => {
  return (
    <div className='flex justify-center items-center'>
      <span className='text-red-500 text-center'>{message}</span>;
    </div>
  );
};

export default ErrorSpan;
