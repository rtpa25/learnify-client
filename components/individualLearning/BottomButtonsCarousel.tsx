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

  const playerRefCurrentVal = useAppSelector(
    (state) => state.youtubeplayerRef.playerRef
  );

  useEffect(() => {
    const fetchCreatorUrl = async () => {
      try {
        const { data } = await axios.get(`
          ${process.env.NEXT_PUBLIC_YT_ENDPOINT}/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&id=${creatorId}
        `);
        const customUrl = data.items[0].snippet.customUrl;
        setCreatorUrl(`https://www.youtube.com/c/${customUrl}`);
      } catch (error: any) {
        console.error(error);
      }
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
    <div className='flex m-4 justify-between overflow-x-auto overflow-y-hidden md:overflow-hidden'>
      <button
        className='bottom-button'
        onClick={() => {
          carouselButtonClickHandler('content');
        }}>
        Videos
      </button>
      <button
        className='bottom-button'
        onClick={() => {
          carouselButtonClickHandler('desc');
        }}>
        Description
      </button>
      <button
        className='bottom-button'
        onClick={() => {
          carouselButtonClickHandler('notes');
          playerRefCurrentVal.internalPlayer.pauseVideo();
        }}>
        Notes
      </button>
      <a href={creatorUrl} target='_blank' className='md:w-1/5'>
        <button className='md:mx-2 bg-red-400 hover:bg-red-500 w-full h-full text-white font-bold md:py-2 md:px-4 rounded p-1'>
          Creator
        </button>
      </a>
    </div>
  );
};

export default BottomButtonsCarousel;
