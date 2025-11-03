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
import Spinner from "./ui/Spinner";
import ErrorBanner from "./ui/ErrorBanner";
import SkeletonCard from "./ui/SkeletonCard";
import GadgetCard from "./GadgetCard";

const GadgetList = () => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGadget, setEditingGadget] = useState<Gadget | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Controls
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [colorFilter, setColorFilter] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // mobile filter panel toggle
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadGadgets();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, colorFilter]);

  const loadGadgets = async () => {
    setLoading(true);
    try {
      const data = await getGadgets();
      setGadgets(data);
    } catch (err) {
      console.error("Failed fetching gadgets", err);
      setError("Failed to load gadgets. Check your server or network.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Partial<Gadget>) => {
    setIsProcessing(true);
    try {
      const newGadget = await addGadget(data);
      setGadgets((prev) => [...prev, newGadget]);
      setIsModalOpen(false);
      setEditingGadget(null);
    } catch (err) {
      console.error("Error adding gadget", err);
      alert("Failed to add gadget");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdate = async (data: Partial<Gadget>) => {
    if (!editingGadget?.id) return;
    setIsProcessing(true);
    try {
      const updated = await updatedGadget(editingGadget.id, data);
      setGadgets((prev) =>
        prev.map((item) => (item.id === editingGadget.id ? updated : item))
      );
    } catch (err) {
      console.error("Error updating gadget:", err);
      alert("Failed to update gadget");
    } finally {
      setIsModalOpen(false);
      setEditingGadget(null);
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gadget? this action can't be undone ")) return;
    setIsProcessing(true);
    try {
      await deleteGadget(id);
      setGadgets((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting gadget:", err);
      alert("Failed to delete gadget");
    } finally {
      setIsProcessing(false);
    }
  };

  // filtering & sorting
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

  const filteredByColor = sortedGadgets.filter(
    (gadget) =>
      !colorFilter ||
      gadget.data?.color?.toLowerCase().includes(colorFilter.toLowerCase())
  );

  // pagination calculations
  const totalItems = filteredByColor.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGadgets = filteredByColor.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 sm:p-6">
      {/* Header + controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            ⚙️ Gadget Manager
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your gadgets — search, filter, and sort easily.
          </p>
        </div>

        {/* Controls: responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          {/* Search always visible */}
          <input
            aria-label="Search gadgets"
            type="search"
            placeholder="Search gadgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-0 bg-white/8 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Mobile: toggle filters */}
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className="sm:hidden bg-white/6 px-3 py-2 rounded-xl text-sm"
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Desktop filters area (visible on sm+) */}
          <div className="hidden sm:flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/8 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="name">Name (A–Z)</option>
              <option value="reverse">Name (Z–A)</option>
              <option value="capacity">Capacity</option>
            </select>

            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="bg-white/8 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              disabled={isProcessing}
              className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:opacity-95 px-4 py-2 rounded-xl font-semibold shadow-sm text-sm"
            >
              {isProcessing ? <Spinner size={14} /> : "+ Add Gadget"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile filter panel (collapsible) */}
      {showFilters && (
        <div id="filter-panel" className="mb-4 sm:hidden space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/8 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="name">Name (A–Z)</option>
              <option value="reverse">Name (Z–A)</option>
              <option value="capacity">Capacity</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Color</label>
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="bg-white/8 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Colors</option>
              <option value="black">Black</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingGadget(null);
                setIsModalOpen(true);
                setShowFilters(false);
              }}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-2 rounded-xl font-semibold text-sm"
            >
              {isProcessing ? <Spinner size={14} /> : "+ Add Gadget"}
            </button>
            <button
              onClick={() => {
                setSearchTerm("");
                setColorFilter("");
                setSortBy("name");
                setShowFilters(false);
              }}
              className="flex-1 bg-white/6 px-4 py-2 rounded-xl text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4">
          <ErrorBanner message={error} onRetry={loadGadgets} />
        </div>
      )}

      {/* Main content: cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Grid: 1 col mobile, 2 sm, 3 md+, 4 xl */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {currentGadgets.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">
                No gadgets found.
              </div>
            ) : (
              currentGadgets.map((gadget) => (
                <GadgetCard
                  key={gadget.id}
                  gadget={gadget}
                  onEdit={(g) => {
                    setEditingGadget(g);
                  }}
                  onOpenModal={() => {
                    setIsModalOpen(true);
                  }}
                  onDelete={handleDelete}
                  isProcessing={isProcessing}
                />
              ))
            )}
          </div>

          {/* Pagination controls */}
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-indigo-600 disabled:opacity-40 text-sm"
                >
                  Prev
                </button>

                {/* page numbers (compact on mobile) */}
                <div className="flex items-center gap-2 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        aria-current={p === currentPage ? "page" : undefined}
                        className={`px-2 py-1 rounded-md text-sm ${
                          p === currentPage
                            ? "bg-white text-black font-semibold"
                            : "bg-white/8 text-white"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-indigo-600 disabled:opacity-40 text-sm"
                >
                  Next
                </button>
              </div>

              <div className="text-sm text-gray-400">
                Showing {totalItems === 0 ? 0 : startIndex + 1} -{" "}
                {Math.min(totalItems, endIndex)} of {totalItems}
              </div>
            </div>
          </div>
        </>
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
