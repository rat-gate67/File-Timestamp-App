import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { GenerateTimestamp } from './pages/GenerateTimestamp';
import { VerifyTimestamp } from './pages/VerifyTimestamp';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-lg">
        <Header />
        
        <main className="max-w-2xl mx-auto p-8">
          <Navigation />
          <Routes>
            <Route path="/" element={<GenerateTimestamp />} />
            <Route path="/verify" element={<VerifyTimestamp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;