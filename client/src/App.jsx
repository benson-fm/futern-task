import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <div>

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

