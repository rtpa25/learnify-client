import axios from 'axios';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

interface BottomButtonsCarouselProps {
  setShowCourseContent: Dispatch<SetStateAction<boolean>>;
  setShowDescription: Dispatch<SetStateAction<boolean>>;
  setShowNotes: Dispatch<SetStateAction<boolean>>;
  creatorId: string;
}

const BottomButtonsCarousel: FC<BottomButtonsCarouselProps> = ({
  setShowCourseContent,
  setShowDescription,
  setShowNotes,
  creatorId,
}) => {
  const [creatorUrl, setCreatorUrl] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');

  const playerRefCurrentVal = useAppSelector(
    (state) => state.youtubeplayerRef.playerRef
  );

  useEffect(() => {
    const fetchCreatorUrl = async () => {
      setisLoading(true);
      try {
        const { data } = await axios.get(`
          ${process.env.NEXT_PUBLIC_YT_ENDPOINT}/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&id=${creatorId}
        `);
        const customUrl = data.items[0].snippet.customUrl;
        setCreatorUrl(`https://www.youtube.com/c/${customUrl}`);
      } catch (error: any) {
        console.error(error);
        seterror(error.message);
      }
      setisLoading(false);
    };
    fetchCreatorUrl();
  }, [creatorId]);

  const carouselButtonClickHandler = (
    buttonType: 'content' | 'notes' | 'desc'
  ) => {
    setShowCourseContent(buttonType === 'content');
    setShowDescription(buttonType === 'desc');
    setShowNotes(buttonType === 'notes');
  };

  return (
    <div className='flex m-4 justify-between'>
      <button
        className='mx-2 w-1/5 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'
        onClick={() => {
          carouselButtonClickHandler('content');
        }}>
        Course content
      </button>
      <button
        className='mx-2 bg-red-400 w-1/5 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'
        onClick={() => {
          carouselButtonClickHandler('desc');
        }}>
        Description
      </button>
      <button
        className='mx-2 bg-red-400 hover:bg-red-500 w-1/5 text-white font-bold py-2 px-4 rounded'
        onClick={() => {
          carouselButtonClickHandler('notes');
          playerRefCurrentVal.internalPlayer.pauseVideo();
        }}>
        Notes
      </button>
      <button className='mx-2 bg-red-400 hover:bg-red-500 w-1/5 text-white font-bold py-2 px-4 rounded'>
        <a href={creatorUrl} target='_blank'>
          Creator
        </a>
      </button>
    </div>
  );
};

export default BottomButtonsCarousel;
