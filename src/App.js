import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [chainName, setChainName] = useState('');
  const [pw3eContract, setpw3eContract] = useState(null);
  const [ethProvider, setethProvider] = useState(null);
  const [ethSigner, setethSigner] = useState(null); 
  const [domainData, setDomainData] = useState('');

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              chainName={chainName}
              walletAddress={walletAddress}
              pw3eContract={pw3eContract}
              ethProvider={ethProvider}
              ethSigner={ethSigner}
              domainData={domainData}
              setDomainData={setDomainData} /> } />
        <Route
          path="/"
          element={
            <Home
              setWalletAddress={setWalletAddress}
              setpw3eContract={setpw3eContract}
              setChainName={setChainName}
              setethProvider={setethProvider}
              setethSigner={setethSigner}
              setDomainData={setDomainData} /> } />
      </Routes>
    </HashRouter>
  );
}

export default App;
