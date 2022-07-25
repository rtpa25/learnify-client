import { Close } from '@material-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Learning } from '../interfaces/learning.interface';
import { setCurrentLearningData } from '../store/slices/currentLearning.slice';
import axiosInstance from '../utils/axiosInterceptor';
import {
  extractPlaylistId,
  isValidPlayListUrl,
} from '../utils/isValidYouTubePlaylistLink';
import ErrorSpan from './UI/ErrorSpan';
import LoadingSpinner from './UI/LoadingSpinner';
import MainHeader from './UI/MainHeader';
import Modal from './UI/Modal';

interface AddGroupModalProps {
  show: boolean;
  onClose: () => void;
}

interface LearningData {
  name: string;
  channelId: string;
  channelTitle: string;
  thumbnail: string;
  user: string;
  playlistId: string;
}

const AddGroupModal: FC<AddGroupModalProps> = ({ show, onClose }) => {
  const [playListLink, setPlayListLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useAppSelector((state) => state.currentUser.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const modalCloseHandler = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const createLearningHandler = async () => {
    if (!isValidPlayListUrl(playListLink)) {
      alert('please enter a valid youtube playlist url');
      return;
    }
    setIsLoading(true);
    try {
      const playListId = extractPlaylistId(playListLink);
      const res = await axios.get(`
        ${process.env.NEXT_PUBLIC_YT_ENDPOINT}/playlists?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&id=${playListId}
      `);
      const { title, channelId, channelTitle, thumbnails } =
        res.data.items[0].snippet;
      const learningPostBody: LearningData = {
        name: title,
        channelId,
        channelTitle,
        thumbnail: thumbnails.high.url,
        user: user!._id,
        playlistId: playListId,
      };
      const { data } = await axiosInstance.post<Learning>(
        '/learnings',
        learningPostBody
      );
      setPlayListLink('');
      onClose();
      dispatch(setCurrentLearningData({ learning: data }));
      router.push(`/learning/${data._id}`);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      show={show}
      handleClose={(e) => {
        modalCloseHandler(e);
      }}>
      <div className='w-full flex justify-end'>
        <Close
          className='cursor-pointer text-red-600'
          onClick={(e) => {
            modalCloseHandler(e);
          }}
        />
      </div>
      <MainHeader heading={'Paste Playlist URL'} />
      <input
        type='text'
        className='h-8 rounded-md bg-gray-400/50 p-2 my-4 w-full'
        value={playListLink}
        onChange={(e) => {
          setPlayListLink(e.target.value);
        }}
      />
      {error && <ErrorSpan message={error} />}
      <button
        className='bg-black text-white w-3/4 p-2 m-4 rounded-md'
        onClick={createLearningHandler}>
        {isLoading ? <LoadingSpinner /> : 'Create Learning'}
      </button>
    </Modal>
  );
};

export default AddGroupModal;
