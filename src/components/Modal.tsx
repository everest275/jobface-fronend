import React, { ReactNode } from "react";
import closeIcon from '../assets/close.svg'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col bg-opacity-50 bg-black z-50 mt-20">
      <div className="p-10 rounded-lg rounded-t-none shadow-lg border main-color border-black border-t-transparent self-end">
        {children}
        <button
          onClick={onClose}
          className="mt-4 p-2 rounded-[100%] absolute right-2 top-0 tracking-wide bg-zinc-900  text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-zinc-800 focus:ring-zinc-600 focus:ring-offset-blue-200 flex gap-2"
        >
         <img src={closeIcon} alt="close" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
