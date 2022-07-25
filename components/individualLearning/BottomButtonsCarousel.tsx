import { Dispatch, FC, SetStateAction } from 'react';

interface BottomButtonsCarouselProps {
  setShowCourseContent: Dispatch<SetStateAction<boolean>>;
  setShowDescription: Dispatch<SetStateAction<boolean>>;
  setShowNotes: Dispatch<SetStateAction<boolean>>;
  setShowCreator: Dispatch<SetStateAction<boolean>>;
}

const BottomButtonsCarousel: FC<BottomButtonsCarouselProps> = ({
  setShowCourseContent,
  setShowCreator,
  setShowDescription,
  setShowNotes,
}) => {
  const carouselButtonClickHandler = (
    buttonType: 'content' | 'notes' | 'creator' | 'desc'
  ) => {
    setShowCourseContent(buttonType === 'content');
    setShowDescription(buttonType === 'desc');
    setShowNotes(buttonType === 'notes');
    setShowCreator(buttonType === 'creator');
  };

  return (
    <div className='flex m-4 justify-between'>
      <button
        className='mx-2'
        onClick={() => {
          carouselButtonClickHandler('content');
        }}>
        Course content
      </button>
      <button
        className='mx-2'
        onClick={() => {
          carouselButtonClickHandler('desc');
        }}>
        Description
      </button>
      <button
        className='mx-2'
        onClick={() => {
          carouselButtonClickHandler('notes');
        }}>
        Notes
      </button>
      <button
        className='mx-2'
        onClick={() => {
          carouselButtonClickHandler('creator');
        }}>
        Creator
      </button>
    </div>
  );
};

export default BottomButtonsCarousel;
