import { useEffect, useState } from "react";

import ColorPieChart from "./charts/PieChart";
import { getGadgets, type Gadget } from "../utils/api";
import StatsCard from "./stats/StatsCard"
import CapacityBarChart from "./charts/CapacityBarChart";


const Analytics = () => {
  const [gadgets , setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadGadgets = async () => {
      setLoading(true);
      try {
        const data = await getGadgets()
        setGadgets(data);
      }catch (err) {
        setError("Failed to fetch gadgets");
      }finally {
        setLoading(false);
      }
    }

    loadGadgets();
  }, []);


  //compute stats
  const totalGadgets = gadgets.length;

  const colorCount : Record<string, number> = {};
  const capacityCount : Record<string, number> = {};

  gadgets.forEach((g)=> {
       const color = (g.data?.color || "Unknown").toString();
       const capacity = (g.data?.capacity || "Unknown").toString();
        colorCount[color] = (colorCount[color] || 0) + 1;
        capacityCount[capacity] = (capacityCount[capacity] || 0) + 1;
  })

  //transform to chart data format
  const colorData = Object.entries(colorCount).map(([name, value]) => ({ name, value }));
  const capacityData = Object.entries(capacityCount).map(([name, value]) => ({ name, value }));

   const uniqueColors = Object.keys(colorCount).length;
  const uniqueCapacities = Object.keys(capacityCount).length;


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              📊 Analytics
            </h1>
            <p className="text-sm text-gray-400 mt-1">Overview of your gadgets</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 animate-pulse py-12">Loading analytics...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-8">{error}</div>
        ) : (
          <>
            {/* stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <StatsCard title="Total Gadgets" value={totalGadgets} accent="text-indigo-400" />
              <StatsCard title="Unique Colors" value={uniqueColors} accent="text-purple-400" />
              <StatsCard title="Unique Capacities" value={uniqueCapacities} accent="text-pink-400" />
            </div>

            {/* charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ColorPieChart data={colorData} height={300} />
              <CapacityBarChart data={capacityData} height={300} />
            </div>
          </>
        )}
      </div>
    </>
  
    
  )
}

export default Analytics