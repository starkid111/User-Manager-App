import ColorPieChart from "./charts/PieChart";
import StatsCard from "./stats/StatsCard"

const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
const Analytics = () => {
  return (
    <>
      <div>ANALYTIC PAGE COMING SOON</div>
      <StatsCard title="Total Gadgets" value={42} accent="text-green-400" />
      <ColorPieChart data={data02} height={300} />
    </>
  
    
  )
}

export default Analytics