import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Note } from '../../interfaces/note.interface';
import axiosInstance from '../../utils/axiosInterceptor';
import { convertTimeToConsumableValue } from '../../utils/timeConvertor';
import LoadingSpinner from '../UI/LoadingSpinner';
import { ErrorSpan, Loader } from '../zExporter';
import { Delete, Edit } from '@material-ui/icons';
import { nanoid } from 'nanoid';

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
  const [notes, setNotes] = useState<Note[]>([]);

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
      setNotes((prevState) => {
        return [...prevState, newNote];
      });

      await axiosInstance.post('/notes', {
        userId,
        learningId,
        text: textAreaValue,
        videoId,
        timeStamp,
      });

      setTextAreaValue('');
    } catch (error: any) {
      console.error(error);
      setNotes((prevState) => {
        return prevState.filter((note) => note._id !== newNote._id);
      });
      seterrorPostCall(error.message);
    }
    setisLoadingPostCall(false);
  };

  console.log(playerRefCurrentVal);

  useEffect(() => {
    const fetchNotes = async () => {
      setisLoadingGetCall(true);
      try {
        const { data } = await axiosInstance.get<Note[]>(
          `/notes?learningId=${learningId}&videoId=${videoId}&userId=${userId}`
        );
        setNotes(data);
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
          className='bg-gray-700 text-white w-1/5 md:w-fit place-self-end m-4 rounded-md p-3 hover:bg-black'
          onClick={createNotesHandler}>
          {isLoadingPostCall ? <LoadingSpinner /> : 'Create Note'}
        </button>
        {isLoadingGetCall ? (
          <Loader />
        ) : errorGetCall ? (
          <ErrorSpan message={errorGetCall} />
        ) : (
          <div className=''>
            {notes.map((note: Note) => {
              return (
                <div
                  key={note._id}
                  className='m-4  p-2 text-center bg-gray-200 rounded-md flex flex-col'>
                  <div className='flex justify-between'>
                    <span
                      className='bg-gray-600 text-white p-1 rounded-md cursor-pointer'
                      onClick={() => {
                        playerRefCurrentVal.internalPlayer.seekTo(
                          note.timeStamp
                        );
                      }}>
                      {convertTimeToConsumableValue(note.timeStamp)}
                    </span>
                    <div>
                      <button className='text-green-500 mx-2'>
                        <Edit />
                      </button>
                      <button className='text-red-500 mx-2'>
                        <Delete />
                      </button>
                    </div>
                  </div>
                  <span className='my-4'>{note.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
