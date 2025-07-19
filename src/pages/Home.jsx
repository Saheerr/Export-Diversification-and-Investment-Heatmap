import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">BD Investment & Export Strategy</h1>
      <p className="mb-4">Explore sectoral diversification and investment heatmaps to support national economic planning.</p>
      <div className="space-x-4">
        <Link to="/exports" className="bg-blue-600 text-white px-4 py-2 rounded">Export Dashboard</Link>
        <Link to="/investment" className="bg-green-600 text-white px-4 py-2 rounded">Investment Map</Link>
      </div>
    </div>
  );
}
