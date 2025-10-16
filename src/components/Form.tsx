import { useEffect, useState } from "react";

import type { Gadget } from "../utils/api";

interface Props {
  onSubmit: (gadget: Partial<Gadget>) => void;
  editingGadget: Gadget | null;
}

const Form: React.FC<Props> = ({ onSubmit, editingGadget }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    if (editingGadget) {
      setName(editingGadget.name || "");
      setColor(editingGadget.data?.color || "");
      setCapacity(editingGadget.data?.capacity || "");
    } else {
      setName("");
      setColor("");
      setCapacity("");
    }
  }, [editingGadget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, data: { color, capacity } });
    setName("");
    setColor("");
    setCapacity("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Gadget name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:opacity-90 py-2 rounded-lg font-semibold transition"
      >
        {editingGadget ? "Update Gadget" : "Add Gadget"}
      </button>
    </form>
  );
};

export default Form;
