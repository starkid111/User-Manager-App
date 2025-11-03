interface EmptyStateProps {
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  message = "No gadgets found.",
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-gray-400">
      <p className="text-lg font-medium">{message}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-2 rounded-lg font-semibold text-white hover:opacity-90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
