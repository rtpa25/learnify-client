import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Learning } from '../../interfaces/learning.interface';
import axiosInstance from '../../utils/axiosInterceptor';
import { useRouter } from 'next/router';
import {
  NavBar,
  Loader,
  ErrorSpan,
  SideBarVideoElement,
  YouTubePlayer,
  BottomButtonsCarousel,
  Description,
  Notes,
  Creator,
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
  const [showCourseContent, setShowCourseContent] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showCreator, setShowCreator] = useState(false);

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
          <div className='w-screen h-screen flex flex-col md:flex-row'>
            <div className='md:w-3/4 h-full flex flex-col'>
              <YouTubePlayer
                lastSetTimeStamp={lastSetTimeStamp}
                videosData={videosData}
                chosenVideoId={chosenVideoId}
                learningId={learningId}
                learningClickHandler={learningClickHandler}
              />
              <BottomButtonsCarousel
                setShowCourseContent={setShowCourseContent}
                setShowDescription={setShowDescription}
                setShowNotes={setShowNotes}
                setShowCreator={setShowCreator}
              />
            </div>
            <div className='bg-gray-100 h-4/5 md:h-full w-full md:w-1/4 overflow-auto'>
              {showCourseContent ? (
                videosData.map((video: SideBarVideoDetails) => {
                  return (
                    <SideBarVideoElement
                      key={video.videoId}
                      video={video}
                      chosenVideoId={chosenVideoId}
                      learningClickHandler={() => learningClickHandler(video)}
                    />
                  );
                })
              ) : showDescription ? (
                <Description chosenVideoId={chosenVideoId} />
              ) : showNotes ? (
                <Notes />
              ) : showCreator ? (
                <Creator />
              ) : (
                <div>No content</div>
              )}
            </div>
          </div>
        </>
      );
    }
  }
};

export default LearningPage;
