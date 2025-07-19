import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-800 hover:opacity-80">
          BIDA Strategy
        </Link>
        <div className="space-x-8 font-medium text-gray-700">
          <Link to="/exports" className="hover:text-red-600 transition">Exports</Link>
          <Link to="/investment" className="hover:text-red-600 transition">Investment</Link>
          <Link to="/reports" className="hover:text-red-600 transition">Reports</Link>
          <Link to="/contact" className="hover:text-red-600 transition">Contact</Link>
        </div>
      </div>
    </nav>
  )
}
