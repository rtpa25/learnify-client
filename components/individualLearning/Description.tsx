import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { ErrorSpan, Loader } from '../zExporter';

interface DescriptionProps {
  chosenVideoId: string;
}

const Description: FC<DescriptionProps> = ({ chosenVideoId }) => {
  const [description, setDescription] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');

  useEffect(() => {
    const fetchVideoData = async () => {
      setisLoading(true);
      try {
        const { data } = await axios.get(`
          ${process.env.NEXT_PUBLIC_YT_ENDPOINT}/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&id=${chosenVideoId}
        `);
        setDescription(data.items[0].snippet.description);
      } catch (error: any) {
        console.error(error);
        seterror(error.message);
      }
      setisLoading(false);
    };
    fetchVideoData();
  }, [chosenVideoId]);

  if (isLoading) {
    return <Loader />;
  } else {
    if (error) {
      return <ErrorSpan message={error} />;
    } else {
      return (
        <div className='p-2'>
          <h1 className='text-3xl font-semibold m-4 mb-6'>Description</h1>
          {description.split('\n').map((item, i) => {
            if (item.includes('https')) {
              const list = item.split('https');

              return (
                <p key={i} className='block m-4'>
                  {list[0]}{' '}
                  <a href={`https${list[1]}`} className='text-blue-600'>
                    <span>{'https' + list[1]}</span>
                  </a>
                </p>
              );
            } else {
              return (
                <p key={i} className='block m-2'>
                  {item}
                </p>
              );
            }
          })}
        </div>
      );
    }
  }
};

export default Description;
