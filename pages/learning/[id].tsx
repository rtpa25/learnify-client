import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Learning } from '../../interfaces/learning.interface';
import axiosInstance from '../../utils/axiosInterceptor';
import { useRouter } from 'next/router';
import {
  NavBar,
  Loader,
  ErrorSpan,
  SideBarVideoElement,
} from '../../components/zExporter';
import { SideBarVideoDetails } from '../../interfaces/sideBarVideoDetails.interface';

const LearningPage: NextPage = () => {
  const [chosenVideoId, setChosenVideoId] = useState('');
  const [lastSetTimeStamp, setLastSetTimeStamp] = useState<number>(0);
  const [videosData, setVideosData] = useState<SideBarVideoDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const learningId = router.query.id as string;

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
    height: '70%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const onStateChangeHandler: YouTubeProps['onStateChange'] = async (event) => {
    await axiosInstance.patch('/learnings/time', {
      learningId,
      lastSeenVideoTimestamp: event.target.getCurrentTime(),
    });
  };

  const learningClickHandler = async (video: SideBarVideoDetails) => {
    try {
      setChosenVideoId(video.videoId);
      await axiosInstance.patch('/learnings', {
        learningId,
        lastSeenVideoId: video.videoId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLearning = async () => {
      setIsLoading(true);
      try {
        if (!learningId) return;

        const { data } = await axiosInstance.get<Learning>(
          `/learnings/individual?learningId=${learningId}`
        );
        if (data.lastSeenVideoTimestamp) {
          setLastSetTimeStamp(data.lastSeenVideoTimestamp);
        }

        const res = await axios.get(`
          ${process.env.NEXT_PUBLIC_YT_ENDPOINT}/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=100&playlistId=${data.playlistId}
        `);

        const fetchedVideosData: SideBarVideoDetails[] = res.data.items.map(
          (item: any) => {
            return {
              title: item.snippet.title,
              videoId: item.snippet.resourceId.videoId,
            };
          }
        );
        setVideosData(fetchedVideosData);
        if (data.lastSeenVideoId) {
          setChosenVideoId(data.lastSeenVideoId);
        } else {
          setChosenVideoId(fetchedVideosData[0].videoId);
        }
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchLearning();
  }, [learningId]);

  if (isLoading) {
    return <Loader />;
  } else {
    if (error) {
      return <ErrorSpan message={error} />;
    } else {
      return (
        <>
          <NavBar />
          <div className='w-screen h-screen md:flex'>
            <YouTube
              className='h-full w-3/4'
              videoId={chosenVideoId}
              opts={opts}
              onReady={onPlayerReady}
              loading={'lazy'}
              onStateChange={onStateChangeHandler}
              onEnd={onEndPlayerHandler}
            />
            <div className='bg-gray-100 h-full w-1/4 overflow-auto'>
              {videosData.map((video: SideBarVideoDetails) => {
                return (
                  <SideBarVideoElement
                    key={video.videoId}
                    video={video}
                    chosenVideoId={chosenVideoId}
                    learningClickHandler={() => learningClickHandler(video)}
                  />
                );
              })}
            </div>
          </div>
        </>
      );
    }
  }
};

export default LearningPage;
