import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { Learning } from '../interfaces/learning.interface';
import axiosInstance from '../utils/axiosInterceptor';
import LearningElement from './Learning';
import ErrorSpan from './UI/ErrorSpan';
import LoadingSpinner from './UI/LoadingSpinner';

const LearningsContainer: FC = () => {
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useAppSelector((state) => state.currentUser.user);

  useEffect(() => {
    const fetchLearnings = async () => {
      setIsLoading(true);
      try {
        if (!user) return;
        const { data } = await axiosInstance.get(
          `/learnings?userId=${user._id}`
        );
        setLearnings(data);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchLearnings();
  }, [user]);

  const loadingState = <LoadingSpinner />;

  const errorState = <ErrorSpan message={error} />;

  if (isLoading) {
    return loadingState;
  } else {
    if (error) {
      return errorState;
    } else {
      return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-4'>
          {learnings.map((learning) => {
            return <LearningElement key={learning._id} learning={learning} />;
          })}
        </div>
      );
    }
  }
};

export default LearningsContainer;
