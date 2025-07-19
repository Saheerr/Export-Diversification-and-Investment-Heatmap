import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExportDashboard from './pages/ExportDashboard';
import InvestmentMap from './pages/InvestmentMap';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exports" element={<ExportDashboard />} />
          <Route path="/investment" element={<InvestmentMap />} />
        </Routes>
      </div>
    </Router>
  );
}
