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
import ErrorBanner from "./ui/ErrorBanner";
import SkeletonCard from "./ui/SkeletonCard";
import GadgetCard from "./GadgetCard";
import Controls from "./Controls";
import Pagination from "./Pagination";

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
      <Controls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
        onEdit={() => {
          setEditingGadget(null);
        }}
        onModalOpen={() => {
          setIsModalOpen(true);
        }}
        isProcessing={isProcessing}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onResetFilters={() => {
          setSearchTerm("");
          setColorFilter("");
          setSortBy("name");
          setShowFilters(false);
        }}
      />

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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
            goToPage={goToPage}
          />
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
