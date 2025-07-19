import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function ExportBarChart({ data, year }) {
  const chartData = {
    labels: data.map(d => d.sector),
    datasets: [{
      label: `Export (USD Millions) - ${year}`,
      data: data.map(d => d.value),
      backgroundColor: 'rgba(59,130,246,0.6)',
      borderRadius: 6
    }]
  }

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'USD Millions' } }
    }
  }

  return <Bar data={chartData} options={options} />
}
