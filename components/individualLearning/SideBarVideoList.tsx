import { FC } from 'react';
import { SideBarVideoDetails } from '../../interfaces/sideBarVideoDetails.interface';
import SideBarVideoElement from './SideBarVideElement';

interface SideBarVideoListProps {
  videosData: SideBarVideoDetails[];
  chosenVideoId: string;
  learningClickHandler: (video: SideBarVideoDetails) => Promise<void>;
  fetchMoreVideosHandler: () => Promise<void>;
  paginationToken: string;
}

const SideBarVideoList: FC<SideBarVideoListProps> = ({
  videosData,
  chosenVideoId,
  learningClickHandler,
  fetchMoreVideosHandler,
  paginationToken,
}) => {
  return (
    <div className='flex flex-col'>
      {videosData.map((video) => {
        return (
          <SideBarVideoElement
            key={video.videoId}
            video={video}
            chosenVideoId={chosenVideoId}
            learningClickHandler={() => learningClickHandler(video)}
          />
        );
      })}
      {paginationToken.length > 0 && (
        <button
          className='bg-gray-700 rounded-md text-white p-4 m-4 w-2/4 self-center hover:bg-gray-900 transition-all duration-150'
          onClick={fetchMoreVideosHandler}>
          Load More
        </button>
      )}
    </div>
  );
};

export default SideBarVideoList;
