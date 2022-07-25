import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Learning } from '../../interfaces/learning.interface';
import axiosInstance from '../../utils/axiosInterceptor';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorSpan from '../../components/UI/ErrorSpan';
import { NavBar } from '../../components/zExporter';

// http://localhost:3000/learning/[learningId]

interface VideoDetails {
  title: string;
  videoId: string;
}

const LearningPage: NextPage = () => {
  const [chosenVideoId, setChosenVideoId] = useState('');
  const [videosData, setVideosData] = useState<VideoDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const learningId = router.query.id as string;

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '70%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const learningClickHandler = async (video: VideoDetails) => {
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

        const res = await axios.get(`
          ${process.env.NEXT_PUBLIC_YT_ENDPOINT}/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=100&playlistId=${data.playlistId}
        `);

        console.log(res.data);

        const fetchedVideosData: VideoDetails[] = res.data.items.map(
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
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    if (error) {
      return <ErrorSpan message={error} />;
    } else {
      return (
        <>
          <NavBar />
          <div className='w-screen h-screen flex'>
            <YouTube
              className='h-full w-3/4'
              videoId={chosenVideoId}
              opts={opts}
              onReady={onPlayerReady}
              loading={'lazy'}
            />
            <div className='bg-gray-100 h-full w-1/4 overflow-auto'>
              {videosData.map((video: VideoDetails) => {
                return (
                  <div
                    key={video.videoId}
                    className={`m-3 p-3 cursor-pointer hover:bg-gray-300 ${
                      video.videoId === chosenVideoId ? 'bg-gray-300' : ''
                    }`}
                    onClick={() => {
                      learningClickHandler(video);
                    }}>
                    <h3>{video.title}</h3>
                  </div>
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
