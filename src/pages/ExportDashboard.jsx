
import { useState, useEffect } from 'react';
import ExportBarChart from '../components/ExportBarChart.jsx';

export default function ExportDashboard() {
  const [year, setYear] = useState('2023');
  const [data, setData] = useState([]);
  const [years] = useState(['2021', '2022', '2023']); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (yr) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/exports?year=${yr}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(year);
  }, [year]);

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Export Diversification Dashboard
        </h2>

        {/* Year selector */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            Select Year:
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="block w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

      
        {loading && <p className="text-gray-600">Loading data…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        
        {!loading && !error && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Export Value by Sector ({year})
            </h3>
            <ExportBarChart data={data} year={year} />
          </div>
        )}
      </div>
    </div>
  );
}
