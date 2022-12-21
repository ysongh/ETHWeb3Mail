import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [chainName, setChainName] = useState('');
  const [pw3eContract, setpw3eContract] = useState(null);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              chainName={chainName}
              walletAddress={walletAddress}
              pw3eContract={pw3eContract} /> } />
        <Route
          path="/"
          element={
            <Home
              setWalletAddress={setWalletAddress}
              setpw3eContract={setpw3eContract}
              setChainName={setChainName} /> } />
      </Routes>
    </HashRouter>
  );
}

export default App;
