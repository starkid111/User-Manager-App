import React, { useEffect, useRef } from "react";

import { motion } from "framer-motion";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName?: string;
  saving?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName = "",
  saving = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Add / Edit User</h2>

        <input
          ref={inputRef}
          className="border p-2 w-full rounded mb-4"
          placeholder="Enter name..."
          defaultValue={initialName}
          id="user-name-input"
        />

        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              const input = document.getElementById(
                "user-name-input"
              ) as HTMLInputElement;
              onSave(input.value);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserModal;
