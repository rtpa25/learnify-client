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
} from '../../components/zExporter';
import { SideBarVideoDetails } from '../../interfaces/sideBarVideoDetails.interface';
import { ThirdPartyEmailPasswordAuth } from 'supertokens-auth-react/lib/build/recipe/thirdpartyemailpassword';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  doesSessionExist,
  getUserId,
} from 'supertokens-auth-react/recipe/session';
import { User } from '../../interfaces/user.interface';
import { setCurrentUserData } from '../../store/slices/currentUser.slice';

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
  const [creatorId, setCreatorId] = useState('');
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();

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

        setCreatorId(data.channelId);

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

  useEffect(() => {
    async function getUserInfo() {
      if (await doesSessionExist()) {
        const supertokensId = await getUserId();
        const { data } = await axiosInstance.get<User>(
          `/users/me?supertokensId=${supertokensId}`
        );
        dispatch(setCurrentUserData({ user: data }));
      }
    }
    getUserInfo();
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    if (error) {
      return <ErrorSpan message={error} />;
    } else {
      return (
        <ThirdPartyEmailPasswordAuth>
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
                creatorId={creatorId}
                showDescription={showDescription}
                showCourseContent={showCourseContent}
                showNotes={showNotes}
              />
            </div>
            <div className='bg-gray-100 h-4/5 md:h-full w-full md:w-1/3 overflow-y-auto overflow'>
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
                <Notes
                  userId={currentUser?._id as string}
                  learningId={learningId}
                  videoId={chosenVideoId}
                />
              ) : (
                <div>No content</div>
              )}
            </div>
          </div>
        </ThirdPartyEmailPasswordAuth>
      );
    }
  }
};

export default LearningPage;
