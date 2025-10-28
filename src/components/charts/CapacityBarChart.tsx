"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  height?: number;
}

const CapacityBarChart: React.FC<Props> = ({ data, height = 260 }) => {
  const safeData = data.length ? data : [{ name: "None", value: 1 }];

  return (
    <div className="bg-white/6 border border-white/10 rounded-2xl p-4">
      <div className="text-lg font-semibold text-purple-300 mb-3">Capacity Distribution</div>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={safeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#2b2b2b" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip wrapperStyle={{ background: "rgba(0,0,0,0.8)", borderRadius: 8, border: "none" }} />
            <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CapacityBarChart;
