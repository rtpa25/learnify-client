import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

// http://localhost:3000/learning/PLy_6D98if3ULEtXtNSY_2qN21VCKgoQAE

interface VideoDetails {
  title: string;
  videoId: string;
}

const LearningPage: NextPage = () => {
  const router = useRouter();

  const playListId = router.asPath.split('/')[2];

  const [videosData, setVideosData] = useState<VideoDetails[]>([]);
  const [chosenVideoId, setChosenVideoId] = useState('');

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        if (!playListId) return;
        const { data } = await axios.get(`
        ${process.env.NEXT_PUBLIC_YT_ENDPOINT}/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=100&playlistId=${playListId}
      `);
        setVideosData(
          data.items.map((item: any) => {
            return {
              title: item.snippet.title,
              videoId: item.snippet.resourceId.videoId,
            };
          })
        );
        setChosenVideoId(videosData[0].videoId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylistVideos();
  }, [playListId]);

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

  return (
    <div className='w-screen h-screen flex'>
      <YouTube
        className='h-full w-3/4'
        videoId={chosenVideoId}
        opts={opts}
        onReady={onPlayerReady}
      />
      <div className='bg-gray-100 h-full w-1/4'>
        {videosData.map((video) => {
          return (
            <div
              key={video.videoId}
              className='m-3 cursor-pointer hover:bg-gray-300'
              onClick={() => {
                setChosenVideoId(video.videoId);
              }}>
              <h3>{video.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPage;
