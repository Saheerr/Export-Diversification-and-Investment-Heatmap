import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import ExportDashboard from './pages/ExportDashboard.jsx'
import InvestmentMap from './pages/InvestmentMap.jsx'

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exports" element={<ExportDashboard />} />
          <Route path="/investment" element={<InvestmentMap />} />
        </Routes>
      </div>
    </Router>
  )
}
