import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse bg-white/6 border border-white/8 rounded-2xl p-4">
      <div className="w-full h-40 bg-white/6 rounded-xl mb-3" />
      <div className="h-5 bg-white/6 rounded w-3/4 mb-2" />
      <div className="h-3 bg-white/6 rounded w-1/2 mb-4" />
      <div className="flex gap-2">
        <div className="flex-1 h-9 bg-white/6 rounded" />
        <div className="flex-1 h-9 bg-white/6 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;
