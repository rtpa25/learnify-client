import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useAppDispatch } from '../../hooks/redux';
import { SideBarVideoDetails } from '../../interfaces/sideBarVideoDetails.interface';
import { setYouTubePlayerRef } from '../../store/slices/playerRef.slice';
import axiosInstance from '../../utils/axiosInterceptor';

interface YOutubePlayerProps {
  lastSetTimeStamp: number;
  videosData: SideBarVideoDetails[];
  chosenVideoId: string;
  learningId: string;
  learningClickHandler: (video: SideBarVideoDetails) => Promise<void>;
}

const YouTubePlayer: FC<YOutubePlayerProps> = ({
  lastSetTimeStamp,
  chosenVideoId,
  videosData,
  learningId,
  learningClickHandler,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
    event.target.seekTo(lastSetTimeStamp);
  };

  const onEndPlayerHandler: YouTubeProps['onEnd'] = () => {
    //take the user to the next video
    const index = videosData.findIndex(
      (video) => video.videoId === chosenVideoId
    );
    if (index === videosData.length - 1) {
      //if the last video, take the user to the learning page
      router.push('/');
    } else {
      //if not the last video, take the user to the next video
      learningClickHandler(videosData[index + 1]);
    }
    //check the existing check box
    localStorage.setItem(videosData[index].videoId, 'true');
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const onStateChangeHandler: YouTubeProps['onStateChange'] = async (event) => {
    await axiosInstance.patch('/learnings/time', {
      learningId,
      lastSeenVideoTimestamp: event.target.getCurrentTime(),
    });
  };

  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current) {
      dispatch(setYouTubePlayerRef({ playerRef: playerRef.current }));
    }
  }, [playerRef]);

  return (
    <YouTube
      className='h-full w-full'
      videoId={chosenVideoId}
      opts={opts}
      onReady={onPlayerReady}
      loading={'lazy'}
      onStateChange={onStateChangeHandler}
      onEnd={onEndPlayerHandler}
      ref={playerRef as any}
    />
  );
};

export default YouTubePlayer;
