import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SubTaskModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-96 mx-auto my-auto rounded-lg">
        <button
          className="absolute top-0 right-0 m-4 text-xl font-bold text-gray-500 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default SubTaskModal;
