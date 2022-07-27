import { Done, Edit, Close, Delete } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Note } from '../../interfaces/note.interface';
import { setNotesData, updateNoteText } from '../../store/slices/notes.slice';
import axiosInstance from '../../utils/axiosInterceptor';
import { convertTimeToConsumableValue } from '../../utils/timeConvertor';

interface IndividualNoteProps {
  note: Note;
}

const IndividualNote: FC<IndividualNoteProps> = ({ note }) => {
  const playerRefCurrentVal = useAppSelector(
    (state) => state.youtubeplayerRef.playerRef
  );

  const [isEditing, setisEditing] = useState(false);
  const [editedTextAreaValue, seteditedTextAreaValue] = useState(note.text);

  const dispatch = useAppDispatch();
  const notesData = useAppSelector((state) => state.notes.value);

  const editNoteHadnler = async () => {
    if (editedTextAreaValue === note.text) {
      alert('No changes made');
      return;
    }

    try {
      dispatch(
        updateNoteText({ noteId: note._id, updatedText: editedTextAreaValue })
      );

      await axiosInstance.patch<Note>('/notes', {
        noteId: note._id,
        text: editedTextAreaValue,
      });

      setisEditing(false);
    } catch (error) {
      console.error(error);
      dispatch(updateNoteText({ noteId: note._id, updatedText: note.text }));
    }
  };

  const deleteNoteHandler = async () => {
    try {
      dispatch(
        setNotesData({
          value: notesData.filter((n) => n._id !== note._id),
        })
      );
      await axiosInstance.delete(`/notes?noteId=${note._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='m-4  p-2 text-center bg-gray-200 rounded-md flex flex-col'>
      <div className='flex justify-between'>
        <span
          className='bg-gray-600 text-white p-1 rounded-md cursor-pointer'
          onClick={() => {
            playerRefCurrentVal.internalPlayer.seekTo(note.timeStamp);
          }}>
          {convertTimeToConsumableValue(note.timeStamp)}
        </span>
        <div>
          <button className='text-green-500 mx-2'>
            {isEditing ? (
              <Done onClick={editNoteHadnler} />
            ) : (
              <Edit
                onClick={() => {
                  setisEditing(true);
                }}
              />
            )}
          </button>
          <button className='text-red-500 mx-2'>
            {isEditing ? (
              <Close
                onClick={() => {
                  setisEditing(false);
                }}
              />
            ) : (
              <Delete onClick={deleteNoteHandler} />
            )}
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          name=''
          id=''
          className='w-full h-full mr-2 rounded-md p-4'
          value={editedTextAreaValue}
          onChange={(e) => {
            seteditedTextAreaValue(e.target.value);
          }}></textarea>
      ) : (
        <span className='my-4'>{note.text}</span>
      )}
    </div>
  );
};

export default IndividualNote;
