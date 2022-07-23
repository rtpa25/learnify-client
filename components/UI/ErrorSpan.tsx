import { FC } from 'react';

const ErrorSpan: FC<{ message: string }> = ({ message }) => {
  return <span className='text-red-500 text-center'>{message}</span>;
};

export default ErrorSpan;
