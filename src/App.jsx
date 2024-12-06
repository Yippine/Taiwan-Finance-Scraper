import React from 'react';
import StockSearch from './components/StockSearch';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-12">
        <StockSearch />
      </main>
    </div>
  );
}

export default App;