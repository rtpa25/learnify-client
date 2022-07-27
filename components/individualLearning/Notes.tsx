import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Note } from '../../interfaces/note.interface';
import axiosInstance from '../../utils/axiosInterceptor';
import LoadingSpinner from '../UI/LoadingSpinner';
import { ErrorSpan, IndividualNote, Loader } from '../zExporter';
import { nanoid } from 'nanoid';
import { setNotesData } from '../../store/slices/notes.slice';

interface NotesProps {
  userId: string;
  learningId: string;
  videoId: string;
}

const Notes: FC<NotesProps> = ({ learningId, userId, videoId }) => {
  const playerRefCurrentVal = useAppSelector(
    (state) => state.youtubeplayerRef.playerRef
  );

  const [textAreaValue, setTextAreaValue] = useState('');
  const [isLoadingPostCall, setisLoadingPostCall] = useState(false);
  const [errorPostCall, seterrorPostCall] = useState('');

  const [isLoadingGetCall, setisLoadingGetCall] = useState(false);
  const [errorGetCall, seterrorGetCall] = useState('');
  const dispatch = useAppDispatch();
  const notesData = useAppSelector((state) => state.notes.value);

  const createNotesHandler = async () => {
    setisLoadingPostCall(true);
    const timeStamp = await playerRefCurrentVal.internalPlayer.getCurrentTime();
    const newNote: Note = {
      _id: nanoid(),
      text: textAreaValue,
      videoId: videoId,
      user: userId,
      learning: learningId,
      timeStamp: timeStamp,
      createdAt: '',
      updatedAt: '',
    };
    try {
      dispatch(setNotesData({ value: [...notesData, newNote] }));

      const { data } = await axiosInstance.post<Note>('/notes', {
        userId,
        learningId,
        text: textAreaValue,
        videoId,
        timeStamp,
      });

      dispatch(
        setNotesData({
          value: notesData.filter((note) => note._id !== newNote._id),
        })
      );

      dispatch(setNotesData({ value: [...notesData, data] }));

      setTextAreaValue('');
    } catch (error: any) {
      console.error(error);
      dispatch(
        setNotesData({
          value: notesData.filter((note) => note._id !== newNote._id),
        })
      );
      seterrorPostCall(error.message);
    }
    setisLoadingPostCall(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setisLoadingGetCall(true);
      try {
        const { data } = await axiosInstance.get<Note[]>(
          `/notes?learningId=${learningId}&videoId=${videoId}&userId=${userId}`
        );
        dispatch(setNotesData({ value: data }));
      } catch (error: any) {
        console.error(error);
        seterrorGetCall(error.message);
      }
      setisLoadingGetCall(false);
    };
    fetchNotes();
  }, [learningId, videoId, userId]);

  return (
    <div>
      <h1 className='text-3xl font-semibold m-4'>Notes</h1>
      <div className='flex flex-col'>
        {errorPostCall && <ErrorSpan message={errorPostCall} />}
        <textarea
          name=''
          id=''
          className='w-full h-full mr-2 rounded-md p-4'
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}></textarea>
        <button
          className='bg-gray-700 text-white md:w-fit place-self-end m-4 rounded-md p-3 hover:bg-black'
          onClick={createNotesHandler}>
          {isLoadingPostCall ? <LoadingSpinner /> : 'Create Note'}
        </button>
        {isLoadingGetCall ? (
          <Loader />
        ) : errorGetCall ? (
          <ErrorSpan message={errorGetCall} />
        ) : (
          <div className=''>
            {notesData.map((note: Note) => {
              return <IndividualNote key={note._id} note={note} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
