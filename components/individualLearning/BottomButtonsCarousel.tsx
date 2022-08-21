import axios from 'axios';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

interface BottomButtonsCarouselProps {
  setShowCourseContent: Dispatch<SetStateAction<boolean>>;
  setShowDescription: Dispatch<SetStateAction<boolean>>;
  setShowNotes: Dispatch<SetStateAction<boolean>>;
  creatorId: string;
  showDescription: boolean;
  showCourseContent: boolean;
  showNotes: boolean;
}

const BottomButtonsCarousel: FC<BottomButtonsCarouselProps> = ({
  setShowCourseContent,
  setShowDescription,
  setShowNotes,
  creatorId,
  showDescription,
  showCourseContent,
  showNotes,
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
    <div className='flex h-fit m-4 justify-between overflow-x-auto overflow-y-hidden md:overflow-hidden'>
      <button
        className={`font-semibold p-2 ${
          showCourseContent && 'border-b-4 border-red-500'
        } `}
        onClick={() => {
          carouselButtonClickHandler('content');
        }}>
        Videos
      </button>
      <button
        className={`font-semibold p-2 ${
          showDescription && 'border-b-4 border-red-500'
        } `}
        onClick={() => {
          carouselButtonClickHandler('desc');
        }}>
        Description
      </button>
      <button
        className={`font-semibold p-2 ${
          showNotes && 'border-b-4 border-red-500'
        } `}
        onClick={() => {
          carouselButtonClickHandler('notes');
          playerRefCurrentVal.internalPlayer.pauseVideo();
        }}>
        Notes
      </button>
      <a href={creatorUrl} target='_blank'>
        <button className='p-2 font-semibold'>Creator</button>
      </a>
    </div>
  );
};

export default BottomButtonsCarousel;
