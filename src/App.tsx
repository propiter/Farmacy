import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Reception from './pages/Reception';
import Inventory from './pages/Inventory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;