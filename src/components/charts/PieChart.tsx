import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface Props {
  data: DataPoint[]; // [{ name: 'Blue', value: 3 }, ...]
  height?: number;
}

const DEFAULT_COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#60A5FA", "#F472B6"];

const ColorPieChart: React.FC<Props> = ({ data, height = 220 }) => {
  // ensure there's at least one item so Recharts doesn't error
  const safeData = data.length ? data : [{ name: "None", value: 1 }];

  return (
    <div className="bg-white/6 border border-white/10 rounded-2xl p-4">
      <div className="text-lg font-semibold text-indigo-300 mb-3">Color Distribution</div>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={safeData} dataKey="value" nameKey="name" outerRadius="70%" label>
              {safeData.map((_, i) => (
                <Cell key={`cell-${i}`} fill={DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ background: "rgba(0,0,0,0.8)", borderRadius: 8, border: "none", color: "#fff" }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ColorPieChart;
