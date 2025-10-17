import { useEffect, useState } from "react";
import {
  getGadgets,
  addGadget,
  deleteGadget,
  updatedGadget,
  type Gadget,
} from "../utils/api";
import Modal from "./Modal";
import Form from "./Form";

const GadgetList = () => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGadget, setEditingGadget] = useState<Gadget | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [colorFilter, setColorFilter] = useState("");

  useEffect(() => {
    loadGadgets();
  }, []);

  const loadGadgets = async () => {
    setLoading(true);
    const data = await getGadgets();
    setGadgets(data);
    setLoading(false);
  };

  const handleCreate = async (data: Partial<Gadget>) => {
    const newGadget = await addGadget(data);
    setGadgets((prev) => [...prev, newGadget]);
    setIsModalOpen(false);
    setEditingGadget(null);
  };

  const handleUpdate = async (data: Partial<Gadget>) => {
    if (!editingGadget?.id) return;
    try {
      const updated = await updatedGadget(editingGadget.id, data);
      setGadgets((prev) =>
        prev.map((item) => (item.id === editingGadget.id ? updated : item))
      );
    } catch (err) {
      console.error("Error updating gadget:", err);
    } finally {
      setIsModalOpen(false);
      setEditingGadget(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteGadget(id);
    setGadgets((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredGadgets = gadgets.filter((gadget) =>
    gadget.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

const sortedGadgets = [...filteredGadgets].sort((a, b) => {
  if (sortBy === "name") return a.name.localeCompare(b.name);
  if (sortBy === "reverse") return b.name.localeCompare(a.name);
  if (sortBy === "capacity")
    return (a.data?.capacity || "").localeCompare(b.data?.capacity || "");
  return 0;
});

const filteredByColor = sortedGadgets.filter((gadget) =>
  colorFilter ? gadget.data?.color?.toLowerCase().includes(colorFilter) : true
);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-md">
          ⚙️ Gadget Manager
        </h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search gadgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="name">Name (A–Z)</option>
            <option value="reverse">Name (Z–A)</option>
            <option value="capacity">Capacity</option>
          </select>
          <select
  onChange={(e) => setColorFilter(e.target.value)}
  className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
  <option value="">All Colors</option>
  <option value="black">Black</option>
  <option value="blue">Blue</option>
  <option value="red">Red</option>
</select>

          <button
            onClick={() => {
              setEditingGadget(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:opacity-90 px-5 py-2 rounded-xl font-semibold shadow-md"
          >
            + Add Gadget
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-10 text-gray-400 animate-pulse">
          Loading gadgets...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredByColor.map((gadget) => (
            <div
              key={gadget.id}
              className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2 text-indigo-300">
                {gadget.name || "Unnamed Gadget"}
              </h2>
              <p className="text-xs text-gray-400 mb-2">ID: {gadget.id}</p>
              {gadget.data && (
                <div className="text-sm text-gray-300 space-y-1">
                  {Object.entries(gadget.data).map(([key, value]) => (
                    <p key={key}>
                      <span className="capitalize">{key}</span>: {value}
                    </p>
                  ))}
                </div>
              )}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setEditingGadget(gadget);
                    setIsModalOpen(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(gadget.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form
          onSubmit={editingGadget ? handleUpdate : handleCreate}
          editingGadget={editingGadget}
        />
      </Modal>
    </div>
  );
};

export default GadgetList;
