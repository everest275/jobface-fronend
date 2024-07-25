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
    <div className=" fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative p-6 rounded-lg shadow-lg bg-zinc-800">
        {children}
        <button
          onClick={onClose}
          className="mt-4 p-2 rounded-[100%] absolute right-2 top-0 tracking-wide bg-zinc-700  text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-zinc-600 focus:ring-zinc-500 focus:ring-offset-blue-200 flex gap-2"
        >
         <img src={closeIcon} alt="close" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
