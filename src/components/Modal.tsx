import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-50 transition-all duration-300">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg w-full max-w-md backdrop-blur-xl text-white">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 px-4 py-2 rounded-xl w-full font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
