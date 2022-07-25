import { FC, useEffect, useState } from 'react';
import { SideBarVideoDetails } from '../../interfaces/sideBarVideoDetails.interface';

interface SideBarVideoElementProps {
  video: SideBarVideoDetails;
  chosenVideoId: string;
  learningClickHandler: (video: SideBarVideoDetails) => Promise<void>;
}

const SideBarVideoElement: FC<SideBarVideoElementProps> = ({
  video,
  chosenVideoId,
  learningClickHandler,
}) => {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem(video.videoId) === 'true'
  );

  useEffect(() => {
    setIsChecked(localStorage.getItem(video.videoId) === 'true');
  }, [localStorage.getItem(video.videoId)]);

  return (
    <div
      className={`m-3 p-3 flex items-center cursor-pointer hover:bg-gray-300 ${
        video.videoId === chosenVideoId ? 'bg-gray-300' : ''
      }`}>
      <input
        type='checkbox'
        className='cursor-pointer h-4 w-4 rounded-sm transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain'
        onChange={(e) => {
          setIsChecked(e.target.checked);
          localStorage.setItem(video.videoId, e.target.checked.toString());
        }}
        checked={isChecked}
      />
      <h3
        className='ml-2'
        onClick={() => {
          learningClickHandler(video);
        }}>
        {video.title}
      </h3>
    </div>
  );
};

export default SideBarVideoElement;
