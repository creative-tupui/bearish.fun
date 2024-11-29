import React from 'react';
import closeIcon from '@assets/images/close.png';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-[#06060B] bg-opacity-50 flex items-center justify-center"
    >
      <div 
        className="w-[431px] bg-card-primary rounded-lg border border-card-stroke p-4 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-gray-primary max-w-[calc(100%-28px)]">{title}</h2>
          <button
            className=""
            onClick={onClose}
          >
            <img src={closeIcon} alt="Close Icon" className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
