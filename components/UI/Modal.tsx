import React, { FC, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  show: boolean;
  handleClose: (e: React.MouseEvent<any>) => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ show, handleClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div
      className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-600'
      onClick={(e) => handleClose(e)}>
      <div
        className='bg-gray-200 w-fit h-fit rounded-xl p-3 md:w-fit flex flex-col items-center justify-between shadow-xl'
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root') as HTMLElement
    );
  } else {
    return null;
  }
};

export default Modal;
