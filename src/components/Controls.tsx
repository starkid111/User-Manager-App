import Spinner from "./ui/Spinner";

interface Controls {
    searchTerm : string;
    setSearchTerm : (value : string ) => void;
    showFilters : boolean;
    setShowFilters : (value : boolean) => void ;
    sortBy : string ;
    setSortBy : (value : string) => void;
    colorFilter :string ;
    setColorFilter : (value : string ) => void ;
    isProcessing : boolean;
    onEdit : () => void ;
    onModalOpen: () => void;
    onResetFilters: () => void;
}

const Controls = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  sortBy,
  setSortBy,
  colorFilter,
  setColorFilter,
  isProcessing,
  onEdit,
  onModalOpen,
  onResetFilters
} : Controls) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl xl:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
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
            onClick={() => setShowFilters(!showFilters)}
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
                onEdit();
                onModalOpen();
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
                onEdit();
                onModalOpen();
                setShowFilters(false);
              }}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-2 rounded-xl font-semibold text-sm"
            >
              {isProcessing ? <Spinner size={14} /> : "+ Add Gadget"}
            </button>
            <button
              onClick={onResetFilters}
              className="flex-1 bg-white/6 px-4 py-2 rounded-xl text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Controls;
