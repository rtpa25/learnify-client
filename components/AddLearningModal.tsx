import { Close } from '@material-ui/icons';
import { FC } from 'react';
import MainHeader from './UI/MainHeader';
import Modal from './UI/Modal';

interface AddGroupModalProps {
  show: boolean;
  onClose: () => void;
}

const AddGroupModal: FC<AddGroupModalProps> = ({ show, onClose }) => {
  const modalCloseHandler = (e: any) => {
    e.preventDefault();
    onClose();
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
            e.preventDefault();
            onClose();
          }}
        />
      </div>
      <MainHeader heading={'Paste Playlist URL'} />
      <input
        type='text'
        className='h-8 rounded-md bg-gray-400/50 p-2 my-4 w-full'
      />
      <button className='bg-black text-white w-3/4 p-2 m-4 rounded-md'>
        Create Learning
      </button>
    </Modal>
  );
};

export default AddGroupModal;
