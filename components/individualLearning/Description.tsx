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
        ${process.env.NEXT_PUBLIC_YT_ENDPOINT}/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&id=${chosenVideoId}
      `);
        console.log(data);

        setDescription(data.items.snippet.description);
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
      return <div>{description}</div>;
    }
  }
};

export default Description;
