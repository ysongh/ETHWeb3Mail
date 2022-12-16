import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [tablelandMethods, setTablelandMethods] = useState("");
  const [tableName, setTableName] = useState("");
  const [chainName, setChainName] = useState('');
  const [pw3eContract, setpw3eContract] = useState(null);
  const [domainData, setDomainData] = useState('');

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              tableName={tableName}
              chainName={chainName}
              tablelandMethods={tablelandMethods}
              walletAddress={walletAddress}
              pw3eContract={pw3eContract}
              domainData={domainData}
              setDomainData={setDomainData} /> } />
        <Route
          path="/"
          element={
            <Home
              setTablelandMethods={setTablelandMethods}
              setTableName={setTableName} 
              setWalletAddress={setWalletAddress}
              setpw3eContract={setpw3eContract}
              setDomainData={setDomainData}
              setChainName={setChainName} /> } />
      </Routes>
    </HashRouter>
  );
}

export default App;
