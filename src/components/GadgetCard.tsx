import type { Gadget } from "../utils/api";
import Spinner from "./ui/Spinner";

const DEFAULT_IMAGE =
  "https://via.placeholder.com/300x200?text=No+Image";


  interface GadgetCardProps {
    gadget : Gadget
    onEdit: (gadget: Gadget) => void;
  onDelete: (id: string) => void;
  onOpenModal : () => void;
  isProcessing: boolean;
  }

const GadgetCard = ({
  gadget,
  onEdit,
  onOpenModal,
  isProcessing,
  onDelete,
} : GadgetCardProps) => {
  return (
    <article
      key={gadget.id}
      className="bg-white/6 border border-white/8 rounded-2xl p-4 hover:scale-[1.02] transition-all duration-200 shadow-md flex flex-col"
    >
      <div className="w-full h-40 sm:h-44 md:h-36 lg:h-40 overflow-hidden rounded-xl bg-gray-800 mb-3">
        <img
          src={gadget.image || DEFAULT_IMAGE}
          alt={gadget.name || "Gadget image"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-indigo-300 line-clamp-2">
          {gadget.name || "Unnamed Gadget"}
        </h3>
        <p className="text-xs text-gray-400 mt-1 mb-2">ID: {gadget.id}</p>

        {gadget.data && (
          <ul className="text-sm text-gray-300 space-y-1 mb-3">
            {Object.entries(gadget.data).map(([key, value]) => (
              <li key={key} className="capitalize">
                <span className="font-medium text-gray-200">{key}:</span>{" "}
                <span className="text-gray-300"> {String(value)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => {
            onEdit(gadget);
            onOpenModal();
          }}
          disabled={isProcessing}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-lg text-sm font-medium"
        >
          {isProcessing ? <Spinner size={14} /> : "Edit"}
        </button>
        <button
          onClick={() => onDelete(gadget.id)}
          disabled={isProcessing}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          {isProcessing ? <Spinner size={14} /> : "Delete"}
        </button>
      </div>
    </article>
  );
};

export default GadgetCard;
