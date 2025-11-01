import React from "react";

interface Props {
  title: string;
  value: string | number;
  accent?: string; 
}

const StatsCard: React.FC<Props> = ({ title, value, accent = "text-indigo-400" }) => {
  return (
    <div className="bg-white/6 border border-white/10 p-4 rounded-2xl text-center">
      <div className={`text-3xl font-bold ${accent}`}>{value}</div>
      <div className="text-sm text-gray-400 mt-1">{title}</div>
    </div>
  );
};

export default StatsCard;
