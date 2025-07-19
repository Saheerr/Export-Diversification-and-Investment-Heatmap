import { useState } from 'react'
import ExportBarChart from '../components/ExportBarChart.jsx'

const dummyExportData = {
  2021: [
    { sector: "RMG", value: 32000 },
    { sector: "Agro", value: 2500 },
    { sector: "Leather", value: 1200 },
    { sector: "Pharma", value: 800 },
    { sector: "ICT", value: 700 }
  ],
  2022: [
    { sector: "RMG", value: 34000 },
    { sector: "Agro", value: 2700 },
    { sector: "Leather", value: 1400 },
    { sector: "Pharma", value: 1000 },
    { sector: "ICT", value: 850 }
  ],
  2023: [
    { sector: "RMG", value: 31000 },
    { sector: "Agro", value: 2800 },
    { sector: "Leather", value: 1600 },
    { sector: "Pharma", value: 1100 },
    { sector: "ICT", value: 1000 }
  ]
}

export default function ExportDashboard() {
  const [year, setYear] = useState("2023")
  const years = Object.keys(dummyExportData)

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Export Diversification Dashboard</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">Select Year:</label>
          <select
            id="year"
            value={year}
            onChange={e => setYear(e.target.value)}
            className="block w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Export Value by Sector</h3>
          <ExportBarChart data={dummyExportData[year]} year={year} />
        </div>
      </div>
    </div>
  )
}
